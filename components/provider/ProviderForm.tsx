'use client';
import { useState } from 'react';
import { ProviderProfile } from '@/lib/types';
import { CREDENTIALS, US_STATES, TAXONOMY_CODES } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ProviderFormProps {
  initial: ProviderProfile | null;
  onSave: (profile: ProviderProfile) => void;
}

const empty: ProviderProfile = {
  fullName: '', credentials: '', npi: '', taxId: '', licenseNumber: '',
  licenseState: '', taxonomyCode: '', practiceName: '', address: '',
  city: '', state: '', zip: '', phone: '', email: '',
};

export function ProviderForm({ initial, onSave }: ProviderFormProps) {
  const [form, setForm] = useState<ProviderProfile>(initial ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ProviderProfile, string>>>({});

  function set(field: keyof ProviderProfile, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof ProviderProfile, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.credentials) e.credentials = 'Required';
    if (!form.npi.trim()) e.npi = 'Required';
    else if (!/^\d{10}$/.test(form.npi)) e.npi = 'NPI must be exactly 10 digits';
    if (!form.taxId.trim()) e.taxId = 'Required';
    if (!form.licenseNumber.trim()) e.licenseNumber = 'Required';
    if (!form.licenseState) e.licenseState = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state) e.state = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSave(form);
  }

  const credentialOptions = CREDENTIALS.map((c) => ({ value: c, label: c }));
  const stateOptions = US_STATES.map((s) => ({ value: s, label: s }));
  const taxonomyOptions = TAXONOMY_CODES.map((t) => ({ value: t.code, label: `${t.code} — ${t.description}` }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Provider Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            error={errors.fullName}
            placeholder="As it appears on your license"
            required
          />
          <Select
            label="Credentials"
            value={form.credentials}
            onChange={(e) => set('credentials', e.target.value)}
            error={errors.credentials}
            options={credentialOptions}
            placeholder="Select credentials"
            required
          />
          <Input
            label="NPI Number"
            value={form.npi}
            onChange={(e) => set('npi', e.target.value.replace(/\D/g, '').slice(0, 10))}
            error={errors.npi}
            placeholder="10-digit NPI"
            hint="10-digit National Provider Identifier"
            required
          />
          <Input
            label="Tax ID / EIN"
            value={form.taxId}
            onChange={(e) => set('taxId', e.target.value)}
            error={errors.taxId}
            placeholder="XX-XXXXXXX"
            required
          />
          <Input
            label="License Number"
            value={form.licenseNumber}
            onChange={(e) => set('licenseNumber', e.target.value)}
            error={errors.licenseNumber}
            required
          />
          <Select
            label="License State"
            value={form.licenseState}
            onChange={(e) => set('licenseState', e.target.value)}
            error={errors.licenseState}
            options={stateOptions}
            placeholder="Select state"
            required
          />
          <div className="sm:col-span-2">
            <Select
              label="Specialty / Taxonomy Code"
              value={form.taxonomyCode}
              onChange={(e) => set('taxonomyCode', e.target.value)}
              options={taxonomyOptions}
              placeholder="Select taxonomy code (optional)"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Practice Name"
              value={form.practiceName}
              onChange={(e) => set('practiceName', e.target.value)}
              placeholder="Optional — leave blank to use your name"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Contact & Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Street Address"
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
              error={errors.address}
              required
            />
          </div>
          <Input
            label="City"
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
            error={errors.city}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="State"
              value={form.state}
              onChange={(e) => set('state', e.target.value)}
              error={errors.state}
              options={stateOptions}
              placeholder="—"
              required
            />
            <Input
              label="ZIP"
              value={form.zip}
              onChange={(e) => set('zip', e.target.value)}
              error={errors.zip}
              required
            />
          </div>
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            error={errors.phone}
            placeholder="(555) 000-0000"
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
