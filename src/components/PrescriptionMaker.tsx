import { useEffect, useState, type ChangeEvent } from "react";

type Rx = {
  prescriber: string;
  clinic: string;
  prescriberAddress: string;
  prescriberPhone: string;
  providerNo: string;
  patient: string;
  dob: string;
  weight: string;
  patientAddress: string;
  patientId: string;
  drug: string;
  strength: string;
  form: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  prn: boolean;
  indication: string;
  quantity: string;
  repeats: string;
  notes: string;
  date: string;
  brandSub: boolean;
};

const FORMS = ["Tablet", "Capsule", "Oral liquid", "Suspension", "Cream", "Ointment", "Injection", "Inhaler", "Drops", "Patch"];
const ROUTES = ["Oral (PO)", "Topical", "Intravenous (IV)", "Intramuscular (IM)", "Subcutaneous (SC)", "Inhaled", "Sublingual", "Rectal (PR)"];

const today = new Date().toISOString().split("T")[0];

const INITIAL: Rx = {
  prescriber: "", clinic: "", prescriberAddress: "", prescriberPhone: "", providerNo: "",
  patient: "", dob: "", weight: "", patientAddress: "", patientId: "",
  drug: "", strength: "", form: "", dose: "", route: "", frequency: "", duration: "",
  prn: false, indication: "", quantity: "", repeats: "", notes: "",
  date: today, brandSub: false,
};

// Build the human-readable "Sig" (directions) line from the parts.
function buildSig(d: Rx): string {
  const parts = [d.dose, d.route, d.frequency, d.prn ? "as required (PRN)" : "", d.duration ? `for ${d.duration}` : ""]
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? "Sig: " + parts.join(" ") : "Sig: —";
}

const or = (v: string, fallback = "") => (v.trim() ? v : fallback);

