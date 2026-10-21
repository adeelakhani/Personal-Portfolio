"use client";

import { useEffect, useRef } from "react";

// ASCII planets, built on the math from Andy Sloane's donut.c: plot points
// across a parametric surface, project them, and keep the nearest one per
// character cell in a z-buffer. Shading is the glyph itself -- '.' is sparse,
// '@' is dense -- which is why the colour below stays nearly constant.

const CHARS = " .,-~:;=!*#$@";
const LEVELS = CHARS.length - 1; // 12

const CW = 0.6;          // monospace advance width, in units of font size
const CH = 1.05;         // line height, same units
const ASPECT = CH / CW;  // stretch x to undo the tall cell
const K2 = 5;            // viewer -> body distance, as in donut.c

const LX = 0.5, LY = 0.6, LZ = 0.62; // light direction, ~unit length

// Below roughly this on-screen radius (in character rows) the glyph ramp has
// too few cells to form a recognisable sphere and the body reads as stray
// punctuation. Anything that can't reach it is skipped rather than drawn.
const MIN_RAD = 9;

// Width of the centred content column (`mx-auto max-w-xl` in the sections).
// Bodies are laid out against its real edges: the margin either side is only
// ~210px on a 1000px window, so guessing at viewport fractions put the giant
// straight through the text.
const COL_W = 576;

type Vec3 = [number, number, number];
type Feature = { d: Vec3; c: number; k: number };
type Moon = {
  dist: number; rad: number; speed: number;
  tilt: number; phase: number; spin: number; feats: Feature[];
};
// a slow elliptical path the whole body travels along, as fractions of the
// viewport; omitted for bodies that stay put and only spin
type Drift = { rx: number; ry: number; speed: number; phase: number };

type Body = {
  x: number; y: number; size: number;
  sA: number; sB: number; oA: number; oB: number; ampA?: number;
  bands: number; band: number; bandPhase: number;
  feats: Feature[];
  ring: [number, number] | null;
  moons: Moon[];
  drift?: Drift;
  reach: number;      // widest extent including moons
  coreReach: number;  // widest extent of planet + ring alone
  // Opacity for this body alone. A body that passes behind the content column
  // is held well below the ones in the margins so the text stays the brightest
  // thing on the page.
  alpha: number;
  // true when the body may cross the content column -- the only way to get a
  // donut.c-scale object on this layout, since a fully visible ringed planet
  // needs ~420px and each margin is about 210px.
  overText?: boolean;
};

const dir = (theta: number, phi: number): Vec3 => [
  Math.sin(theta) * Math.cos(phi),
  Math.cos(theta),
  Math.sin(theta) * Math.sin(phi),
];
const feat = (theta: number, phi: number, c: number, k: number): Feature =>
  ({ d: dir(theta, phi), c, k });

// `x`/`y` are the body's centre as a fraction of the viewport, `size` its
// radius as a fraction of the viewport's smaller span. A body sits hard
// against the outer edge and is allowed to run off it -- a planet crossing the
// frame reads as deliberate, where a sliver of one reads as a glitch -- but it
// is never allowed to reach the text column, and never clipped top or bottom.
const PLANETS: Body[] = [
  {
    // ringed gas giant -- anchored, spins in place
    x: 0.78, y: 0.40, size: 0.2, alpha: 0.58, overText: true,
    sA: 0.33, ampA: 0.3, sB: 0.8, oA: 0.88, oB: 0,
    bands: 3, band: 0.22, bandPhase: 0.4,
    // several strong markings, not one faint spot: latitude bands are
    // symmetric about the pole, so only these carry the spin visually
    feats: [
      feat(0.25, 0.0, 0.72, -0.38), // bright polar cap
      feat(1.95, 0.8, 0.70, 0.45),
      feat(1.20, 3.4, 0.76, 0.38),
    ],
    // Tighter than a true Saturn ratio: the ring sets the body's total reach,
    // and reach is what the narrow margin has to divide by, so a wide ring
    // costs the planet itself a third of its radius.
    ring: [1.18, 1.45], moons: [], reach: 1, coreReach: 1,
  },
  {
    // banded world -- flies a slow loop up and down the left margin, with a
    // moon going round it as it travels
    x: 0.085, y: 0.55, size: 0.15, alpha: 0.85,
    sA: -0.5, sB: 0.7, oA: 2.1, oB: 1.3,
    bands: 4, band: 0.3, bandPhase: 1.2,
    feats: [
      feat(0.2, 0.0, 0.7, -0.5), // polar cap, brighter
      feat(1.45, 2.4, 0.68, 0.48),
    ],
    ring: null,
    // tilt near face-on: a shallow orbit swings mostly through depth, so the
    // moon's projected gap collapses and it merges with the planet's disc
    // a tighter orbit keeps the body's total reach small enough to still
    // clear the size threshold in a narrow margin
    moons: [{
      dist: 1.35, rad: 0.28, speed: 0.75, tilt: 1.05, phase: 1.1,
      spin: 0.5, feats: [feat(1.3, 1.0, 0.62, 0.42)],
    }],
    drift: { rx: 0.01, ry: 0.11, speed: 0.22, phase: 0 },
    reach: 1, coreReach: 1,
  },
  {
    // cratered rock -- tumbles fast, bobbing in the lower right margin
    x: 0.95, y: 0.70, size: 0.11, alpha: 0.85,
    sA: 0.7, sB: -0.9, oA: 3.7, oB: 2.0,
    bands: 2, band: 0.1, bandPhase: 0,
    feats: [
      feat(1.1, 0.6, 0.72, 0.52),
      feat(1.9, 2.6, 0.74, 0.46),
      feat(2.3, 4.6, 0.76, 0.42),
    ],
    ring: null, moons: [],
    // path stays in the right margin: the content column is centred, and a
    // body drifting behind the text reads as stray characters, not an object
    drift: { rx: 0.01, ry: 0.09, speed: 0.3, phase: 0 },
    reach: 1, coreReach: 1,
  },
];

