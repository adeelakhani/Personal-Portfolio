"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const MATH_CHARS = "∀∂εΣπφ∞∫λθ∇κℏαηΔ√ℝ∈∃∋∝≈≠≤≥±×÷";
const NAME = "adeel akhani";

export function IntroSection() {
  const [display, setDisplay] = useState(NAME);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    iterRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(
        NAME.split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterRef.current) return NAME[i];
            return MATH_CHARS[Math.floor(Math.random() * MATH_CHARS.length)];
          })
          .join("")
      );

      iterRef.current += 0.5;
      if (iterRef.current >= NAME.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(NAME);
      }
    }, 40);
  }, []);

  useEffect(() => {
    // Start with scrambled text immediately on mount
    setDisplay(
      NAME.split("").map((c) => (c === " " ? " " : MATH_CHARS[Math.floor(Math.random() * MATH_CHARS.length)])).join("")
    );

    const initialDelay = setTimeout(() => {
      scramble();
    }, 400);

    const startLoop = () => {
      loopRef.current = setTimeout(() => {
        scramble();
        startLoop();
      }, 5000 + Math.random() * 5000);
    };

    const loopDelay = setTimeout(startLoop, 2000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(loopDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [scramble]);

  return (
    <section className="px-6 pt-36 pb-6 md:px-10 md:pt-48">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-12 cursor-default text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[3.25rem] select-none font-mono">
          {display}
        </h1>

        <p className="text-[15px] leading-[1.85] text-white/70">
          studying software engineering at the university of waterloo. solving cool problems.
          prev swe @{" "}
          <a href="https://boardy.ai/" target="_blank" rel="noopener noreferrer"
             className="text-white/90 underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/50">Boardy</a>
          ,{" "}
          <a href="https://scriptrunner.ai/" target="_blank" rel="noopener noreferrer"
             className="text-white/90 underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/50">Script Runner</a>
          ,{" "}
          <a href="https://www.softsages.com/" target="_blank" rel="noopener noreferrer"
             className="text-white/90 underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/50">SoftSages Technology</a>
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 text-[14px] text-white/40">
          <a href="https://github.com/adeelakhani" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[hsl(33,94%,61%)]">github</a>
          <a href="https://www.linkedin.com/in/adeelakhani/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[hsl(33,94%,61%)]">linkedin</a>
          <a href="https://x.com/adeel_712" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[hsl(33,94%,61%)]">x</a>
          <a href="mailto:aakhani@uwaterloo.ca" className="transition-colors hover:text-[hsl(33,94%,61%)]">email</a>
        </div>
      </div>
    </section>
  );
}
