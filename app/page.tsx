import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billie — Free Superbill Generator for Therapists',
  description: 'Generate professional superbills in 60 seconds. Free superbill tool for out-of-network therapists. No EHR subscription needed. NPI, CPT codes, ICD-10 — all included.',
  alternates: { canonical: 'https://billie.fyi' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Billie',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: 'https://billie.fyi',
  description: 'Free superbill generator for out-of-network therapists. Generate professional superbills with CPT codes and ICD-10 diagnosis codes in 60 seconds.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Out-of-network therapists, LCSWs, LMFTs, LPCs, Psychologists',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-teal-600">Billie</span>
          <Link
            href="/tool"
            className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Open the tool →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-teal-100">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Free · No account needed · Private
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight max-w-3xl mb-6">
          Beautiful superbills for{' '}
          <span className="text-teal-600">therapists</span>
        </h1>

        <p className="text-xl text-slate-500 max-w-xl mb-10 leading-relaxed">
          Generate a professional superbill in 60 seconds. No $99/month EHR subscription required.
          Everything stays in your browser — nothing is uploaded.
        </p>

        <Link
          href="/tool"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-teal-100"
        >
          Try it free — no account needed
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        <p className="mt-4 text-sm text-slate-400">For LCSWs, LMFTs, LPCs, Psychologists, and Psychiatrists</p>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Fill once, reuse forever',
              body: 'Your provider profile and patient roster are saved in your browser. Creating next month\'s superbill takes under 60 seconds.',
            },
            {
              icon: '🔒',
              title: '100% private',
              body: 'Everything stays in your browser. No data is uploaded to any server. No HIPAA concerns. Your patients\' information never leaves your device.',
            },
            {
              icon: '📄',
              title: 'Insurance-ready PDFs',
              body: 'Every required field — NPI, CPT codes, ICD-10, tax ID — formatted exactly as insurance companies expect for out-of-network reimbursement.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', title: 'Set up your profile', body: 'Enter your NPI, tax ID, and license once. Saved permanently.' },
              { step: '2', title: 'Add your patients', body: 'Name, DOB, and insurance info. Reused for every future superbill.' },
              { step: '3', title: 'Log the sessions', body: 'Select CPT codes, ICD-10 diagnosis, date, fee. Add as many rows as needed.' },
              { step: '4', title: 'Download the PDF', body: 'Preview and download a professional superbill your patient can submit to insurance.' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is this HIPAA compliant?',
                a: 'All data is stored only in your browser\'s local storage. Nothing is sent to our servers. We never see your patient data. Because we don\'t store or transmit any PHI, there is no HIPAA exposure on our end.',
              },
              {
                q: 'Do I need to create an account?',
                a: 'No account, no sign-up, no email required. Your provider profile and patient roster are saved in your browser automatically.',
              },
              {
                q: 'What\'s the difference between a superbill and a regular invoice?',
                a: 'A superbill is a specialized receipt for out-of-network healthcare services. It contains specific medical billing fields (NPI number, CPT procedure codes, ICD-10 diagnosis codes, place of service) that insurance companies require to process reimbursement claims. A regular invoice doesn\'t have these fields.',
              },
              {
                q: 'Which provider types is Billie for?',
                a: 'Billie is designed for out-of-network mental health therapists — LCSWs, LMFTs, LPCs, Psychologists, and Psychiatrists. It includes the CPT codes and ICD-10 codes most commonly used in therapy practice.',
              },
              {
                q: 'What if I switch devices or clear my browser?',
                a: 'Your data is stored in your browser\'s local storage and doesn\'t sync across devices. If you clear your browser data, you\'ll need to re-enter your profile and patients. Cross-device sync is coming in a future version.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to generate your first superbill?</h2>
        <p className="text-slate-500 mb-8">Free. No account. Takes 60 seconds.</p>
        <Link
          href="/tool"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Get started free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-slate-400">
          <span>© 2026 Billie · billie.fyi</span>
          <span>Built for out-of-network therapists</span>
        </div>
      </footer>
    </div>
  );
}
