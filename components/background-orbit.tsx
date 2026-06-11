"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function BackgroundOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // --- GRAVITY WELLS ---
    const wells = [
      { x: width * 0.72, y: height * 0.28, mass: 150 },
      { x: width * 0.2, y: height * 0.6, mass: 110 },
      { x: width * 0.85, y: height * 0.78, mass: 90 },
    ];

    // --- GRID ---
    const SPACING = 22;
    const cols = Math.ceil(width / SPACING) + 6;
    const rows = Math.ceil(height / SPACING) + 6;

    // --- GRAVITATIONAL WAVES ---
    const MAX_WAVES = 3;
    const waves: { cx: number; cy: number; age: number; maxAge: number; active: boolean }[] =
      Array.from({ length: MAX_WAVES }, () => ({ cx: 0, cy: 0, age: 0, maxAge: 0, active: false }));
    let nextWave = 2;

    // --- ORBITAL SYSTEM: tilted ellipses like planetary orbits ---
    const orbits = [
      { rx: 180, ry: 65, tilt: -0.3, speed: 0.15, planetSize: 2.5 },
      { rx: 280, ry: 100, tilt: 0.5, speed: -0.09, planetSize: 2.2 },
      { rx: 400, ry: 140, tilt: -0.15, speed: 0.055, planetSize: 3.0 },
      { rx: 520, ry: 180, tilt: 0.7, speed: -0.035, planetSize: 2.0 },
      { rx: 110, ry: 42, tilt: 1.1, speed: 0.22, planetSize: 1.8 },
    ];
    const orbitCenter = { x: width * 0.5, y: height * 0.42 };

    let t = 0;
    let raf = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const warpPoint = (px: number, py: number): [number, number, number] => {
      let wx = px;
      let wy = py;
      let totalForce = 0;

      for (const well of wells) {
        const dx = px - well.x;
        const dy = py - well.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        const force = well.mass / (dist * 0.6);
        const angle = Math.atan2(dy, dx);
        wx -= Math.cos(angle) * force;
        wy -= Math.sin(angle) * force;
        // swirl
        wx += Math.cos(angle + Math.PI * 0.5) * force * 0.4;
        wy += Math.sin(angle + Math.PI * 0.5) * force * 0.4;
        totalForce += force;
      }

      // mouse repulsion (subtle)
      const mdx = px - mouseX;
      const mdy = py - mouseY;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy) + 1;
      if (mDist < 120) {
        const mForce = (1 - mDist / 120) * 12;
        const mAngle = Math.atan2(mdy, mdx);
        wx += Math.cos(mAngle) * mForce;
        wy += Math.sin(mAngle) * mForce;
      }

      // wave distortion
      for (const wave of waves) {
        if (!wave.active) continue;
        const dx = px - wave.cx;
        const dy = py - wave.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const p = wave.age / wave.maxAge;
        const waveRadius = p * Math.max(width, height) * 0.9;
        const waveWidth = 80;
        const distFromWave = Math.abs(dist - waveRadius);
        if (distFromWave < waveWidth) {
          const intensity = (1 - distFromWave / waveWidth) * (1 - p) * 14;
          const angle = Math.atan2(dy, dx);
          wx += Math.cos(angle) * intensity * Math.sin(dist * 0.04);
          wy += Math.sin(angle) * intensity * Math.sin(dist * 0.04);
        }
      }

      return [wx, wy, totalForce];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Orbital system: tilted ellipses ---
      const ocx = orbitCenter.x;
      const ocy = orbitCenter.y;

      // central star
      const starPulse = 0.7 + 0.3 * Math.sin(t * 0.6);
      const starGlow = ctx.createRadialGradient(ocx, ocy, 0, ocx, ocy, 45);
      starGlow.addColorStop(0, `rgba(245, 166, 35, ${0.9 * starPulse})`);
      starGlow.addColorStop(0.25, `rgba(245, 166, 35, ${0.35 * starPulse})`);
      starGlow.addColorStop(0.6, `rgba(245, 166, 35, ${0.08 * starPulse})`);
      starGlow.addColorStop(1, "transparent");
      ctx.fillStyle = starGlow;
      ctx.beginPath();
      ctx.arc(ocx, ocy, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ocx, ocy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 100, ${0.95 * starPulse})`;
      ctx.fill();

      // orbit paths + planets
      orbits.forEach((orb) => {
        ctx.save();
        ctx.translate(ocx, ocy);
        ctx.rotate(orb.tilt);

        // orbit ellipse — dashed for variety
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(245, 166, 35, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // planet
        const angle = t * orb.speed;
        const px = Math.cos(angle) * orb.rx;
        const py = Math.sin(angle) * orb.ry;

        // planet glow
        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, orb.planetSize * 5);
        pGlow.addColorStop(0, `rgba(245, 166, 35, 0.25)`);
        pGlow.addColorStop(1, "transparent");
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(px, py, orb.planetSize * 5, 0, Math.PI * 2);
        ctx.fill();

        // planet core
        ctx.beginPath();
        ctx.arc(px, py, orb.planetSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();

        ctx.restore();
      });

      // --- Warped dot grid ---
      for (let row = -3; row < rows; row++) {
        for (let col = -3; col < cols; col++) {
          const baseX = col * SPACING;
          const baseY = row * SPACING;
          const [wx, wy, force] = warpPoint(baseX, baseY);

          if (wx < -10 || wx > width + 10 || wy < -10 || wy > height + 10) continue;

          const size = 0.8 + Math.min(force * 0.012, 2.0);
          const alpha = 0.15 + Math.min(force * 0.008, 0.6);

          ctx.beginPath();
          ctx.arc(wx, wy, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      // --- Grid lines near warps (amber) ---
      // horizontal
      for (let row = -3; row < rows; row++) {
        for (let col = -3; col < cols - 1; col++) {
          const [x1, y1, f1] = warpPoint(col * SPACING, row * SPACING);
          const [x2, y2, f2] = warpPoint((col + 1) * SPACING, row * SPACING);
          const avgForce = (f1 + f2) / 2;
          if (avgForce > 3) {
            const alpha = Math.min(avgForce * 0.006, 0.2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      // vertical
      for (let row = -3; row < rows - 1; row++) {
        for (let col = -3; col < cols; col++) {
          const [x1, y1, f1] = warpPoint(col * SPACING, row * SPACING);
          const [x2, y2, f2] = warpPoint(col * SPACING, (row + 1) * SPACING);
          const avgForce = (f1 + f2) / 2;
          if (avgForce > 3) {
            const alpha = Math.min(avgForce * 0.006, 0.2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // --- Gravity well cores ---
      for (const well of wells) {
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.8 + well.mass);
        const glowR = well.mass * 0.22 * pulse;

        const glow = ctx.createRadialGradient(well.x, well.y, 0, well.x, well.y, glowR);
        glow.addColorStop(0, `rgba(245, 166, 35, ${0.35 * pulse})`);
        glow.addColorStop(0.3, `rgba(245, 166, 35, ${0.12 * pulse})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(well.x, well.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // hard center dot
        ctx.beginPath();
        ctx.arc(well.x, well.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 180, 80, ${0.7 * pulse})`;
        ctx.fill();
      }

      // --- Wave ripple rings ---
      for (const wave of waves) {
        if (!wave.active) continue;
        const p = wave.age / wave.maxAge;
        const waveRadius = p * Math.max(width, height) * 0.9;
        const alpha = (1 - p) * 0.15;

        ctx.beginPath();
        ctx.arc(wave.cx, wave.cy, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    let last = performance.now();
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      const dt = (now - last) / 1000;
      last = now;
      t += dt;

      // drift wells slowly
      wells[0].x = width * 0.72 + Math.sin(t * 0.07) * 30;
      wells[0].y = height * 0.28 + Math.cos(t * 0.05) * 20;
      wells[1].x = width * 0.2 + Math.sin(t * 0.06 + 2) * 25;
      wells[1].y = height * 0.6 + Math.cos(t * 0.08 + 1) * 18;
      wells[2].x = width * 0.85 + Math.sin(t * 0.04 + 4) * 20;
      wells[2].y = height * 0.78 + Math.cos(t * 0.06 + 3) * 22;

      // gravitational waves
      if (t >= nextWave) {
        nextWave = t + 4 + Math.random() * 5;
        const inactive = waves.find((w) => !w.active);
        if (inactive) {
          const src = wells[Math.floor(Math.random() * wells.length)];
          inactive.cx = src.x;
          inactive.cy = src.y;
          inactive.age = 0;
          inactive.maxAge = 3.5;
          inactive.active = true;
        }
      }
      waves.forEach((w) => {
        if (w.active) {
          w.age += dt;
          if (w.age >= w.maxAge) w.active = false;
        }
      });

      draw();
    };
    raf = requestAnimationFrame(animate);

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
