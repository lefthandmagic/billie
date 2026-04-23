'use client';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Patient, ProviderProfile, Session } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { SuperbillDocument } from './SuperbillDocument';

interface PDFPreviewProps {
  provider: ProviderProfile;
  patient: Patient;
  sessions: Session[];
  statementDate: string;
  onBack: () => void;
  onDownload: () => void;
}

export function PDFPreview({ provider, patient, sessions, statementDate, onBack, onDownload }: PDFPreviewProps) {
  const filename = `superbill-${patient.fullName.toLowerCase().replace(/\s+/g, '-')}-${statementDate}.pdf`;

  const doc = (
    <SuperbillDocument
      provider={provider}
      patient={patient}
      sessions={sessions}
      statementDate={statementDate}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Preview Superbill</h2>
          <p className="text-sm text-slate-500">{patient.fullName} · {statementDate}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onBack}>← Back</Button>
          <PDFDownloadLink document={doc} fileName={filename}>
            {({ loading }) => (
              <Button onClick={onDownload} disabled={loading}>
                {loading ? 'Preparing…' : '⬇ Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <BlobProvider document={doc}>
        {({ url, loading, error }) => {
          if (loading) {
            return (
              <div className="flex items-center justify-center h-96 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 text-sm">
                Generating preview…
              </div>
            );
          }
          if (error) {
            return (
              <div className="flex items-center justify-center h-96 bg-red-50 rounded-xl border border-red-200 text-red-400 text-sm">
                Error rendering preview. Try downloading the PDF directly.
              </div>
            );
          }
          return (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <iframe
                src={url ?? ''}
                className="w-full"
                style={{ height: 700 }}
                title="Superbill preview"
              />
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
}
