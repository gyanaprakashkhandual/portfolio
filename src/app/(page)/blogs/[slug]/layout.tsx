import Sidebar from "../components/Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'Outfit', sans-serif; }
        .font-code { font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="font-body max-w-6xl mx-auto px-5 pt-12 pb-28">
        <div className="flex gap-12 items-start">
          <Sidebar />

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
