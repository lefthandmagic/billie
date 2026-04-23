'use client';
import { useState } from 'react';
import { Patient } from '@/lib/types';
import { US_STATES } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/utils';

interface PatientFormProps {
  initial?: Patient | null;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const empty: Omit<Patient, 'id'> = {
  fullName: '', dateOfBirth: '', insurancePayer: '',
  memberId: '', groupNumber: '', subscriberName: '', subscriberDob: '',
};

export function PatientForm({ initial, onSave, onCancel }: PatientFormProps) {
  const [form, setForm] = useState<Omit<Patient, 'id'>>(
    initial ? { ...initial } : { ...empty },
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Patient, string>>>({});

  function set(field: keyof Omit<Patient, 'id'>, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof Patient, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.dateOfBirth) e.dateOfBirth = 'Required';
    if (!form.insurancePayer.trim()) e.insurancePayer = 'Required';
    if (!form.memberId.trim()) e.memberId = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form, id: initial?.id ?? generateId() });
    }
  }

  const stateOptions = US_STATES.map((s) => ({ value: s, label: s }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Patient Full Name"
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            error={errors.fullName}
            required
          />
        </div>
        <Input
          label="Date of Birth"
          type="date"
          value={form.dateOfBirth}
          onChange={(e) => set('dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
          required
        />
        <Input
          label="Insurance Payer"
          value={form.insurancePayer}
          onChange={(e) => set('insurancePayer', e.target.value)}
          error={errors.insurancePayer}
          placeholder="e.g. Blue Cross Blue Shield"
          required
        />
        <Input
          label="Member ID"
          value={form.memberId}
          onChange={(e) => set('memberId', e.target.value)}
          error={errors.memberId}
          required
        />
        <Input
          label="Group Number"
          value={form.groupNumber}
          onChange={(e) => set('groupNumber', e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500 mb-3">Subscriber info — only if different from patient</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Subscriber Name"
            value={form.subscriberName}
            onChange={(e) => set('subscriberName', e.target.value)}
            placeholder="Optional"
          />
          <Input
            label="Subscriber Date of Birth"
            type="date"
            value={form.subscriberDob}
            onChange={(e) => set('subscriberDob', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initial ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
}
