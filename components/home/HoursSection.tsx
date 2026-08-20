'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getDict } from '@/lib/i18n';

/** Opening hours card. */
export default function HoursSection() {
  const t = getDict(useLocale().locale).hours;
  return (
    <>
      <div style={{ background: '#E9F1FB', lineHeight: '0' }}>
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          style={{
            display: 'block',
            width: '100%',
            height: 'clamp(44px,7vw,90px)',
          }}
        >
          <path
            d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z"
            fill="#F5F0E8"
          ></path>
        </svg>
      </div>

      <section
        style={{
          background: '#F5F0E8',
          padding: 'clamp(60px,9vw,110px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background:
              "url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22%237EAEE8%22/%3E%3C/svg%3E')",
            backgroundSize: '110px',
            backgroundPosition: '14px 10px',
            opacity: '.05',
            pointerEvents: 'none',
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(18px,4vw,32px)',
            textAlign: 'center',
          }}
        >
          <div id="hours" data-reveal="">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                borderRadius: '999px',
                padding: '8px 16px',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: '600',
                fontSize: '12.5px',
                letterSpacing: '.14em',
                color: '#3E5F86',
              }}
            >
              {t.badge}
            </div>
            <h2
              style={{
                margin: '16px 0 0',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: '700',
                fontSize: 'clamp(38px,5.6vw,62px)',
                lineHeight: '1.02',
              }}
            >
              {t.title}
            </h2>
          </div>
          <div
            data-reveal=""
            data-delay="120"
            style={{
              position: 'relative',
              maxWidth: '860px',
              margin: 'clamp(32px,5vw,48px) auto 0',
              background: '#3D4142',
              color: '#F5F0E8',
              borderRadius: '44px',
              padding: 'clamp(28px,5vw,52px)',
              transform: 'rotate(-.6deg)',
              boxShadow: '0 36px 64px -32px rgba(61,65,66,.55)',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-20px',
                right: '44px',
                width: '52px',
                transform: 'rotate(14deg)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  animation: 'floatY 7s ease-in-out infinite',
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: '100%', display: 'block' }}
                >
                  <path
                    d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
                    fill="#7EAEE8"
                  ></path>
                </svg>
              </span>
            </span>
            <span
              style={{
                position: 'absolute',
                left: '-10px',
                bottom: '52px',
                fontSize: '26px',
                color: '#F4A08A',
                animation: 'floatB 6.5s ease-in-out infinite',
              }}
            >
              ✦
            </span>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '18px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: '600',
                    fontSize: 'clamp(17px,2.4vw,22px)',
                  }}
                >
                  {t.monWed}
                </div>
                <div
                  style={{
                    flex: '1',
                    borderBottom: '3px dotted rgba(245,240,232,.3)',
                    transform: 'translateY(-5px)',
                  }}
                ></div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontWeight: '800',
                      fontSize: 'clamp(16px,2.3vw,20px)',
                    }}
                  >
                    08:00 – 16:00
                  </div>
                  <div style={{ fontSize: '13px', opacity: '.6' }}>
                    {t.pauseShort}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '18px',
                  background: '#7EAEE8',
                  color: '#243038',
                  boxShadow: '0 14px 28px -16px rgba(126,174,232,.9)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: '600',
                    fontSize: 'clamp(17px,2.4vw,22px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  {t.thursday}{' '}
                  <span
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '999px',
                      padding: '3px 11px',
                      fontSize: '11.5px',
                      letterSpacing: '.1em',
                      fontWeight: '600',
                    }}
                  >
                    {t.thursdayTag}
                  </span>
                </div>
                <div
                  style={{
                    flex: '1',
                    borderBottom: '3px dotted rgba(36,48,56,.35)',
                    transform: 'translateY(-5px)',
                  }}
                ></div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontWeight: '800',
                      fontSize: 'clamp(16px,2.3vw,20px)',
                    }}
                  >
                    10:00 – 18:00
                  </div>
                  <div style={{ fontSize: '13px', opacity: '.7' }}>
                    {t.pauseThursday}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '18px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: '600',
                    fontSize: 'clamp(17px,2.4vw,22px)',
                  }}
                >
                  {t.friday}
                </div>
                <div
                  style={{
                    flex: '1',
                    borderBottom: '3px dotted rgba(245,240,232,.3)',
                    transform: 'translateY(-5px)',
                  }}
                ></div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontWeight: '800',
                      fontSize: 'clamp(16px,2.3vw,20px)',
                    }}
                  >
                    08:00 – 16:00
                  </div>
                  <div style={{ fontSize: '13px', opacity: '.6' }}>
                    {t.pauseShort}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '18px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: '600',
                    fontSize: 'clamp(17px,2.4vw,22px)',
                  }}
                >
                  {t.weekend}
                </div>
                <div
                  style={{
                    flex: '1',
                    borderBottom: '3px dotted rgba(245,240,232,.3)',
                    transform: 'translateY(-5px)',
                  }}
                ></div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-shantell)',
                      fontWeight: '600',
                      fontSize: 'clamp(16px,2.3vw,19px)',
                      color: '#F4A08A',
                    }}
                  >
                    {t.closed}
                  </div>
                  <div style={{ fontSize: '13px', opacity: '.6' }}>
                    {t.closedNote}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(245,240,232,.15)',
                fontSize: '14px',
                opacity: '.75',
                display: 'flex',
                gap: '8px',
                alignItems: 'baseline',
              }}
            >
              <span style={{ color: '#7EAEE8' }}>✦</span>
              {t.tip}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
