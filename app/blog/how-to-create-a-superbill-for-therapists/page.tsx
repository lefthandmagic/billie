import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Create a Superbill for Therapists (Every Required Field)',
  description: 'Step-by-step guide to creating a superbill for out-of-network therapy clients. Includes every required field — NPI, CPT codes, ICD-10 codes, and more.',
  alternates: { canonical: 'https://billie.fyi/blog/how-to-create-a-superbill-for-therapists' },
  openGraph: {
    title: 'How to Create a Superbill for Therapists (Every Required Field)',
    description: 'Step-by-step guide to creating a superbill your clients can submit to insurance for out-of-network reimbursement.',
    url: 'https://billie.fyi/blog/how-to-create-a-superbill-for-therapists',
    type: 'article',
  },
};

const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? 'hello@billie.fyi';

function FeedbackCTA() {
  return (
    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 my-10">
      <p className="text-sm font-semibold text-teal-800 mb-1">Was this helpful?</p>
      <p className="text-sm text-teal-700 mb-4">
        We built Billie specifically to make this process easier — generate a professional superbill in 60 seconds, no EHR needed.
        If you try it, we'd love to hear what you think.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/tool"
          className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Try Billie free →
        </Link>
        <a
          href={`mailto:${feedbackEmail}?subject=Superbill feedback`}
          className="inline-flex items-center bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Send feedback
        </a>
      </div>
    </div>
  );
}

