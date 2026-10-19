import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function FormPatterns() {
  const [step, setStep] = useState(1);
  const [dirty, setDirty] = useState(false);

  return (
    <div className="space-y-8">
      <div id="patterns-multistep" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Multi-step form</h3>
        <p className="copy-body mt-2 w-full max-w-none">
          Persist step in URL or state; validate each step before advancing; show summary on the final step.
        </p>
        <ol className="mt-4 flex gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          {["Details", "Review", "Confirm"].map((label, index) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1 ${step === index + 1 ? "bg-primary text-white" : "bg-zinc-100 text-zinc-600"}`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>
        <div className="mt-4 space-y-4">
          {step === 1 ? (
            <Input label="Project name" defaultValue="" onChange={() => setDirty(true)} placeholder="Permits portal" />
          ) : null}
          {step === 2 ? <p className="copy-body">Review values from step 1 before submit.</p> : null}
          {step === 3 ? <p className="copy-body">Confirm creates the record and redirects to detail.</p> : null}
        </div>
        <div className="mt-4 flex justify-between gap-2">
          <Button variant="secondary" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            Back
          </Button>
          <Button
            onClick={() => {
              if (step < 3) setStep((s) => s + 1);
              else setDirty(false);
            }}
          >
            {step === 3 ? "Submit" : "Continue"}
          </Button>
        </div>
      </div>

      <div id="patterns-unsaved" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Unsaved changes</h3>
        <p className="copy-body mt-2 w-full max-w-none">
          Show a sticky banner when the form is dirty; block navigation or prompt before route change.
        </p>
        <Input label="Display name" defaultValue="Joseph Esguerra Padasas" onChange={() => setDirty(true)} />
        {dirty ? (
          <div
            className="mt-4 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <p className="text-sm text-amber-950">You have unsaved changes.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setDirty(false)}>
                Discard
              </Button>
              <Button size="sm" onClick={() => setDirty(false)}>
                Save
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
