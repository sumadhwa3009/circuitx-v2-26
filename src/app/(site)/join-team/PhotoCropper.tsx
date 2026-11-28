"use client";
import { useEffect, useRef, useState } from "react";

const V = 280;   // viewport size in CSS px
const OUT = 800; // saved image size

type Pos = { x: number; y: number };

function clamp(p: Pos, z: number, b: ImageBitmap): Pos {
  const s = (V / Math.min(b.width, b.height)) * z;
  const mx = Math.max(0, (b.width * s - V) / 2);
  const my = Math.max(0, (b.height * s - V) / 2);
  return { x: Math.min(mx, Math.max(-mx, p.x)), y: Math.min(my, Math.max(-my, p.y)) };
}

function paint(ctx: CanvasRenderingContext2D, b: ImageBitmap, z: number, p: Pos, size: number, preview: boolean) {
  const k = size / V;
  const s = (V / Math.min(b.width, b.height)) * z * k;
  const w = b.width * s, h = b.height * s;
  const x = size / 2 + p.x * k - w / 2, y = size / 2 + p.y * k - h / 2;
  ctx.clearRect(0, 0, size, size);
  if (!preview) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size); ctx.drawImage(b, x, y, w, h); return; }
  ctx.globalAlpha = 0.3; ctx.drawImage(b, x, y, w, h); ctx.globalAlpha = 1;
  ctx.save();
  ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(b, x, y, w, h);
  ctx.restore();
  ctx.strokeStyle = "#19e68c"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2); ctx.stroke();
}

export function PhotoCropper({ file, onCancel, onDone }: { file: File; onCancel: () => void; onDone: (blob: Blob) => void }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);
  const [bmp, setBmp] = useState<ImageBitmap | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    let made: ImageBitmap | null = null;
    createImageBitmap(file)
      .then((b) => { if (live) { made = b; setBmp(b); } else b.close(); })
      .catch(() => live && setErr("Could not read that image. Use a JPG or PNG photo."));
    return () => { live = false; made?.close(); };
  }, [file]);

  useEffect(() => {
    const c = cv.current;
    if (!c || !bmp) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = V * dpr; c.height = V * dpr;
    paint(c.getContext("2d")!, bmp, zoom, pos, V * dpr, true);
  }, [bmp, zoom, pos]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCancel]);

  const move = (p: Pos, z = zoom) => bmp && setPos(clamp(p, z, bmp));

  function onZoom(z: number) {
    setZoom(z);
    if (bmp) setPos((p) => clamp(p, z, bmp));
  }

  function save() {
    if (!bmp) return;
    const o = document.createElement("canvas");
    o.width = OUT; o.height = OUT;
    paint(o.getContext("2d")!, bmp, zoom, pos, OUT, false);
    o.toBlob((b) => (b ? onDone(b) : setErr("Could not save the photo. Try again.")), "image/jpeg", 0.88);
  }

  return (
    <div className="crop-overlay" role="dialog" aria-modal="true" aria-labelledby="crop-title">
      <div className="crop-card">
        <h2 id="crop-title">Adjust your photo</h2>
        <p className="crop-hint">Drag to move, use the slider to zoom. Keep your face inside the circle. This is how it will look on the Team page.</p>
        {err ? <p className="jf-fail" role="alert">{err}</p> : (
          <canvas
            ref={cv}
            className="crop-canvas"
            style={{ width: V, height: V }}
            tabIndex={0}
            aria-label="Photo position. Use arrow keys to move."
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y }; }}
            onPointerMove={(e) => { const d = drag.current; if (d) move({ x: d.ox + e.clientX - d.px, y: d.oy + e.clientY - d.py }); }}
            onPointerUp={() => { drag.current = null; }}
            onPointerCancel={() => { drag.current = null; }}
            onKeyDown={(e) => {
              const step = 12;
              const d: Record<string, Pos> = { ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 }, ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step } };
              if (d[e.key]) { e.preventDefault(); move({ x: pos.x + d[e.key].x, y: pos.y + d[e.key].y }); }
            }}
          />
        )}
        <label className="crop-zoom">Zoom
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => onZoom(Number(e.target.value))} disabled={!bmp} />
        </label>
        <div className="crop-actions">
          <button type="button" className="btn btn-go" onClick={save} disabled={!bmp}><span>Use this photo</span></button>
          <button type="button" className="btn btn-line" onClick={onCancel}><span>Cancel</span></button>
        </div>
      </div>
    </div>
  );
}