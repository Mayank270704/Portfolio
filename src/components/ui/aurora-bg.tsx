import "@/styles/aurora.css";

export function AuroraBg() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Deep space sky */}
      <div className="aurora-sky" />

      {/* Stars */}
      <div className="aurora-stars" />

      {/* Bottom horizon glow — magenta ground mist */}
      <div className="aurora-horizon" />

      {/* Vertical aurora beams — ordered back→front by brightness */}
      <div className="aurora-beam aurora-beam-8" />  {/* purple far-left */}
      <div className="aurora-beam aurora-beam-9" />  {/* magenta left-center */}
      <div className="aurora-beam aurora-beam-6" />  {/* cyan left-center */}
      <div className="aurora-beam aurora-beam-5" />  {/* wide cyan far-right */}
      <div className="aurora-beam aurora-beam-7" />  {/* magenta far-right */}
      <div className="aurora-beam aurora-beam-4" />  {/* cyan right */}
      <div className="aurora-beam aurora-beam-2" />  {/* wide green curtain */}
      <div className="aurora-beam aurora-beam-3" />  {/* slim green spike */}
      <div className="aurora-beam aurora-beam-1" />  {/* brightest neon green center */}

      {/* Shimmer sweep */}
      <div className="aurora-shimmer" />
    </div>
  );
}