export default function SuperbillGuide() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <Link href="/blog" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← Blog</Link>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 mb-4">
          <span>April 23, 2026</span>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">Billing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          How to Create a Superbill for Therapists (With Every Required Field)
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          If you're an out-of-network therapist, your clients can get reimbursed by their insurance — but only if you give them the right document. Here's exactly what a superbill needs to contain and how to create one properly.
        </p>
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-800">

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">What is a superbill?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          A superbill is a detailed receipt for healthcare services that a patient can submit to their insurance company to request reimbursement. Unlike a regular invoice, a superbill contains specific medical billing codes and provider information that insurance companies require to process out-of-network claims.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          As an out-of-network therapist, you collect payment directly from your client. The client then submits the superbill to their insurer and — depending on their out-of-network benefits — gets partially or fully reimbursed. You never interact with the insurance company directly, which means no pre-authorizations, no claim denials, and no credentialing requirements.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">What a superbill must include</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Insurance companies are strict about superbill format. A missing or incorrect field can cause the claim to be denied. Here's every field that must appear:
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-6 mb-3">Provider information</h3>
        <ul className="space-y-2 mb-6">
          {[
            ['Full name and credentials', 'As they appear on your license (e.g. Jane Smith, LCSW)'],
            ['NPI number', 'Your 10-digit National Provider Identifier — every licensed clinician has one. Look yours up at npiregistry.cms.hhs.gov.'],
            ['Tax ID (EIN or SSN)', 'Your Employer Identification Number or Social Security Number, used by insurers to identify you.'],
            ['License number and state', 'Your professional license number and the state that issued it.'],
            ['Taxonomy code', 'Optional but recommended — a code that describes your specialty (e.g. 101YM0800X for mental health counselors).'],
            ['Practice name and address', 'Your business name (if any), street address, city, state, and zip.'],
            ['Phone number', 'A contact number for the provider.'],
          ].map(([field, desc]) => (
            <li key={field} className="flex gap-3 text-slate-600">
              <span className="text-teal-500 mt-1 shrink-0">✓</span>
              <span><strong className="text-slate-800">{field}</strong> — {desc}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-slate-800 mt-6 mb-3">Patient and insurance information</h3>
        <ul className="space-y-2 mb-6">
          {[
            ['Patient full name', 'As it appears on their insurance card.'],
            ['Date of birth', 'Required for insurance member identification.'],
            ['Insurance payer name', 'e.g. Blue Cross Blue Shield, Aetna, UnitedHealthcare.'],
            ['Member ID', 'Found on the patient\'s insurance card.'],
            ['Group number', 'Also on the insurance card — optional but helpful.'],
            ['Subscriber information', 'If the patient is covered under someone else\'s plan (e.g. a spouse), include the subscriber\'s name and DOB.'],
          ].map(([field, desc]) => (
            <li key={field} className="flex gap-3 text-slate-600">
              <span className="text-teal-500 mt-1 shrink-0">✓</span>
              <span><strong className="text-slate-800">{field}</strong> — {desc}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-slate-800 mt-6 mb-3">Session details (one row per session)</h3>
        <ul className="space-y-2 mb-6">
          {[
            ['Date of service', 'The date each session took place.'],
            ['Place of service code', '11 for in-office sessions, 02 for telehealth/video sessions.'],
            ['CPT procedure code', 'A 5-digit code describing the type of service (see common codes below).'],
            ['ICD-10 diagnosis code', 'The clinical diagnosis code (e.g. F41.1 for generalized anxiety disorder).'],
            ['Fee charged', 'Your full session rate — not a reduced or insurance rate.'],
            ['Units', 'Usually 1 per session.'],
          ].map(([field, desc]) => (
            <li key={field} className="flex gap-3 text-slate-600">
              <span className="text-teal-500 mt-1 shrink-0">✓</span>
              <span><strong className="text-slate-800">{field}</strong> — {desc}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">Common CPT codes for therapists</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-2 border border-slate-200 font-semibold text-slate-700">Code</th>
                <th className="text-left px-4 py-2 border border-slate-200 font-semibold text-slate-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['90791', 'Psychiatric diagnostic evaluation (intake session)'],
                ['90832', 'Individual psychotherapy, 30 minutes'],
                ['90834', 'Individual psychotherapy, 45 minutes'],
                ['90837', 'Individual psychotherapy, 60 minutes'],
                ['90847', 'Family psychotherapy with patient present, 50 minutes'],
                ['90846', 'Family psychotherapy without patient, 50 minutes'],
                ['90853', 'Group psychotherapy'],
              ].map(([code, desc]) => (
                <tr key={code} className="border-b border-slate-100">
                  <td className="px-4 py-2 border border-slate-200 font-mono text-teal-700 font-medium">{code}</td>
                  <td className="px-4 py-2 border border-slate-200 text-slate-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mb-6">The most commonly used code for a standard 50-minute therapy session is <strong className="text-slate-700">90837</strong> (billed as 60 minutes — the standard in mental health billing).</p>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">Common ICD-10 diagnosis codes for therapy</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-2 border border-slate-200 font-semibold text-slate-700">Code</th>
                <th className="text-left px-4 py-2 border border-slate-200 font-semibold text-slate-700">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['F41.1', 'Generalized anxiety disorder'],
                ['F32.9', 'Major depressive disorder, unspecified'],
                ['F43.10', 'Post-traumatic stress disorder, unspecified'],
                ['F43.20', 'Adjustment disorder, unspecified'],
                ['F90.0', 'ADHD, predominantly inattentive'],
                ['F60.3', 'Borderline personality disorder'],
                ['Z03.89', 'No diagnosis (for intake or wellness sessions)'],
              ].map(([code, desc]) => (
                <tr key={code} className="border-b border-slate-100">
                  <td className="px-4 py-2 border border-slate-200 font-mono text-teal-700 font-medium">{code}</td>
                  <td className="px-4 py-2 border border-slate-200 text-slate-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">Common mistakes that get superbills rejected</h2>
        <ul className="space-y-3 mb-6">
          {[
            'Missing NPI number — this is the single most common reason for rejection.',
            'Using your full SSN instead of an EIN for the tax ID field.',
            'Wrong place of service code — use 02 for telehealth, not 11.',
            'Listing your reduced or sliding-scale fee instead of your full session rate.',
            'Combining multiple sessions into one line item — each session should be its own row.',
            'Missing patient date of birth — insurance companies use this to verify member identity.',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-slate-600">
              <span className="text-red-400 mt-1 shrink-0">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">How often should you generate superbills?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Most clients prefer monthly superbills — one document covering all sessions in that month. This reduces the number of submissions they have to make to their insurance company. Some clients want weekly superbills or one per session. Either approach is fine — just be consistent.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Note that most insurers have a filing deadline — typically 90–180 days from the date of service. Encourage your clients not to sit on superbills for too long.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">What tools do therapists use to create superbills?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Most therapists use one of three approaches:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            ['Word or Google Docs template', 'Free but manual. You fill in the same fields for every client every month. Prone to errors and time-consuming.'],
            ['Full EHR (SimplePractice, TherapyNotes)', 'Superbill generation is included, but you pay $70–100/month for a full electronic health record system you may not need if you\'re private pay only.'],
            ['Billie', 'Free, browser-based superbill generator. Fill your provider info once, add patients, and generate a professional PDF in under a minute. Nothing is uploaded — everything stays in your browser.'],
          ].map(([tool, desc]) => (
            <li key={tool} className="flex gap-3 text-slate-600">
              <span className="text-slate-400 mt-1 shrink-0">→</span>
              <span><strong className="text-slate-800">{tool}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <FeedbackCTA />

      {/* Author note */}
      <div className="border-t border-slate-100 pt-8 mt-8">
        <p className="text-sm text-slate-400">
          Questions or corrections? Write to us at{' '}
          <a href={`mailto:${feedbackEmail}`} className="text-teal-600 hover:underline">{feedbackEmail}</a>.
          We read every message.
        </p>
      </div>
    </main>
  );
}
