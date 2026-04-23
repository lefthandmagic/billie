'use client';
import { useState, useEffect } from 'react';
import { Patient, Session, SuperbillDraft } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { SessionRow } from './SessionRow';
import { formatCurrency, generateId } from '@/lib/utils';

interface SuperbillFormProps {
  patients: Patient[];
  draft: SuperbillDraft | null;
  onDraftChange: (draft: SuperbillDraft) => void;
  onGenerate: (draft: SuperbillDraft) => void;
  onAddPatient: () => void;
}

function newSession(): Session {
  return {
    id: generateId(),
    dateOfService: new Date().toISOString().split('T')[0],
    placeOfService: '11',
    cptCode: '90837',
    diagnosisCode: 'F41.1',
    fee: '',
    units: '1',
  };
}

export function SuperbillForm({ patients, draft, onDraftChange, onGenerate, onAddPatient }: SuperbillFormProps) {
  const today = new Date().toISOString().split('T')[0];

  const [patientId, setPatientId] = useState(draft?.patientId ?? '');
  const [statementDate, setStatementDate] = useState(draft?.statementDate ?? today);
  const [sessions, setSessions] = useState<Session[]>(draft?.sessions ?? [newSession()]);

  useEffect(() => {
    onDraftChange({ patientId, statementDate, sessions });
  }, [patientId, statementDate, sessions]);

  function updateSession(id: string, field: keyof Session, value: string) {
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  }

  function addSession() {
    setSessions((prev) => [...prev, newSession()]);
  }

  function removeSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  const total = sessions.reduce((sum, s) => sum + (parseFloat(s.fee) || 0) * (parseFloat(s.units) || 1), 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientId) return;
    onGenerate({ patientId, statementDate, sessions });
  }

  const selectedPatient = patients.find((p) => p.id === patientId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Patient <span className="text-red-500">*</span>
          </label>
          {patients.length === 0 ? (
            <div className="flex items-center gap-3 p-3 border border-dashed border-slate-300 rounded-lg">
              <p className="text-sm text-slate-500 flex-1">No patients yet.</p>
              <Button type="button" size="sm" variant="secondary" onClick={onAddPatient}>
                Add Patient
              </Button>
            </div>
          ) : (
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select a patient…</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.fullName}</option>
              ))}
            </select>
          )}
          {selectedPatient && (
            <p className="text-xs text-slate-500">
              {selectedPatient.insurancePayer} · ID: {selectedPatient.memberId}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Statement Date</label>
          <input
            type="date"
            value={statementDate}
            onChange={(e) => setStatementDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Sessions</h3>
          <span className="text-xs text-slate-500">{sessions.length} session{sessions.length !== 1 ? 's' : ''}</span>
        </div>

        {sessions.map((session, index) => (
          <SessionRow
            key={session.id}
            session={session}
            index={index}
            onChange={updateSession}
            onRemove={removeSession}
            canRemove={sessions.length > 1}
          />
        ))}

        <Button type="button" variant="secondary" size="sm" onClick={addSession} className="w-full">
          + Add Session
        </Button>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="text-right">
          <p className="text-xs text-slate-500">Total Charged</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(total)}</p>
        </div>
        <Button type="submit" size="lg" disabled={!patientId || sessions.length === 0}>
          Preview Superbill →
        </Button>
      </div>
    </form>
  );
}
