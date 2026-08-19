'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type CSSProperties,
} from 'react';
import { getDoctors, getBooked, submitBooking } from '@/app/actions';
import { canonicalPhone } from '@/lib/match';
import {
  formatDate,
  BOOKING_HORIZON_DAYS,
  parseDate,
  slotsForDay,
  SERVICES,
} from '@/lib/appointments';
import { useLocale } from '@/components/LocaleProvider';
import { getDict } from '@/lib/i18n';
import type { Doctor } from '@/lib/types';

const labelTextStyle: CSSProperties = {
  display: 'block',
  fontWeight: 800,
  fontSize: '13.5px',
  marginBottom: '6px',
};
const fieldStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 16px',
  borderRadius: '16px',
  border: '2px solid #EDE5D4',
  background: '#FDFBF6',
  fontSize: '15px',
  transition: 'border-color .25s ease, box-shadow .25s ease',
};
const buttonStyle: CSSProperties = {
  background: '#7EAEE8',
  color: '#243038',
  border: 'none',
  fontFamily: 'var(--font-fredoka)',
  fontWeight: 600,
  fontSize: '17px',
  padding: '15px 32px',
  borderRadius: '999px',
  boxShadow: '0 14px 26px -12px rgba(126,174,232,.8)',
  transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
  cursor: 'pointer',
};

const RequiredMark = () => (
  <span aria-hidden="true" style={{ color: '#C0503A' }}>
    {' '}
    *
  </span>
);

function todayAtMidnight() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

type Fields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  notes: string;
};

