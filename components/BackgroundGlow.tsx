export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F6F8FB]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),transparent_32%,rgba(16,185,129,0.08)_68%,transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,248,251,0.50),rgba(246,248,251,0.92)_35%,rgba(246,248,251,1))]" />
    </div>
  );
}