// widest extent each body reaches, in units of its own radius
for (const p of PLANETS) {
  p.coreReach = Math.max(1, p.ring ? p.ring[1] : 0);
  p.reach = Math.max(p.coreReach, ...p.moons.map((m) => m.dist + m.rad));
}

export function BackgroundPlanets() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, cols = 0, rows = 0;
    let fontSize = 12, charW = 7.2, charH = 12.6;
    let buf = new Uint8Array(0);
    let zbuf = new Float32Array(0);

    const bucket: number[][] = [];
    for (let i = 0; i <= LEVELS; i++) bucket[i] = [];

    const mono = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-mono").trim();
    const fontStack =
      `${mono ? mono + ", " : ""}"JetBrains Mono", ui-monospace, Menlo, monospace`;

    // Measured every frame rather than once on mount: the canvas can still
    // report zero size while this first runs, and a one-shot setup would then
    // stay blank forever.
    const syncSize = () => {
      const el = document.documentElement;
      const w = Math.round(el.clientWidth || window.innerWidth || 0);
      const h = Math.round(el.clientHeight || window.innerHeight || 0);
      if (w === W && h === H) return;

      W = w; H = h;
      if (W < 1 || H < 1) { cols = 0; rows = 0; return; }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Small on purpose: the glyph size is the resolution knob. The margins
      // beside the content column are narrow, so a 12px font left the giant
      // about 9 cells of radius -- too coarse to read as a sphere, and far too
      // coarse for its surface markings to show it turning.
      // Floor of 10px: below that the glyphs stop reading as characters and
      // the body turns into a grey smudge, which defeats the whole effect.
      fontSize = W < 1200 ? 10 : 11;
      charW = fontSize * CW;
      charH = fontSize * CH;
      cols = Math.ceil(W / charW);
      rows = Math.ceil(H / charH);

      buf = new Uint8Array(cols * rows);
      zbuf = new Float32Array(cols * rows);
    };

    const plot = (xp: number, yp: number, ooz: number, L: number) => {
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) return;
      const i = yp * cols + xp;
      if (ooz <= zbuf[i]) return; // something nearer is already here
      zbuf[i] = ooz;
      const lum = Math.round(L * LEVELS);
      buf[i] = lum < 1 ? 1 : lum > LEVELS ? LEVELS : lum;
    };

    // One sphere of radius `rad`, centred at (ox,oy,oz) in the body's own
    // space. Spinning a sphere maps it onto itself, so the geometry never
    // changes -- only the surface markings carry the rotation, which is why
    // `feats` and the banding are indexed by the unrotated point.
    const sphere = (
      cx: number, cy: number, K1x: number, K1y: number,
      ox: number, oy: number, oz: number, rad: number,
      rotA: number, rotB: number,
      band: number, bands: number, bandPhase: number, feats: Feature[]
    ) => {
      const cosA = Math.cos(rotA), sinA = Math.sin(rotA);
      const cosB = Math.cos(rotB), sinB = Math.sin(rotB);

      const scale = rad * K1y / CH;
      const nTheta = Math.ceil(Math.max(8, scale * 6 / K2));
      const nPhi = Math.ceil(Math.max(16, scale * ASPECT * 20 / K2));
      const dTheta = Math.PI / nTheta;
      const dPhi = 6.2832 / nPhi;

      for (let theta = 0; theta < Math.PI; theta += dTheta) {
        const ct = Math.cos(theta), st = Math.sin(theta);
        const bandMul = band ? 1 + band * Math.sin(theta * bands + bandPhase) : 1;

        for (let phi = 0; phi < 6.2832; phi += dPhi) {
          const cp = Math.cos(phi), sp = Math.sin(phi);

          // on a unit sphere the surface point and its normal are one vector
          const ux = st * cp, uy = ct, uz = st * sp;

          // Spin about the body's own pole (local +Y) first, then tilt that
          // pole by A. The other order spins the pole itself, which drags a
          // ring through edge-on twice per revolution.
          const x1 = ux * cosB + uz * sinB;
          const z1 = -ux * sinB + uz * cosB;
          const ny = uy * cosA - z1 * sinA;
          const nz = uy * sinA + z1 * cosA;
          const nx = x1;

          const L = nx * LX + ny * LY + nz * LZ;
          if (L <= 0) continue; // pointing away from the light

          let f = bandMul;
          for (let i = 0; i < feats.length; i++) {
            const ft = feats[i];
            const d = ux * ft.d[0] + uy * ft.d[1] + uz * ft.d[2];
            if (d > ft.c) {
              const u = (d - ft.c) / (1 - ft.c);
              f -= ft.k * u * u; // negative k brightens instead
            }
          }
          if (f < 0.12) f = 0.12;

          const ooz = 1 / (K2 + oz + rad * nz);
          plot(
            Math.round(cx + K1x * ooz * (ox + rad * nx)),
            Math.round(cy - K1y * ooz * (oy + rad * ny)),
            ooz, L * f
          );
        }
      }
    };

    const renderBody = (p: Body, t: number) => {
      const d = p.drift;
      const dx = d ? d.rx * Math.cos(t * d.speed + d.phase) : 0;
      const dy = d ? d.ry * Math.sin(t * d.speed + d.phase) : 0;

      const cy = (p.y + dy) * rows;

      // Measured against the whole drift path rather than the current
      // position, so a travelling body keeps one size instead of swelling as
      // it crosses.
      const px = d ? d.rx : 0;
      const py = d ? d.ry : 0;

      // The inner limit is the content column, not the viewport: on a 1000px
      // window each margin is only ~210px, and sizing off the viewport put the
      // giant straight through the text and off the top edge.
      const colHalf = COL_W / 2 / charW;        // half the text column, in cells
      const mid = cols / 2;

      // A margin body is centred in whatever gap the content column leaves,
      // rather than at a guessed viewport fraction: that gap is about 210px on
      // a 1000px window and over 460px on a wide one, so a fixed fraction
      // either overlapped the text or wasted the room.
      let cxCells: number, clearX: number;
      if (p.overText) {
        cxCells = p.x * cols;
        clearX = Math.min(cxCells, cols - cxCells);
      } else {
        const right = p.x > 0.5;
        const edge = right ? mid + colHalf : mid - colHalf;
        const outer = right ? cols : 0;
        cxCells = (edge + outer) / 2;
        clearX = Math.abs(outer - edge) / 2;
      }
      clearX -= px * cols;

      const unit = Math.max(rows, cols / ASPECT);
      // vertical fit is strict: a body sliced by the top or bottom edge is
      // exactly the stray-characters artefact, so shrink rather than clip
      const vert = Math.min((p.y - py) * rows, (1 - p.y - py) * rows);

      const fit = (reach: number) =>
        Math.min(p.size * unit, clearX / (reach * ASPECT), vert / reach);

      // A moon costs the planet a third of its radius, since the orbit has to
      // fit the same gap. Where that would push the planet under the legible
      // floor, drop the moon and keep the planet readable instead.
      let moons = p.moons;
      let radRows = fit(p.reach);
      if (radRows < MIN_RAD && moons.length) {
        moons = [];
        radRows = fit(p.coreReach);
      }
      if (radRows < MIN_RAD) return; // too small to read; draw nothing at all

      const cx = cxCells + dx * cols;

      const K1y = radRows * K2; // the body's own radius is 1
      const K1x = K1y * ASPECT;

      // A ringed body rocks its tilt instead of tumbling: a full revolution
      // would carry the ring through edge-on and fully-open every cycle, and
      // wide open it swamps the planet. B still spins all the way round.
      const A = p.ampA ? p.oA + p.ampA * Math.sin(t * p.sA) : p.oA + t * p.sA;
      const B = p.oB + t * p.sB;

      sphere(cx, cy, K1x, K1y, 0, 0, 0, 1, A, B,
             p.band, p.bands, p.bandPhase, p.feats);

      if (p.ring) {
        const cosA = Math.cos(A), sinA = Math.sin(A);

        // A flat annulus on the body's equator. Spinning about the pole maps
        // the ring onto itself, so B never enters here -- only the tilt does.
        const [r0, r1] = p.ring;
        const nRad = Math.ceil((r1 - r0) * radRows * ASPECT * 3);
        const nPhiR = Math.ceil(r1 * radRows * ASPECT * 18);
        const dR = (r1 - r0) / nRad;
        const dPhiR = 6.2832 / nPhiR;

        // the ring's normal is the local +Y axis, carried through the tilt
        const face = Math.abs(cosA * LY + sinA * LZ);

        for (let r = r0; r <= r1; r += dR) {
          const u = (r - r0) / (r1 - r0);
          const gap = Math.abs(u - 0.42) < 0.08 ? 0.3 : 1; // Cassini-style division
          // Rings scatter light, so they stay readable even turned near
          // edge-on to it; without the floor they fall to stippled glyphs.
          // Kept clearly below the planet's own shading: at similar density
          // the ring's glyphs merge with the sphere's unlit side and the
          // silhouette disappears into one field of noise.
          const L = (0.22 + 0.40 * face) * gap * (0.94 - 0.3 * u);
          if (L <= 0.02) continue;

          for (let phi = 0; phi < 6.2832; phi += dPhiR) {
            const rx = r * Math.cos(phi), rz = r * Math.sin(phi);
            const y2 = -rz * sinA; // tilt about X by A
            const z2 = rz * cosA;

            const ooz = 1 / (K2 + z2);
            plot(Math.round(cx + K1x * ooz * rx),
                 Math.round(cy - K1y * ooz * y2), ooz, L);
          }
        }
      }

      // Moons orbit independently of the body's spin and share the z-buffer,
      // so they pass properly in front of and behind it.
      for (let i = 0; i < moons.length; i++) {
        const m = moons[i];
        const ang = t * m.speed + m.phase;
        const mx = m.dist * Math.cos(ang);
        const mz0 = m.dist * Math.sin(ang);
        const my = -mz0 * Math.sin(m.tilt);
        const mz = mz0 * Math.cos(m.tilt);

        sphere(cx, cy, K1x, K1y, mx, my, mz, m.rad,
               t * m.spin, t * m.spin * 0.6, 0, 0, 0, m.feats);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let t = 0;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.1) dt = 0.1; // clamp after a tab switch
      if (!reduced) t += dt;

      syncSize();
      if (!cols || !rows) return; // nothing to draw into yet

      ctx.clearRect(0, 0, W, H);
      ctx.font = `${fontSize}px ${fontStack}`;
      ctx.textBaseline = "top";

      // Drawn one body at a time so each can carry its own opacity: the hero
      // crosses the text and has to stay far dimmer than the margin bodies.
      // The z-buffer only ever has to resolve a body against itself and its
      // own moons, so clearing per body costs nothing.
      for (const p of PLANETS) {
        buf.fill(0);
        zbuf.fill(0);
        renderBody(p, t);

        for (let i = 1; i <= LEVELS; i++) bucket[i].length = 0;
        for (let r = 0; r < rows; r++) {
          const base = r * cols, y = r * charH;
          for (let c = 0; c < cols; c++) {
            const lum = buf[base + c];
            if (lum) bucket[lum].push(c * charW, y);
          }
        }

        // one fillStyle per luminance level instead of one per glyph
        for (let i = 1; i <= LEVELS; i++) {
          const cells = bucket[i];
          if (!cells.length) continue;
          const k = i / LEVELS;
          const cr = Math.round(214 + k * 41);
          const cg = Math.round(139 + k * 73);
          const cb = Math.round(56 + k * 90);
          // Near-constant alpha on purpose: the glyph does the shading, so
          // fading the dim end as well would erase the silhouette.
          const a = p.alpha * (0.8 + k * 0.2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
          const ch = CHARS[i];
          for (let n = 0; n < cells.length; n += 2) {
            ctx.fillText(ch, cells[n], cells[n + 1]);
          }
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="bg-planets pointer-events-none fixed inset-0 -z-10"
    />
  );
}