export default function BookingForm() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const today = useMemo(todayAtMidnight, []);
  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState<Fields>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: SERVICES[0],
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctor, setDoctor] = useState('');
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<
    { date: string; time: string } | 'propose' | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const topRef = useRef<HTMLDivElement>(null);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + BOOKING_HORIZON_DAYS);
    return d;
  }, [today]);

  useEffect(() => {
    let alive = true;
    getDoctors().then((d) => {
      if (!alive) return;
      setDoctors(d);
      if (d.length === 1) setDoctor(d[0].id);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!date) return;
    let alive = true;
    setLoading(true);
    setTime(null);
    getBooked(date, doctor || null)
      .then((z) => alive && setBooked(z))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [date, doctor]);

  // month cells, week starts Monday
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const pad = (first.getDay() + 6) % 7;
    const result: (Date | null)[] = Array(pad).fill(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      result.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return result;
  }, [month]);

  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext =
    new Date(month.getFullYear(), month.getMonth() + 1, 1) <= maxDate;
  const slots = date ? slotsForDay(parseDate(date).getDay()) : [];

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // update a field and drop the red border as soon as the user starts correcting it
  const updateField = (field: keyof Fields, value: string) => {
    setFields((p) => ({ ...p, [field]: value }));
    setErrors((g) => (g[field] ? { ...g, [field]: false } : g));
  };

  const goToStep2 = () => {
    const next: Record<string, boolean> = {
      firstName: !fields.firstName.trim(),
      lastName: !fields.lastName.trim(),
      phone: !canonicalPhone(fields.phone),
      email:
        fields.email.trim() !== '' && !/^\S+@\S+\.\S+$/.test(fields.email),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      setError(fields.phone.trim() && next.phone ? t.form.errorPhone : null);
      return;
    }
    setError(null);
    setStep(2);
    scrollToTop();
  };

  const send = (propose: boolean) => {
    if (!propose && (!date || !time)) {
      setError(t.form.errorDateTime);
      return;
    }
    const formData = new FormData();
    formData.set('first_name', fields.firstName);
    formData.set('last_name', fields.lastName);
    formData.set('phone', canonicalPhone(fields.phone) ?? fields.phone);
    formData.set('email', fields.email);
    formData.set('service', fields.service);
    formData.set('notes', fields.notes);
    formData.set('staff_id', doctor);
    formData.set('lang', locale);
    if (propose) {
      formData.set('propose', '1');
    } else {
      formData.set('date', date!);
      formData.set('time', time!);
    }
    setError(null);
    startTransition(async () => {
      const result = await submitBooking(formData);
      if (result.ok) {
        setSent(propose ? 'propose' : { date: date!, time: time! });
        scrollToTop();
      } else {
        setError(result.error ?? t.form.errorGeneric);
      }
    });
  };

  if (sent) {
    let message = t.form.sentPropose;
    if (sent !== 'propose') {
      const d = parseDate(sent.date);
      const monthName = t.months[d.getMonth()];
      message = t.form.sentBooked
        .replace('{day}', String(d.getDate()))
        .replace('{month}', locale === 'bs' ? monthName.toLowerCase() : monthName)
        .replace('{time}', sent.time);
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '10px',
          padding: '26px 10px',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '62px' }} aria-hidden="true">
          <path
            d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
            fill="#7EAEE8"
          />
          <circle cx="41" cy="34" r="3.5" fill="#243038" />
          <circle cx="59" cy="34" r="3.5" fill="#243038" />
          <path
            d="M40 45c4 6 16 6 20 0"
            stroke="#243038"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-fredoka)',
            fontWeight: 600,
            fontSize: '26px',
          }}
        >
          {t.form.sentTitle}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '15.5px',
            lineHeight: 1.6,
            opacity: 0.8,
            maxWidth: '380px',
          }}
        >
          {message} <span style={{ color: '#F4A08A' }}>✦</span>
        </p>
      </div>
    );
  }

  return (
    <div
      ref={topRef}
      className="booking-form"
      style={{ display: 'grid', gap: '18px', scrollMarginTop: '110px' }}
    >
      {/* step indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '13px',
          fontWeight: 800,
        }}
      >
        <span
          style={{
            background: step === 1 ? '#7EAEE8' : '#E7F0FB',
            color: '#243038',
            borderRadius: '999px',
            padding: '5px 14px',
          }}
        >
          {t.form.step1}
        </span>
        <span style={{ opacity: 0.35 }}>—</span>
        <span
          style={{
            background: step === 2 ? '#7EAEE8' : '#E7F0FB',
            color: '#243038',
            borderRadius: '999px',
            padding: '5px 14px',
            opacity: step === 2 ? 1 : 0.6,
          }}
        >
          {t.form.step2}
        </span>
      </div>

      {step === 1 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '16px',
            }}
          >
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                {t.form.firstName}
                <RequiredMark />
              </span>
              <input
                required
                type="text"
                autoComplete="given-name"
                value={fields.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder={t.form.placeholderFirstName}
                style={{
                  ...fieldStyle,
                  ...(errors.firstName ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                {t.form.lastName}
                <RequiredMark />
              </span>
              <input
                required
                type="text"
                autoComplete="family-name"
                value={fields.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder={t.form.placeholderLastName}
                style={{
                  ...fieldStyle,
                  ...(errors.lastName ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                {t.form.phone}
                <RequiredMark />
              </span>
              <span
                className="tel-field"
                style={{
                  ...fieldStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 0 0 16px',
                  ...(errors.phone ? { borderColor: '#C0503A' } : {}),
                }}
              >
                <span
                  style={{ fontWeight: 800, opacity: 0.7, flex: '0 0 auto' }}
                >
                  +387
                </span>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={fields.phone}
                  onChange={(e) =>
                    updateField('phone', e.target.value.replace(/[^\d\s/-]/g, ''))
                  }
                  placeholder={t.form.placeholderPhone}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    font: 'inherit',
                    fontSize: '15px',
                    padding: '13px 16px 13px 0',
                  }}
                />
              </span>
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                {t.form.email}{' '}
                <span style={{ opacity: 0.5, fontWeight: 600 }}>{t.form.optional}</span>
              </span>
              <input
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder={t.form.placeholderEmail}
                style={{
                  ...fieldStyle,
                  ...(errors.email ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            {doctors.length > 0 && (
              <label style={{ display: 'block' }}>
                <span style={labelTextStyle}>
                  {t.form.doctor}{' '}
                  <span style={{ opacity: 0.5, fontWeight: 600 }}>
                    {t.form.optional}
                  </span>
                </span>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  style={{ ...fieldStyle, appearance: 'none' }}
                >
                  <option value="">{t.form.noPreference}</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.first_name} {d.last_name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>{t.form.service}</span>
              <select
                value={fields.service}
                onChange={(e) => updateField('service', e.target.value)}
                style={{ ...fieldStyle, appearance: 'none' }}
              >
                {/* values stay canonical (Bosnian) so admin data is consistent; labels are localized */}
                {SERVICES.map((value, i) => (
                  <option key={value} value={value}>
                    {t.servicesList[i] ?? value}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'block', gridColumn: '1 / -1' }}>
              <span style={labelTextStyle}>
                {t.form.notes}{' '}
                <span style={{ opacity: 0.5, fontWeight: 600 }}>{t.form.optional}</span>
              </span>
              <textarea
                value={fields.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={2}
                placeholder={t.form.placeholderNotes}
                style={{ ...fieldStyle, resize: 'vertical' }}
              />
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={goToStep2}
              className="hv-cta"
              style={buttonStyle}
            >
              {t.form.next}
            </button>
            {error && (
              <span
                role="alert"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#C0503A',
                }}
              >
                {error}
              </span>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {/* calendar */}
          <div>
            <span style={labelTextStyle}>{t.form.chooseDate}</span>
            <div
              style={{
                background: '#FDFBF6',
                border: '2px solid #EDE5D4',
                borderRadius: '20px',
                padding: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    canPrev &&
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() - 1, 1),
                    )
                  }
                  disabled={!canPrev}
                  aria-label={t.form.prevMonth}
                  style={{
                    border: 'none',
                    background: '#E7F0FB',
                    borderRadius: '999px',
                    width: '32px',
                    height: '32px',
                    cursor: canPrev ? 'pointer' : 'default',
                    opacity: canPrev ? 1 : 0.35,
                    fontSize: '16px',
                  }}
                >
                  ‹
                </button>
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: 600,
                    fontSize: '17px',
                  }}
                >
                  {t.months[month.getMonth()]} {month.getFullYear()}
                  {locale === 'bs' ? '.' : ''}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    canNext &&
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() + 1, 1),
                    )
                  }
                  disabled={!canNext}
                  aria-label={t.form.nextMonth}
                  style={{
                    border: 'none',
                    background: '#E7F0FB',
                    borderRadius: '999px',
                    width: '32px',
                    height: '32px',
                    cursor: canNext ? 'pointer' : 'default',
                    opacity: canNext ? 1 : 0.35,
                    fontSize: '16px',
                  }}
                >
                  ›
                </button>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7,1fr)',
                  gap: '4px',
                  textAlign: 'center',
                }}
              >
                {t.daysShort.map((d) => (
                  <div
                    key={d}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      opacity: 0.55,
                      padding: '4px 0',
                    }}
                  >
                    {d}
                  </div>
                ))}
                {cells.map((d, i) => {
                  if (!d) return <div key={`p${i}`} />;
                  const iso = formatDate(d);
                  const working = slotsForDay(d.getDay()).length > 0;
                  const available = working && d >= today && d <= maxDate;
                  const selected = date === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!available}
                      onClick={() => setDate(iso)}
                      style={{
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px 0',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'inherit',
                        cursor: available ? 'pointer' : 'default',
                        background: selected
                          ? '#7EAEE8'
                          : available
                            ? '#FFFFFF'
                            : 'transparent',
                        color: selected ? '#243038' : '#3D4142',
                        opacity: available ? 1 : 0.3,
                        boxShadow: selected
                          ? '0 8px 16px -8px rgba(126,174,232,.9)'
                          : available
                            ? '0 1px 0 rgba(61,65,66,.12)'
                            : 'none',
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* time slots */}
          {date && (
            <div>
              <span style={labelTextStyle}>{t.form.chooseTime}</span>
              {loading ? (
                <div
                  style={{
                    fontSize: '14px',
                    opacity: 0.6,
                    fontWeight: 700,
                    padding: '6px 2px',
                  }}
                >
                  {t.form.loadingSlots}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {slots.map((s) => {
                    const free = !booked.includes(s);
                    const selected = time === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!free}
                        onClick={() => setTime(s)}
                        style={{
                          border:
                            '2px solid ' + (selected ? '#7EAEE8' : '#EDE5D4'),
                          background: selected
                            ? '#7EAEE8'
                            : free
                              ? '#FFFFFF'
                              : '#F1EBDD',
                          color: selected ? '#243038' : '#3D4142',
                          textDecoration: free ? 'none' : 'line-through',
                          opacity: free ? 1 : 0.45,
                          borderRadius: '999px',
                          padding: '8px 14px',
                          fontSize: '14px',
                          fontWeight: 800,
                          fontFamily: 'inherit',
                          cursor: free ? 'pointer' : 'default',
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => send(false)}
              disabled={pending || !date || !time}
              className="hv-cta"
              style={{
                ...buttonStyle,
                cursor: pending || !date || !time ? 'default' : 'pointer',
                opacity: pending || !date || !time ? 0.6 : 1,
              }}
            >
              {pending ? t.form.sending : t.form.submit}
            </button>
            <button
              type="button"
              onClick={() => send(true)}
              disabled={pending}
              style={{
                background: 'transparent',
                border: '2px solid #3D4142',
                color: '#3D4142',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 22px',
                borderRadius: '999px',
                cursor: pending ? 'default' : 'pointer',
              }}
            >
              {t.form.propose}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: '13.5px',
                opacity: 0.6,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {t.form.back}
            </button>
            {error && (
              <span
                role="alert"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#C0503A',
                }}
              >
                {error}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