export default function PrescriptionMaker() {
  const [rx, setRx] = useState<Rx>(INITIAL);
  const [helpOpen, setHelpOpen] = useState(false);

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, type, value } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setRx((prev) => ({ ...prev, [name]: next }));
  }

  // Browsers print document.title into the PDF page header — blank it while
  // printing (a single space avoids a URL fallback) and restore it after.
  useEffect(() => {
    const realTitle = document.title;
    const blank = () => { document.title = " "; };
    const restore = () => { document.title = realTitle; };
    window.addEventListener("beforeprint", blank);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", blank);
      window.removeEventListener("afterprint", restore);
    };
  }, []);

  // Close the help popover on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setHelpOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="topbar">
        <h1>℞ Prescription Maker</h1>
        <button type="button" className="ghost" onClick={() => window.print()}>Print / Save PDF</button>
      </header>

      <main className="layout">
        {/* ── Left: input fields ── */}
        <section className="panel form-panel" aria-label="Prescription details">
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Prescriber</legend>
              <label>Doctor name<input name="prescriber" value={rx.prescriber} onChange={update} placeholder="Dr Jane Smith" /></label>
              <label>Clinic / Practice<input name="clinic" value={rx.clinic} onChange={update} placeholder="Riverside Medical Centre" /></label>
              <label>Address<input name="prescriberAddress" value={rx.prescriberAddress} onChange={update} placeholder="12 Main St, Sydney NSW 2000" /></label>
              <div className="row">
                <label>Phone<input name="prescriberPhone" value={rx.prescriberPhone} onChange={update} placeholder="(02) 9000 0000" /></label>
                <label>Provider / Reg. no.<input name="providerNo" value={rx.providerNo} onChange={update} placeholder="1234567A" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Patient</legend>
              <label>Full name<input name="patient" value={rx.patient} onChange={update} placeholder="John Citizen" /></label>
              <div className="row">
                <label>Date of birth<input type="date" name="dob" value={rx.dob} onChange={update} /></label>
                <label>Weight (kg)<input name="weight" value={rx.weight} onChange={update} inputMode="decimal" placeholder="70" /></label>
              </div>
              <label>Address<input name="patientAddress" value={rx.patientAddress} onChange={update} placeholder="34 Park Ave, Sydney NSW 2000" /></label>
              <label>Medicare / Patient ID<input name="patientId" value={rx.patientId} onChange={update} placeholder="0000 00000 0" /></label>
            </fieldset>

            <fieldset>
              <legend>Medication</legend>
              <label>Drug name<input name="drug" value={rx.drug} onChange={update} placeholder="Amoxicillin" /></label>
              <div className="row">
                <label>Strength<input name="strength" value={rx.strength} onChange={update} placeholder="500 mg" /></label>
                <label>Form
                  <select name="form" value={rx.form} onChange={update}>
                    <option value="">—</option>
                    {FORMS.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </label>
              </div>
              <div className="row">
                <label>Dose<input name="dose" value={rx.dose} onChange={update} placeholder="1 tablet" /></label>
                <label>Route
                  <select name="route" value={rx.route} onChange={update}>
                    <option value="">—</option>
                    {ROUTES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>
              </div>
              <div className="row">
                <label>Frequency<input name="frequency" value={rx.frequency} onChange={update} placeholder="three times a day" /></label>
                <label>Duration<input name="duration" value={rx.duration} onChange={update} placeholder="7 days" /></label>
              </div>
              <label className="check"><input type="checkbox" name="prn" checked={rx.prn} onChange={update} /> PRN (as required)</label>
              <label>Indication<input name="indication" value={rx.indication} onChange={update} placeholder="Chest infection" /></label>
              <div className="row">
                <label>Quantity<input name="quantity" value={rx.quantity} onChange={update} placeholder="21" /></label>
                <label>Repeats / Refills<input name="repeats" value={rx.repeats} onChange={update} placeholder="0" /></label>
              </div>
              <label>Additional directions
                <textarea name="notes" value={rx.notes} onChange={update} rows={2} placeholder="Take with food. Complete the full course." />
              </label>
            </fieldset>

            <fieldset>
              <legend>Authorisation</legend>
              <label>Date<input type="date" name="date" value={rx.date} onChange={update} /></label>
              <label className="check"><input type="checkbox" name="brandSub" checked={rx.brandSub} onChange={update} /> Brand substitution permitted</label>
            </fieldset>
          </form>
        </section>

        {/* ── Right: rendered prescription ── */}
        <section className="panel preview-panel" aria-label="Prescription preview">
          <article className="rx-sheet">
            <div className="rx-head">
              <div>
                <strong className={`rx-prescriber${rx.prescriber ? "" : " empty"}`}>{or(rx.prescriber, "Doctor name")}</strong>
                {rx.clinic && <div className="muted">{rx.clinic}</div>}
                {rx.prescriberAddress && <div className="muted small">{rx.prescriberAddress}</div>}
                {(rx.prescriberPhone || rx.providerNo) && (
                  <div className="muted small">
                    {rx.prescriberPhone}
                    {rx.providerNo && ` · Provider ${rx.providerNo}`}
                  </div>
                )}
              </div>
              <div className="rx-symbol">℞</div>
            </div>

            <div className="rx-patient">
              <div><span className="lbl">Patient</span> {or(rx.patient, "—")}</div>
              <div>
                <span className="lbl">DOB</span> {or(rx.dob, "—")}
                {rx.weight && `   Weight ${rx.weight} kg`}
              </div>
              {rx.patientAddress && <div className="small">{rx.patientAddress}</div>}
              {rx.patientId && <div className="small">ID {rx.patientId}</div>}
            </div>

            <div className="rx-body">
              <div className={`rx-drug${rx.drug ? "" : " empty"}`}>
                {or(rx.drug, "Medication")}
                {rx.strength && ` ${rx.strength}`}
                {rx.form && ` · ${rx.form}`}
              </div>
              <div className="rx-sig">{buildSig(rx)}</div>
              {(rx.quantity || rx.repeats || rx.indication) && (
                <div className="rx-meta">
                  {rx.quantity && <span className="chip">Qty: {rx.quantity}</span>}
                  {rx.repeats && <span className="chip">Repeats: {rx.repeats}</span>}
                  {rx.indication && <span className="chip">For: {rx.indication}</span>}
                </div>
              )}
              {rx.notes && <div className="rx-notes">{rx.notes}</div>}
              {rx.brandSub && <div className="rx-brand small">✓ Brand substitution permitted</div>}
            </div>

            <div className="rx-foot">
              <div className="rx-sign">
                <div className="sign-line"></div>
                <span className="small muted">Signature</span>
              </div>
              <div className="rx-date">
                <span className="lbl">Date</span> {or(rx.date, "—")}
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* ── Help ── */}
      <button type="button" className="help-fab" aria-label="Help" aria-haspopup="dialog" onClick={() => setHelpOpen(true)}>?</button>

      {helpOpen && (
        <div className="help-overlay" onClick={(e) => { if (e.target === e.currentTarget) setHelpOpen(false); }}>
          <div className="help-card" role="dialog" aria-modal="true" aria-labelledby="help-title">
            <button type="button" className="help-close" aria-label="Close" onClick={() => setHelpOpen(false)}>×</button>
            <div className="help-icon">🖨️</div>
            <h2 id="help-title">Printing tip</h2>
            <p>
              When printing or saving to PDF, make sure you select{" "}
              <strong>“No Margins”</strong> to remove the page header &amp; footer.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
