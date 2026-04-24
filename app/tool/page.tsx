'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { trackEvent, identifyUser } from '@/lib/analytics';
import { ProviderProfile, Patient, SuperbillDraft } from '@/lib/types';
import {
  getProvider, saveProvider,
  getPatients, addPatient, updatePatient, deletePatient,
  getDraft, saveDraft,
} from '@/lib/storage';
import { ProviderForm } from '@/components/provider/ProviderForm';
import { PatientList } from '@/components/patients/PatientList';
import { SuperbillForm } from '@/components/superbill/SuperbillForm';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const PDFPreview = dynamic(
  () => import('@/components/pdf/PDFPreview').then((m) => m.PDFPreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl text-slate-400 text-sm">
        Loading preview…
      </div>
    ),
  },
);

type Tab = 'superbill' | 'patients' | 'profile';
type Step = 'form' | 'preview';

export default function ToolPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>('superbill');
  const [step, setStep] = useState<Step>('form');

  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [draft, setDraft] = useState<SuperbillDraft | null>(null);
  const [previewDraft, setPreviewDraft] = useState<SuperbillDraft | null>(null);

  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  useEffect(() => {
    setProvider(getProvider());
    setPatients(getPatients());
    setDraft(getDraft());
    setMounted(true);
  }, []);

  useEffect(() => {
    // Don't ambush visitors with a modal on load — let them see the tool first
    // Profile prompt only appears when they try to generate a superbill
  }, [mounted, provider]);

  function handleSaveProvider(p: ProviderProfile) {
    const isFirst = !provider;
    saveProvider(p);
    setProvider(p);
    setShowProfilePrompt(false);
    if (tab === 'profile') setTab('superbill');
    if (isFirst) trackEvent('profile_saved');
  }

  function handleAddPatient(p: Patient) {
    addPatient(p);
    setPatients(getPatients());
    trackEvent('patient_added');
  }

  function handleUpdatePatient(p: Patient) {
    updatePatient(p);
    setPatients(getPatients());
  }

  function handleDeletePatient(id: string) {
    deletePatient(id);
    setPatients(getPatients());
  }

  function handleDraftChange(d: SuperbillDraft) {
    saveDraft(d);
    setDraft(d);
  }

  function handleGenerate(d: SuperbillDraft) {
    if (!provider) {
      setTab('profile');
      return;
    }
    setPreviewDraft(d);
    setStep('preview');
    trackEvent('superbill_previewed', { session_count: d.sessions.length });
  }

  function handleDownload() {
    trackEvent('pdf_downloaded');
    if (!emailCaptured) {
      setShowEmailModal(true);
    }
  }

  function handleEmailSubmit(email: string) {
    // Identify in PostHog — ties email to session + all their events
    identifyUser(email);
    trackEvent('email_captured', { email });

    // Formspree — sends email directly to your inbox
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId) {
      fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'billie.fyi download modal' }),
      }).catch(() => {});
    }

    setEmailCaptured(true);
    setShowEmailModal(false);
  }

  function handleEmailSkip() {
    setEmailCaptured(true);
    setShowEmailModal(false);
  }

  const selectedPatient = patients.find((p) => p.id === previewDraft?.patientId);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="text-lg font-bold text-teal-600">Billie</a>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {(['superbill', 'patients', 'profile'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setStep('form'); }}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                  tab === t
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'superbill' ? 'New Superbill' : t === 'patients' ? 'Patients' : 'My Profile'}
              </button>
            ))}
          </div>
          {provider ? (
            <span className="text-sm text-slate-500 hidden sm:block">{provider.fullName}, {provider.credentials}</span>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setShowProfilePrompt(true)}>
              Set up profile
            </Button>
          )}
        </div>
      </nav>


      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {tab === 'superbill' && (
          <div>
            {!provider && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-4 flex items-start gap-4">
                <div className="text-2xl">👋</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-teal-900 mb-1">Welcome to Billie — let's set up your profile first</p>
                  <p className="text-sm text-teal-700 mb-3">
                    You'll fill in your NPI, credentials, and address once. After that, every superbill takes under 60 seconds.
                  </p>
                  <Button size="sm" onClick={() => setTab('profile')}>
                    Set up my profile →
                  </Button>
                </div>
              </div>
            )}
            {step === 'form' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="mb-6">
                  <h1 className="text-xl font-semibold text-slate-900">New Superbill</h1>
                  <p className="text-sm text-slate-500 mt-1">Select a patient, add sessions, then preview and download.</p>
                </div>
                <SuperbillForm
                  patients={patients}
                  draft={draft}
                  onDraftChange={handleDraftChange}
                  onGenerate={handleGenerate}
                  onAddPatient={() => setTab('patients')}
                />
              </div>
            ) : (
              previewDraft && selectedPatient && provider && (
                <PDFPreview
                  provider={provider}
                  patient={selectedPatient}
                  sessions={previewDraft.sessions}
                  statementDate={previewDraft.statementDate}
                  onBack={() => setStep('form')}
                  onDownload={handleDownload}
                />
              )
            )}
          </div>
        )}

        {tab === 'patients' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <PatientList
              patients={patients}
              onAdd={handleAddPatient}
              onUpdate={handleUpdatePatient}
              onDelete={handleDeletePatient}
            />
          </div>
        )}

        {tab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-slate-900">Provider Profile</h1>
              <p className="text-sm text-slate-500 mt-1">Saved locally in your browser. Fills automatically on every superbill.</p>
            </div>
            <ProviderForm initial={provider} onSave={handleSaveProvider} />
          </div>
        )}
      </main>


      <EmailCaptureModal
        open={showEmailModal}
        onSubmit={handleEmailSubmit}
        onSkip={handleEmailSkip}
      />

      {/* Feedback footer */}
      <footer className="border-t border-slate-100 mt-8 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <span>Billie · billie.fyi</span>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? 'hello@billie.fyi'}?subject=Billie feedback`}
            className="hover:text-teal-600 transition-colors"
          >
            Send feedback →
          </a>
        </div>
      </footer>
    </div>
  );
}
