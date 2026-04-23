import Link from 'next/link';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-teal-600">Billie</Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Blog</Link>
            <Link href="/tool" className="text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-lg transition-colors">
              Try free →
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
