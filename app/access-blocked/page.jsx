// src/app/page.jsx

export const metadata = {
  title: "Website Temporarily Unavailable | Access Restricted",
  description:
    "This website is temporarily unavailable. Access has been restricted by the Web Developer. Please contact the website Developer for more information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessBlocked() {
  const timestamp = new Date().toUTCString();

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] flex items-center justify-center px-6 font-mono mt-30">
      {/* Subtle Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="relative z-10 w-full max-w-3xl p-4 md:p-16">
        {/* Main Content */}
        <div className="space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
            Website Access <br />
            <span className="text-red-600 italic">
              Temporarily Unavailable
            </span>
          </h1>

          <div className="space-y-6 border-l-2 border-[#2d3748] pl-6 md:pl-8 py-2">
            <p className="text-sm md:text-base leading-relaxed text-slate-400">
              Access to this website has been temporarily restricted by the
              system administrator. The service is currently unavailable and
              operating in a limited state.
            </p>

            <p className="text-sm md:text-base leading-relaxed text-slate-400">
              For further information or to request service restoration, please
              contact the
              <span className="text-white">
                {" "}
                Website Developer
              </span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#2d3748] grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">
              Access Status Timestamp
            </p>
            <p className="text-xs text-slate-400">{timestamp}</p>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">
              Reference Code
            </p>
            <p className="text-xs text-slate-400">
              ACCESS-RESTRICTED-403
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
