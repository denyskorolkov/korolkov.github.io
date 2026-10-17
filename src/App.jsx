import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  Menu,
  Send,
  Terminal,
  X
} from 'lucide-react';
import { SiteFooter, useMotion, useMouseParallax, useParallax } from './site.jsx';
import Orrery from './Orrery.jsx';
import { BELIEF, CONNECTIONS, CONTACT, HERO, MUSIC, NOTES, NOW, PATH, PROCESS, ROADMAP, SITE, STARS, WORKS } from './content.js';

const CONTACT_FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbydnxBOSy-mWkYah0lr2h6eUoxgfBafKBGbxkAb4LrKmNmEG1STUHQhoFEcKQO1RNiV/exec';

// Must match FORM_GUARD_TOKEN in the Apps Script backend. Not a secret —
// just filters out generic bots replaying the old payload shape, which is
// what's been spamming this endpoint directly (see 2026-08 incident).
const FORM_GUARD_TOKEN = 'kp-guard-2026-08';

const NAV_LINKS = [
  { name: 'Music', href: '#music' },
  { name: 'Now', href: '#now' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Work', href: '#works' },
  { name: 'Stars', href: '#stars' },
  { name: 'Notes', href: '/notes/' }
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-800 bg-slate-900/90 py-3 backdrop-blur-md md:py-4'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white sm:text-2xl">
          <Terminal className="h-5 w-5 text-orange-400 sm:h-6 sm:w-6" aria-hidden="true" />
          <span>
            DENYS<span className="text-slate-500">.DEV</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Say hello
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 border-t border-slate-800 bg-slate-950/95 px-4 py-2 backdrop-blur-md md:hidden">
          {[...NAV_LINKS, { name: 'Say hello', href: '#contact' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex min-h-[48px] items-center border-b border-slate-800/80 text-base text-slate-300 last:border-0 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const mousePos = useMouseParallax(0.02);
  const scrollY = useParallax(0.25);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Palm Coast at sunset: the sun sits behind the photo, a flow of steps runs over the water */}
      <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
        <img
          src={HERO.background}
          alt=""
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-[115%] w-full object-cover object-[68%_center] opacity-90"
          style={{ transform: `translate3d(${mousePos.x * -1}px, ${scrollY * -1 + mousePos.y * -1}px, 0) scale(1.04)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
          <div className="max-w-3xl md:flex-1">
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-200 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              {HERO.eyebrow}
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              {HERO.lead}
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {HERO.rest}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{HERO.body}</p>

            <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
              <a
                href="#why"
                className="group flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200 sm:text-base"
              >
                Why I keep building this
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#now"
                className="glass flex min-h-[44px] items-center justify-center rounded-full px-7 py-3 text-center text-sm font-medium text-white transition-all sm:text-base"
              >
                What I am doing now
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {HERO.status.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="glass inline-flex min-h-[36px] items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-slate-200 transition-colors hover:text-white sm:text-sm"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.kind === 'looking' ? 'animate-pulse bg-orange-400' : 'bg-indigo-400'
                      }`}
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-48 flex-shrink-0 sm:w-56 md:mx-0 md:w-64">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-400/40 via-pink-500/30 to-purple-600/40 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-orange-400/70 shadow-[0_0_50px_-8px_rgba(251,146,60,0.6)]">
              <img
                src="/denys-korolkov.webp"
                alt="Denys Korolkov"
                width="640"
                height="640"
                fetchpriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({ children, gradient, aside }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-3">
    <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{children}</span>
    </h2>
    {aside}
  </div>
);

/* A generated background image behind a whole section, fading into the
 * page colour so text on top stays readable. */
const SectionBackdrop = ({ image, position = 'object-right', opacity = 'opacity-60', fade = 'down', className = 'inset-0' }) => (
  <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
    <img src={image} alt="" loading="lazy" className={`h-full w-full object-cover ${position} ${opacity}`} />
    <div
      className={`absolute inset-0 ${
        fade === 'up'
          ? 'bg-gradient-to-t from-slate-950/10 via-slate-950/55 to-slate-950'
          : fade === 'both'
          ? 'bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950'
          : 'bg-gradient-to-b from-slate-950/20 via-slate-950/50 to-slate-950'
      }`}
    />
  </div>
);

const BELIEF_ACCENTS = {
  shape: 'from-orange-400 to-pink-500',
  decisions: 'from-pink-500 to-purple-500',
  everyone: 'from-purple-400 to-indigo-400'
};

const Belief = () => (
  <section id="why" className="ambient relative scroll-mt-20 bg-slate-900/40 py-16 sm:py-20 md:py-24">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle gradient="from-orange-400 to-pink-500">{BELIEF.heading}</SectionTitle>
      <div className="snap-row hide-scrollbar mt-10 grid gap-6 md:grid-cols-3">
        {BELIEF.cards.map((card, i) => (
          <article
            key={card.key}
            className="glass group overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.35)] sm:p-8"
          >
            <span
              className={`pointer-events-none absolute -bottom-8 -right-1 select-none bg-gradient-to-br ${BELIEF_ACCENTS[card.key]} bg-clip-text font-mono text-[7rem] font-bold leading-none text-transparent opacity-20 transition-opacity group-hover:opacity-40`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={`relative bg-gradient-to-r ${BELIEF_ACCENTS[card.key]} bg-clip-text text-xl font-bold text-transparent`}>
              {card.title}
            </h3>
            <p className="relative mt-4 text-base leading-relaxed text-slate-400">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Now = () => (
  <section id="now" className="ambient-warm scroll-mt-20 bg-slate-950 py-16 sm:py-20 md:py-24">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle
        gradient="from-cyan-400 to-indigo-500"
        aside={<p className="font-mono text-xs uppercase tracking-widest text-slate-500">{NOW.asOf}</p>}
      >
        {NOW.heading}
      </SectionTitle>

      <div className="snap-row hide-scrollbar mt-10 grid gap-6 md:grid-cols-2">
        {NOW.cards.map((card) => {
          const looking = card.kind === 'Looking for';
          const idea = card.kind === 'Next idea';
          return (
            <article
              key={card.key}
              className={`flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 sm:p-8 ${
                looking
                  ? 'glass-warm hover:shadow-[0_0_30px_-10px_rgba(251,146,60,0.4)]'
                  : idea
                  ? 'glass-gold hover:shadow-[0_0_30px_-10px_rgba(252,211,77,0.35)]'
                  : 'glass hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.35)]'
              }`}
            >
              <p
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${
                  looking ? 'bg-orange-400/15 text-orange-300' : idea ? 'bg-amber-300/15 text-amber-200' : 'bg-indigo-500/15 text-indigo-300'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${looking ? 'animate-pulse bg-orange-400' : idea ? 'bg-amber-300' : 'bg-indigo-400'}`} />
                {card.kind}
              </p>
              <div className="mt-5 flex items-center gap-4">
                {card.icon && (
                  <img
                    loading="lazy"
                    decoding="async"
                    src={card.icon}
                    alt=""
                    width="56"
                    height="56"
                    className="h-12 w-12 flex-shrink-0 rounded-[22%] shadow-lg"
                  />
                )}
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>
              <p className="mt-4 flex-1 text-base leading-relaxed text-slate-400">{card.body}</p>
              <a
                href={card.link.href}
                {...(card.link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-orange-400"
              >
                {card.link.label}
                {card.link.external ? (
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* Roadmap in Routine Run's own visual language (routinerun.com/site.css):
 * the dusk sky, the cream moon, the pink-to-violet ring, amber step beads
 * for done and current steps, SF type and glass cards. */
const RR_FONT = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif'
};
const RR_RING = 'linear-gradient(135deg,#FE0494 0%,#FD02B4 28%,#E302FC 60%,#D673F1 100%)';

const ProgressRing = ({ done, total }) => {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true" className="flex-shrink-0">
      <defs>
        <linearGradient id="rr-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE0494" />
          <stop offset="60%" stopColor="#E302FC" />
          <stop offset="100%" stopColor="#D673F1" />
        </linearGradient>
      </defs>
      <circle cx="19" cy="19" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
      <circle
        cx="19"
        cy="19"
        r={r}
        fill="none"
        stroke="url(#rr-ring)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - done / total)}
        transform="rotate(-90 19 19)"
        className="ring-fill"
        style={{ '--ring-c': c }}
      />
    </svg>
  );
};

const STEP_CHIP = {
  done: { label: 'Done', className: 'bg-[#30D158]/15 text-[#30D158]' },
  now: { label: 'Now', className: 'text-white', style: { background: RR_RING } },
  next: { label: 'Next', className: 'bg-[#40C8E0]/15 text-[#40C8E0]' },
  later: { label: 'Later', className: 'bg-white/10 text-white/60' }
};

const StepBead = ({ state, n }) => {
  if (state === 'done') {
    return (
      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[#FF9F0A]/55 text-white">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  if (state === 'now') {
    return (
      <span className="relative grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[#FF9F0A] text-sm font-semibold text-white shadow-[0_0_0_4px_rgba(255,159,10,0.3),0_0_24px_rgba(255,159,10,0.55)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#FF9F0A]/40" />
        <span className="relative tabular-nums">{n}</span>
      </span>
    );
  }
  return (
    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold tabular-nums text-white/60 ring-1 ring-white/15">
      {n}
    </span>
  );
};

const Roadmap = () => {
  const steps = ROADMAP.steps;
  const listRef = useRef(null);

  // On phones the steps are a swipe row: open it on the step in progress.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.matchMedia('(max-width: 639px)').matches) return;
    const now = list.querySelector('[data-state="now"]');
    if (now) list.scrollLeft = now.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft);
  }, []);
  const doneCount = steps.filter((s) => s.state === 'done').length;
  const current = steps.findIndex((s) => s.state === 'now') + 1;

  return (
    <section
      id="roadmap"
      className="relative scroll-mt-20 overflow-hidden py-16 text-white sm:py-20 md:py-24"
      style={{ ...RR_FONT, background: 'linear-gradient(180deg,#001C41 0%,#2A1B4E 62%,#6B3A6E 100%)' }}
    >
      {/* stars and moon, as on routinerun.com */}
      <div
        className="twinkle pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(1.2px 1.2px at 12% 18%,#fff9 50%,transparent),radial-gradient(1px 1px at 28% 42%,#fff7 50%,transparent),radial-gradient(1.4px 1.4px at 46% 12%,#fffa 50%,transparent),radial-gradient(1px 1px at 63% 30%,#fff6 50%,transparent),radial-gradient(1.2px 1.2px at 78% 8%,#fff9 50%,transparent),radial-gradient(1px 1px at 88% 36%,#fff6 50%,transparent),radial-gradient(1px 1px at 6% 55%,#fff5 50%,transparent),radial-gradient(1.3px 1.3px at 38% 60%,#fff6 50%,transparent)'
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-12 -top-6 h-32 w-32 rounded-full opacity-50 sm:right-[6%] sm:top-10 sm:h-56 sm:w-56 sm:opacity-100"
        style={{
          background:
            'radial-gradient(circle,#FDD9E3 0 34%,rgba(253,217,227,.28) 35%,rgba(253,217,227,.08) 55%,transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/60">{ROADMAP.heading}</p>
        <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          <span style={{ background: RR_RING, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            {ROADMAP.title}
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">{ROADMAP.sub}</p>

        {/* Live Activity style pill */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-black/40 py-2 pl-2 pr-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-xl">
          <img loading="lazy" decoding="async" src="/routine-run-icon.webp" alt="" width="32" height="32" className="h-8 w-8 rounded-[22%]" />
          <div className="leading-tight">
            <p className="text-[15px] font-semibold">Routine Run roadmap</p>
            <p className="text-[13px] tabular-nums text-white/60">
              {current} of {steps.length} · {doneCount} done
            </p>
          </div>
          <ProgressRing done={doneCount} total={steps.length} />
        </div>

        {/* step track: beads and segments */}
        <div className="mt-10 hidden items-center md:flex" aria-hidden="true">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              <span
                className={`h-3 w-3 flex-shrink-0 rounded-full ${
                  step.state === 'done'
                    ? 'bg-[#FF9F0A]/55'
                    : step.state === 'now'
                    ? 'scale-150 bg-[#FF9F0A] shadow-[0_0_0_3px_rgba(255,159,10,0.35)]'
                    : 'bg-white/25'
                }`}
              />
              {i < steps.length - 1 && (
                <span
                  className={`h-[3px] flex-1 ${
                    step.state === 'done' ? 'bg-[#FF9F0A]/70' : 'bg-white/20'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <ol ref={listRef} className="snap-row hide-scrollbar mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const chip = STEP_CHIP[step.state];
            return (
              <li
                key={step.title}
                data-state={step.state}
                className={`flex gap-4 rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 ${
                  step.state === 'now'
                    ? 'glass-warm !shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_20px_40px_-20px_rgba(254,4,148,0.6)]'
                    : 'glass'
                } ${step.state === 'later' ? 'opacity-75' : ''}`}
              >
                <StepBead state={step.state} n={i + 1} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${chip.className}`}
                      style={chip.style}
                    >
                      {chip.label}
                    </span>
                    <span className="text-[13px] text-white/55">{step.when}</span>
                  </div>
                  <h3 className="mt-2 text-[17px] font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-5 text-white/70">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/* A checklist: boxes scattered with no path between them. */
const ChecklistMark = () => (
  <svg viewBox="0 0 96 64" className="h-16 w-24 flex-shrink-0" aria-hidden="true">
    {[
      [8, 10, true],
      [52, 6, false],
      [30, 30, true],
      [74, 26, false],
      [12, 46, false],
      [60, 46, true]
    ].map(([x, y, done]) => (
      <g key={`${x}-${y}`}>
        <rect x={x} y={y} width="13" height="13" rx="3" fill="none" stroke="rgba(203,213,225,0.55)" strokeWidth="1.5" />
        {done && <path d={`M${x + 3} ${y + 7} l3 3 l5 -6`} fill="none" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
      </g>
    ))}
  </svg>
);

/* A flow: one line running through stages, moving. */
const FlowMark = () => (
  <svg viewBox="0 0 96 64" className="h-16 w-24 flex-shrink-0" aria-hidden="true">
    <defs>
      <linearGradient id="flow-mark" x1="0" x2="1">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M4 44 C 20 44, 22 18, 38 18 S 58 46, 72 40 S 88 18, 92 16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" strokeLinecap="round" />
    <path
      className="flow-dash"
      d="M4 44 C 20 44, 22 18, 38 18 S 58 46, 72 40 S 88 18, 92 16"
      fill="none"
      stroke="url(#flow-mark)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="6 7"
    />
    {[[4, 44], [38, 18], [72, 40], [92, 16]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="4.5" fill={i < 3 ? '#FF9F0A' : 'rgba(255,255,255,0.25)'} stroke="#020617" strokeWidth="2" />
    ))}
  </svg>
);

const PROCESS_STYLE = {
  score: {
    chip: 'bg-slate-700/60 text-slate-200',
    ring: 'glass',
    title: 'from-slate-200 to-slate-400',
    bars: [1, 1, 1, 1, 1, 1, 1, 1]
  },
  tune: {
    chip: 'bg-pink-500/15 text-pink-300',
    ring: 'glass-warm hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.45)]',
    title: 'from-orange-400 via-pink-500 to-purple-500',
    bars: [0.5, 0.9, 0.35, 1, 0.65, 0.8, 0.45, 0.95]
  }
};

const Process = () => (
  <div id="process" className="relative scroll-mt-24 pt-20 sm:pt-24">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <Movement n="II" gradient="from-orange-400 via-pink-500 to-purple-500">{PROCESS.heading}</Movement>
      <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">{PROCESS.sub}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PROCESS.contrast.map((item) => (
          <article key={item.key} className="glass flex items-center gap-5 rounded-3xl p-5 sm:p-6">
            {item.key === 'checklist' ? <ChecklistMark /> : <FlowMark />}
            <div>
              <h3 className={`text-lg font-bold ${item.key === 'flow' ? 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-slate-200'}`}>
                {item.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-base text-slate-300 sm:text-lg">{PROCESS.lead}</p>

      <div className="snap-row hide-scrollbar mt-10 grid gap-6 md:grid-cols-2">
        {PROCESS.kinds.map((kind) => {
          const style = PROCESS_STYLE[kind.key];
          return (
            <article
              key={kind.key}
              className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 sm:p-8 ${style.ring}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${style.chip}`}>
                    {kind.label}
                  </p>
                  <h3 className={`mt-4 bg-gradient-to-r ${style.title} bg-clip-text text-3xl font-bold text-transparent`}>
                    {kind.title}
                  </h3>
                </div>
                {/* a tiny "waveform": even bars for the score, uneven for the tune */}
                <div className="flex h-12 items-end gap-1" aria-hidden="true">
                  {style.bars.map((h, i) => (
                    <span
                      key={i}
                      className={`eq-bar w-1.5 rounded-full ${
                        kind.key === 'tune'
                          ? 'eq-jazz bg-gradient-to-t from-orange-400 to-purple-500'
                          : 'eq-steady bg-slate-500'
                      }`}
                      style={
                        kind.key === 'tune'
                          ? { height: `${h * 100}%`, '--dur': `${0.7 + h * 0.9}s`, '--delay': `${-i * 0.37}s` }
                          : { height: '100%' }
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-base leading-relaxed text-slate-300">{kind.good}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-base leading-relaxed text-slate-400">{kind.cost}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-300">{PROCESS.close}</p>
    </div>
  </div>
);

const LENS_ACCENTS = {
  math: 'from-cyan-400 to-indigo-400',
  architecture: 'from-indigo-400 to-purple-400',
  psychology: 'from-purple-400 to-pink-400',
  history: 'from-pink-400 to-orange-400',
  astrology: 'from-amber-200 to-pink-300'
};

const Connections = () => (
  <div id="connections" className="relative scroll-mt-24 pt-20 sm:pt-24">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <Movement n="III" gradient="from-cyan-400 via-indigo-400 to-purple-500">{CONNECTIONS.heading}</Movement>
      <div className="mt-4 max-w-3xl space-y-3">
        {CONNECTIONS.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-300 sm:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {/* five lenses */}
      <div className="snap-row hide-scrollbar mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CONNECTIONS.lenses.map((lens) => (
          <article
            key={lens.key}
            className="glass rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className={`bg-gradient-to-r ${LENS_ACCENTS[lens.key]} bg-clip-text text-base font-bold text-transparent`}>
              {lens.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{lens.body}</p>
          </article>
        ))}
      </div>

      {/* the mathematics of an interview */}
      <article className="glass-cool mt-6 grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-300/80">{CONNECTIONS.math.where}</p>
          <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{CONNECTIONS.math.title}</h3>
          <div className="mt-4 space-y-3">
            {CONNECTIONS.math.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-slate-800 bg-slate-950/80 p-5 font-mono sm:p-6">
          {CONNECTIONS.math.formulas.map((formula) => (
            <p key={formula} className="py-2 text-lg text-cyan-200 sm:text-xl">
              {formula}
            </p>
          ))}
          <p className="mt-4 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
            {CONNECTIONS.math.legend}
          </p>
        </div>
      </article>

      {/* history as production logs, over the neon ruins */}
      <div className="glass-rim mt-14 overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10">
        <img
          loading="lazy"
          decoding="async"
          src={CONNECTIONS.history.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" aria-hidden="true" />
      <div className="relative">
      <h3 className="text-xl font-bold text-white sm:text-2xl">{CONNECTIONS.history.title}</h3>
      <div className="snap-row hide-scrollbar mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONNECTIONS.history.items.map((item) => (
          <article
            key={item.then}
            className="glass group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
          >
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <span className="text-slate-200">{item.then}</span>
              <ArrowRight className="h-4 w-4 text-orange-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">{item.now}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
          </article>
        ))}
      </div>
      </div>
      </div>
    </div>
  </div>
);

const Movement = ({ n, gradient, children }) => (
  <div className="flex items-baseline gap-4">
    <span className="font-serif text-3xl italic text-slate-600 sm:text-4xl" aria-hidden="true">
      {n}
    </span>
    <h3 className="text-2xl font-bold sm:text-3xl">
      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{children}</span>
    </h3>
  </div>
);

/* One section, three movements: rhythm, score and tune, the maths underneath. */
const Music = () => (
  <section id="music" className="relative scroll-mt-20 overflow-hidden bg-slate-950 pb-20 pt-16 sm:pb-24 sm:pt-20 md:pt-24">
    {MUSIC.background && (
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px]" aria-hidden="true">
        <img loading="lazy" decoding="async" src={MUSIC.background} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />
      </div>
    )}

    <SoundWaves />

    <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle gradient="from-orange-400 via-pink-500 to-purple-600">{MUSIC.heading}</SectionTitle>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Movement n="I" gradient="from-amber-200 to-orange-400">{MUSIC.movement}</Movement>
          <div className="mt-5 space-y-4">
            {MUSIC.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-300 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {MUSIC.ratios.map((ratio) => (
            <div
              key={ratio.name}
              className="glass flex items-center gap-5 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <svg viewBox="0 0 120 40" className="h-10 w-28 flex-shrink-0" aria-hidden="true">
                <defs>
                  <linearGradient id={`wave-${ratio.name}`} x1="0" x2="1">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <RatioWave a={ratio.a} b={ratio.b} stroke={`url(#wave-${ratio.name})`} />
              </svg>
              <div>
                <p className="font-mono text-2xl text-white">
                  {ratio.a} : {ratio.b}
                </p>
                <p className="text-sm text-slate-400">{ratio.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Process />
    <Connections />
  </section>
);

/* Two sine waves at frequency ratio a:b, summed: what an interval looks like. */
function wavePath(a, b, phase = 0) {
  const points = [];
  for (let x = 0; x <= 120; x += 2) {
    const t = (x / 120) * Math.PI * 4 + phase;
    const y = 20 + 8 * Math.sin((t * a) / b) + 8 * Math.sin(t);
    points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}

/* The interval as it sounds: two tones at ratio a:b, summed and flowing.
 * Animates only while on screen, and never under reduced motion. */
const RatioWave = ({ a, b, stroke }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    let visible = false;
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      path.setAttribute('d', wavePath(a, b, ((now - start) / 1000) * 2.2));
      if (visible) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    observer.observe(path);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [a, b]);

  return (
    <path ref={pathRef} d={wavePath(a, b)} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  );
};

/* Three sine waves drifting behind the music heading. Each path covers two
 * periods of the viewBox so a -50% translate loops without a seam. */
const sinePath = (amplitude, periods, mid) => {
  const width = 2400;
  const points = [];
  for (let x = 0; x <= width; x += 8) {
    const y = mid + amplitude * Math.sin((x / width) * Math.PI * 2 * periods);
    points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`);
  }
  return points.join(' ');
};

const SOUND_WAVES = [
  { d: sinePath(26, 6, 80), stroke: '#fb923c', speed: '22s', opacity: 0.35 },
  { d: sinePath(18, 10, 86), stroke: '#ec4899', speed: '15s', opacity: 0.3 },
  { d: sinePath(34, 4, 76), stroke: '#a855f7', speed: '30s', opacity: 0.28 }
];

const SoundWaves = () => (
  <div className="pointer-events-none absolute inset-x-0 top-1 h-12 overflow-hidden sm:h-16 md:top-2 md:h-[5.5rem]" aria-hidden="true">
    {SOUND_WAVES.map((wave) => (
      <svg
        key={wave.stroke}
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        className="wave-drift absolute left-0 top-0 h-full w-[200%]"
        style={{ '--speed': wave.speed, opacity: wave.opacity }}
      >
        <path d={wave.d} fill="none" stroke={wave.stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    ))}
  </div>
);

const Works = () => (
  <section id="works" className="ambient scroll-mt-20 bg-slate-950 py-16 sm:py-20 md:py-24">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle gradient="from-orange-400 via-pink-500 to-purple-600">{WORKS.heading}</SectionTitle>

      <div className="snap-row hide-scrollbar mt-10 grid gap-6 md:grid-cols-3">
        {WORKS.items.map((item) => (
          <article
            key={item.key}
            className="glass group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.35)] sm:p-8"
          >
            <img
              loading="lazy"
              decoding="async"
              src={item.logo}
              alt=""
              width="72"
              height="72"
              className={`h-16 w-16 transition-transform duration-300 group-hover:scale-105 ${
                item.plain
                  ? 'object-contain drop-shadow-[0_8px_22px_rgba(168,85,247,0.35)]'
                  : 'rounded-[22%] bg-slate-900 shadow-lg'
              }`}
            />
            <h3 className="mt-5 text-xl font-bold text-white">{item.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{item.status}</p>
            <p className="mt-4 flex-1 text-base leading-relaxed text-slate-400">{item.body}</p>
            {item.note && <p className="mt-3 text-sm text-slate-500">{item.note}</p>}
            <ul className="mt-5 flex flex-wrap gap-x-6">
              {item.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-orange-400"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Stars = () => (
  <section id="stars" className="relative scroll-mt-20 overflow-hidden bg-slate-950 py-16 sm:py-20 md:py-24">
    <div
      className="twinkle-slow pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          'radial-gradient(1px 1px at 8% 20%,#fff8 50%,transparent),radial-gradient(1.2px 1.2px at 22% 70%,#fff6 50%,transparent),radial-gradient(1px 1px at 41% 35%,#fff7 50%,transparent),radial-gradient(1.4px 1.4px at 57% 82%,#fff8 50%,transparent),radial-gradient(1px 1px at 69% 14%,#fff6 50%,transparent),radial-gradient(1.2px 1.2px at 83% 58%,#fff7 50%,transparent),radial-gradient(1px 1px at 94% 30%,#fff5 50%,transparent)'
      }}
      aria-hidden="true"
    />
    <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-purple-700/20 blur-[90px]" aria-hidden="true" />
    {STARS.background && (
      <SectionBackdrop image={STARS.background} className="inset-x-0 top-0 h-[880px]" opacity="opacity-70" />
    )}

    <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle gradient="from-amber-200 via-pink-300 to-purple-400">{STARS.heading}</SectionTitle>
      <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">{STARS.sub}</p>

      <article className="glass-cool mt-10 grid items-center gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="order-2 lg:order-1">
          <h3 className="bg-gradient-to-r from-amber-200 via-pink-300 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            {STARS.orrery.title}
          </h3>
          <div className="mt-4 space-y-3">
            {STARS.orrery.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            {STARS.orrery.legend.map((item) => (
              <li key={item.mark} className="flex items-center gap-2">
                {item.mark === 'orbit' && <span className="h-3.5 w-3.5 rounded-full border border-white/40" />}
                {item.mark === 'planet' && <span className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />}
                {item.mark === 'step' && <span className="h-2.5 w-2.5 rounded-full bg-[#FF9F0A]" />}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <Orrery />
        </div>
      </article>

      <div className="snap-row hide-scrollbar mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STARS.cards.map((card) => (
          <article
            key={card.key}
            className="group rounded-2xl border border-purple-500/20 bg-gradient-to-b from-indigo-950/60 to-slate-950/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-amber-300/50 hover:shadow-[0_0_30px_-10px_rgba(252,211,77,0.35)]"
          >
            <span
              className="block bg-gradient-to-br from-amber-200 to-pink-400 bg-clip-text text-4xl leading-none text-transparent"
              aria-hidden="true"
            >
              {card.glyph}
            </span>
            <h3 className="mt-4 text-lg font-bold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{card.body}</p>
          </article>
        ))}
      </div>

      {/* The eclipse: Sun and Rahu in the 10th house, drawn as a dark disk with a corona */}
      <article className="glass-rim mt-6 overflow-hidden rounded-3xl bg-slate-950">
        <img
          loading="lazy"
          decoding="async"
          src={STARS.eclipse.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/10" aria-hidden="true" />
        <div className="relative max-w-2xl p-6 sm:p-10 md:py-14">
          <p className="bg-gradient-to-r from-amber-200 to-pink-400 bg-clip-text text-2xl leading-none text-transparent" aria-hidden="true">
            {STARS.eclipse.glyph}
          </p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{STARS.eclipse.title}</h3>
          <div className="mt-4 space-y-3">
            {STARS.eclipse.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <div className="glass-gold mt-6 rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-amber-100 sm:text-xl">{STARS.clients.title}</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STARS.clients.items.map((item) => (
            <li key={item.who}>
              <p className="font-semibold text-white">{item.who}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.why}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const PATH_ACCENTS = ['from-orange-400 to-pink-500', 'from-pink-500 to-purple-500', 'from-purple-400 to-indigo-400', 'from-indigo-400 to-cyan-400'];

const Path = () => (
  <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 md:py-24">
    <SectionBackdrop image="/journey-bg.webp" position="object-center" opacity="opacity-75" fade="both" />
    <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle gradient="from-purple-400 to-indigo-500">{PATH.heading}</SectionTitle>
      <p className="mt-4 text-base text-slate-400 sm:text-lg">{PATH.lead}</p>
      <div className="snap-row hide-scrollbar mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PATH.tiles.map((tile, i) => (
          <article
            key={tile.key}
            className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className={`bg-gradient-to-r ${PATH_ACCENTS[i]} bg-clip-text text-xl font-bold text-transparent`}>
              {tile.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{tile.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-base text-slate-300">{PATH.close}</p>
    </div>
  </section>
);

const NotesTeaser = () => (
  <section className="ambient bg-slate-950 py-16 sm:py-20">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle
        gradient="from-orange-400 to-purple-500"
        aside={
          <a
            href="/notes/"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white transition-colors hover:text-orange-400"
          >
            All notes
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        }
      >
        Notes
      </SectionTitle>
      <p className="mt-4 text-base text-slate-400">How the pieces behind Routine Run actually fit together.</p>
      <div className="snap-row hide-scrollbar mt-8 grid gap-6 md:grid-cols-3">
        {NOTES.slice(0, 3).map((note) => (
          <a
            key={note.slug}
            href={`/notes/#${note.slug}`}
            className="glass group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.35)]"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">{note.date}</p>
            <h3 className="mt-3 flex-1 text-lg font-bold text-white transition-colors group-hover:text-orange-300">
              {note.title}
            </h3>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">{note.body[0]}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white">
              Read
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: CONTACT.reasons[0],
    message: '',
    website: '' // honeypot — real users never see/fill this field
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const updateField = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.name.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) {
      setFeedback({ type: 'error', message: 'Fill in all fields before sending.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          message: formData.message.trim(),
          website: formData.website,
          formGuard: FORM_GUARD_TOKEN
        })
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data?.error || 'Message failed to send. Try again in a bit.');
      }

      setFeedback({ type: 'success', message: "Got it! I'll reply shortly." });
      setFormData({
        name: '',
        email: '',
        projectType: CONTACT.reasons[0],
        message: '',
        website: ''
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[44px]';
  const labelClass = 'text-xs font-bold uppercase tracking-wider text-slate-500';

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-slate-950 py-16 sm:py-20 md:py-28">
      <SectionBackdrop image="/horizon-bg.webp" position="object-bottom" opacity="opacity-90" fade="up" />
      <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="glass-cool rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
              {CONTACT.heading}
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">{CONTACT.sub}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Honeypot — hidden from real users, bots that autofill every field trip it */}
            <div
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
              aria-hidden="true"
            >
              <label htmlFor="website">Leave this field empty</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                value={formData.website}
                onChange={updateField('website')}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={updateField('name')}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField('email')}
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="projectType">
                What is this about
              </label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={updateField('projectType')}
                className={`${fieldClass} text-slate-300`}
              >
                {CONTACT.reasons.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={updateField('message')}
                className={`${fieldClass} resize-y`}
                placeholder="What is it, and who carries it today?"
              />
            </div>

            {feedback && (
              <div
                role="status"
                className={`rounded-xl border px-4 py-3 text-sm ${
                  feedback.type === 'success'
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                    : 'border-red-500/40 bg-red-500/10 text-red-200'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <button
              disabled={submitting || !isValid}
              className="flex min-h-[44px] w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" /> Send
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              Or email{' '}
              <a href={`mailto:${SITE.email}`} className="text-slate-300 hover:text-white">
                {SITE.email}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  useMotion();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-orange-500/30 selection:text-orange-200">
      <Nav />
      <main>
        <Hero />
        <Belief />
        <Music />
        <Now />
        <Roadmap />
        <Works />
        <Stars />
        <Path />
        <NotesTeaser />
        <Contact />
      </main>
      <SiteFooter />

      {/* Floating gradient orbs for ambiance */}
      <div className="pointer-events-none fixed left-0 top-20 -z-10 h-64 w-64 rounded-full bg-purple-900/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 right-0 -z-10 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
    </div>
  );
}
