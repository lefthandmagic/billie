import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Superbill Tips for Therapists',
  description: 'Practical guides for out-of-network therapists on superbills, insurance reimbursement, and private practice billing.',
  alternates: { canonical: 'https://billie.fyi/blog' },
};

const posts = [
  {
    slug: 'how-to-create-a-superbill-for-therapists',
    title: 'How to Create a Superbill for Therapists (With Every Required Field)',
    description: 'A step-by-step guide to creating professional superbills your clients can submit to insurance for out-of-network reimbursement.',
    date: 'April 23, 2026',
    readTime: '6 min read',
  },
];

export default function BlogIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Blog</h1>
      <p className="text-slate-500 mb-12">Practical guides for out-of-network therapists.</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="border border-slate-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-sm transition-all">
              <p className="text-xs text-slate-400 mb-2">{post.date} · {post.readTime}</p>
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">{post.description}</p>
              <span className="inline-block mt-4 text-sm text-teal-600 font-medium">Read article →</span>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
