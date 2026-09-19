import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Muhammad Asim',
  description: 'Admin Control Panel for portfolio content management.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-200 antialiased font-sans flex flex-col">
      <header className="bg-slate-950 text-white py-4 px-6 sm:px-8 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-heading font-bold text-lg tracking-wide">
            Portfolio <span className="text-cyan-400">Admin</span>
          </div>
          <a href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Back to Site
          </a>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
