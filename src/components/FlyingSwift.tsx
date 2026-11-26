
import "../css/FlyingSwift.css";

export default function FlyingSwift() {
  return (
    <div className="son-bird-flight" aria-hidden="true">
      <div className="son-bird-video">
        <video
          src="/video/chim-yen-transparent.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
