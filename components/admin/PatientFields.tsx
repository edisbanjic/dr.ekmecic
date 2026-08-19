import type { Patient, Staff } from "@/lib/types";
import { fullName } from "@/lib/types";

/** Shared fields for creating and editing a patient. */
export default function PatientFields({ patient, doctors }: { patient?: Patient; doctors: Staff[] }) {
  return (
    <>
      <label>
        <span>Ime</span>
        <input required name="first_name" defaultValue={patient?.first_name ?? ""} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="last_name" defaultValue={patient?.last_name ?? ""} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="phone" defaultValue={patient?.phone ?? ""} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={patient?.email ?? ""} />
      </label>
      <label>
        <span>Datum rođenja</span>
        <input type="date" name="date_of_birth" defaultValue={patient?.date_of_birth ?? ""} />
      </label>
      <label>
        <span>Adresa</span>
        <input name="address" defaultValue={patient?.address ?? ""} />
      </label>
      <label className="full">
        <span>Primarni doktor</span>
        <select name="staff_id" defaultValue={patient?.staff_id ?? ""}>
          <option value="">— neodređen —</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {fullName(d)}
            </option>
          ))}
        </select>
      </label>
      <label className="full">
        <span>Alergije</span>
        <input name="allergies" defaultValue={patient?.allergies ?? ""} placeholder="npr. penicilin" />
      </label>
      <label className="full">
        <span>Napomena</span>
        <textarea name="notes" rows={3} defaultValue={patient?.notes ?? ""} />
      </label>
    </>
  );
}
