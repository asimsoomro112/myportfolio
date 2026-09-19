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
    <div className="min-h-screen relative flex flex-col">
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm">
          <div className="font-heading font-bold text-lg sm:text-xl text-slate-950 flex items-center gap-2">
            Portfolio <span className="px-2 py-0.5 sm:py-1 rounded-lg bg-cyan-100 text-cyan-800 text-xs sm:text-sm font-semibold">Admin</span>
          </div>
          <a href="/" className="text-xs sm:text-sm font-bold text-slate-600 hover:text-cyan-700 transition-colors bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm border border-slate-100 active:scale-95">
            Back to Site
          </a>
        </div>
      </header>
      
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyan-200/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-emerald-200/20 blur-[120px]" />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-12">
        {children}
      </main>
    </div>
  );
}
