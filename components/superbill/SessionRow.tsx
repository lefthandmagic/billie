'use client';
import { Session } from '@/lib/types';
import { CPT_CODES, ICD10_CODES, PLACE_OF_SERVICE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

interface SessionRowProps {
  session: Session;
  index: number;
  onChange: (id: string, field: keyof Session, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function SessionRow({ session, index, onChange, onRemove, canRemove }: SessionRowProps) {
  const total = (parseFloat(session.fee) || 0) * (parseFloat(session.units) || 1);

  return (
    <div className="grid grid-cols-12 gap-2 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="col-span-12 sm:col-span-2">
        <label className="text-xs font-medium text-slate-500 block mb-1">Date of Service</label>
        <input
          type="date"
          value={session.dateOfService}
          onChange={(e) => onChange(session.id, 'dateOfService', e.target.value)}
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label className="text-xs font-medium text-slate-500 block mb-1">Place of Service</label>
        <select
          value={session.placeOfService}
          onChange={(e) => onChange(session.id, 'placeOfService', e.target.value)}
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {PLACE_OF_SERVICE.map((p) => (
            <option key={p.code} value={p.code}>{p.code} — {p.description}</option>
          ))}
        </select>
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label className="text-xs font-medium text-slate-500 block mb-1">CPT Code</label>
        <select
          value={session.cptCode}
          onChange={(e) => onChange(session.id, 'cptCode', e.target.value)}
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">Select CPT</option>
          {CPT_CODES.map((c) => (
            <option key={c.code} value={c.code}>{c.code} — {c.description}</option>
          ))}
        </select>
      </div>

      <div className="col-span-12 sm:col-span-3">
        <label className="text-xs font-medium text-slate-500 block mb-1">Diagnosis Code (ICD-10)</label>
        <div className="relative">
          <select
            value={ICD10_CODES.find(c => c.code === session.diagnosisCode) ? session.diagnosisCode : '__custom__'}
            onChange={(e) => {
              if (e.target.value !== '__custom__') onChange(session.id, 'diagnosisCode', e.target.value);
            }}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select ICD-10</option>
            {ICD10_CODES.map((c) => (
              <option key={c.code} value={c.code}>{c.code} — {c.description}</option>
            ))}
            <option value="__custom__">Other (enter manually below)</option>
          </select>
        </div>
        {(!ICD10_CODES.find(c => c.code === session.diagnosisCode) || session.diagnosisCode === '') && (
          <input
            type="text"
            value={session.diagnosisCode}
            onChange={(e) => onChange(session.id, 'diagnosisCode', e.target.value)}
            placeholder="e.g. F32.1"
            className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        )}
      </div>

      <div className="col-span-4 sm:col-span-1">
        <label className="text-xs font-medium text-slate-500 block mb-1">Units</label>
        <input
          type="number"
          min="1"
          max="99"
          value={session.units}
          onChange={(e) => onChange(session.id, 'units', e.target.value)}
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-center"
        />
      </div>

      <div className="col-span-5 sm:col-span-1">
        <label className="text-xs font-medium text-slate-500 block mb-1">Fee ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={session.fee}
          onChange={(e) => onChange(session.id, 'fee', e.target.value)}
          placeholder="0.00"
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="col-span-3 sm:col-span-1 flex flex-col items-end justify-between">
        <label className="text-xs font-medium text-slate-500 block mb-1">Total</label>
        <span className="text-sm font-semibold text-slate-900 py-1.5">{formatCurrency(total)}</span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(session.id)}
            className="text-xs text-red-400 hover:text-red-600 mt-1"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
