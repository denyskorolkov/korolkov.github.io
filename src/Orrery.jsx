import React, { useEffect, useRef } from 'react';

/* Routine Run as a solar system.
 * Each orbit is a routine. Each planet is a run going round it. The steps sit
 * at classical aspect angles, measured from the conjunction at the top. A step
 * lights up when the run passes it; at the conjunction the lap closes and the
 * steps reset for the next run. In the middle sits a small black hole: what
 * is hidden, and what everything turns around.
 *
 * Animation is driven by requestAnimationFrame and only runs while the orrery
 * is on screen. Under prefers-reduced-motion it renders one still frame. */

const ASPECTS = {
  0: '☌', // conjunction
  60: '⚹', // sextile
  90: '□', // square
  120: '△', // trine
  180: '☍', // opposition
  240: '△',
  270: '□',
  300: '⚹'
};

const ORBITS = [
  { r: 74, period: 9, steps: [0, 90, 180, 270], color: '#fb923c', size: 7, start: 200 },
  { r: 122, period: 16, steps: [0, 60, 120, 180, 240, 300], color: '#ec4899', size: 9, start: 95 },
  { r: 170, period: 27, steps: [0, 120, 240], color: '#a855f7', size: 11, start: 300 }
];

const CX = 200;
const CY = 200;

// 0° is the top of the orbit and angles grow clockwise, like a chart wheel.
const point = (r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};

const DONE = '#FF9F0A';
const PENDING = 'rgba(255,255,255,0.18)';

export default function Orrery() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const planets = ORBITS.map((_, i) => svg.querySelector(`[data-planet="${i}"]`));
    const trails = ORBITS.map((_, i) => svg.querySelector(`[data-trail="${i}"]`));
    const steps = ORBITS.map((orbit, i) =>
      orbit.steps.map((deg) => svg.querySelector(`[data-step="${i}-${deg}"]`))
    );

    const draw = (seconds) => {
      ORBITS.forEach((orbit, i) => {
        const angle = (orbit.start + (seconds / orbit.period) * 360) % 360;
        const [x, y] = point(orbit.r, angle);
        planets[i].setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);

        // a short comet tail behind the planet
        const tail = Math.min(angle, 38);
        const [tx, ty] = point(orbit.r, angle - tail);
        trails[i].setAttribute(
          'd',
          `M ${tx.toFixed(2)} ${ty.toFixed(2)} A ${orbit.r} ${orbit.r} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`
        );

        orbit.steps.forEach((deg, j) => {
          const node = steps[i][j];
          const passed = deg === 0 ? angle < 14 : angle >= deg;
          node.setAttribute('fill', passed ? DONE : PENDING);
          node.setAttribute('r', passed ? '5' : '4');
        });
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(4);
      return undefined;
    }

    let frame = 0;
    let visible = false;
    let origin = 0;
    let elapsed = 4;
    const tick = (now) => {
      if (!origin) origin = now - elapsed * 1000;
      elapsed = (now - origin) / 1000;
      draw(elapsed);
      if (visible) frame = requestAnimationFrame(tick);
    };
    draw(elapsed);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      origin = 0;
      if (visible) frame = requestAnimationFrame(tick);
    });
    observer.observe(svg);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="Three orbits around a small black hole. Planets travel along them and light up steps placed at aspect angles."
    >
      <defs>
        <radialGradient id="orrery-disk" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#020617" stopOpacity="0" />
          <stop offset="70%" stopColor="#FDD9E3" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#FE0494" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <filter id="orrery-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {ORBITS.map((orbit, i) => (
          <linearGradient key={orbit.color} id={`orrery-trail-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={orbit.color} stopOpacity="0" />
            <stop offset="100%" stopColor={orbit.color} stopOpacity="0.9" />
          </linearGradient>
        ))}
      </defs>

      {/* aspect spokes, very faint */}
      {[0, 60, 90, 120, 180, 240, 270, 300].map((deg) => {
        const [x, y] = point(190, deg);
        return (
          <line key={deg} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 6" />
        );
      })}

      {/* the orbits: routines */}
      {ORBITS.map((orbit) => (
        <circle
          key={orbit.r}
          cx={CX}
          cy={CY}
          r={orbit.r}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />
      ))}

      {/* aspect glyphs on the outer ring */}
      {Object.entries(ASPECTS).map(([deg, glyph]) => {
        const [x, y] = point(194, Number(deg));
        return (
          <text
            key={deg}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fill="rgba(253,230,138,0.55)"
          >
            {glyph}
          </text>
        );
      })}

      {/* the steps: points at aspect angles on each orbit */}
      {ORBITS.map((orbit, i) =>
        orbit.steps.map((deg) => {
          const [x, y] = point(orbit.r, deg);
          return (
            <circle
              key={`${i}-${deg}`}
              data-step={`${i}-${deg}`}
              cx={x}
              cy={y}
              r="4"
              fill={PENDING}
              stroke="rgba(2,6,23,0.9)"
              strokeWidth="2"
              style={{ transition: 'fill 0.4s ease' }}
            />
          );
        })
      )}

      {/* the hidden centre: a small black hole */}
      <circle cx={CX} cy={CY} r="34" fill="url(#orrery-disk)" filter="url(#orrery-glow)" />
      <circle cx={CX} cy={CY} r="19" fill="#000" />
      <circle cx={CX} cy={CY} r="20.5" fill="none" stroke="#FDD9E3" strokeOpacity="0.85" strokeWidth="1.2" />

      {/* the runs: planets with a short trail */}
      {ORBITS.map((orbit, i) => (
        <g key={orbit.color}>
          <path data-trail={i} d="" fill="none" stroke={orbit.color} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
          <g data-planet={i}>
            <circle r={orbit.size + 6} fill={orbit.color} opacity="0.18" />
            <circle r={orbit.size} fill={orbit.color} filter="url(#orrery-glow)" />
            <circle r={orbit.size * 0.45} cx={-orbit.size * 0.25} cy={-orbit.size * 0.25} fill="#fff" opacity="0.55" />
          </g>
        </g>
      ))}
    </svg>
  );
}
