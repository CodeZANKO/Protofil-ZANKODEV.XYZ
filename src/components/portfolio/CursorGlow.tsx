import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      return;
    }
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;
  return (
    <div
      className="pointer-events-none fixed z-[100] h-[400px] w-[400px] rounded-full"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background:
          "radial-gradient(circle, oklch(0.7 0.24 260 / 0.18), oklch(0.65 0.28 305 / 0.08) 40%, transparent 70%)",
        transition: "transform 0.1s ease-out",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
