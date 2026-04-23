'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface EmailCaptureModalProps {
  open: boolean;
  onSubmit: (email: string) => void;
  onSkip: () => void;
}

export function EmailCaptureModal({ open, onSubmit, onSkip }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(email);
  }

  return (
    <Modal open={open} onClose={onSkip} size="sm">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📬</div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Your superbill is ready!</h2>
        <p className="text-sm text-slate-500">
          Enter your email to be notified when we add patient email delivery and cross-device sync — currently in development.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={!email}>
          Notify me + Download
        </Button>
      </form>
      <button
        onClick={onSkip}
        className="w-full mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors py-1"
      >
        No thanks, just download
      </button>
    </Modal>
  );
}
