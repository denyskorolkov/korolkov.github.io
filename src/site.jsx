import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Terminal, Twitter } from 'lucide-react';
import { SITE } from './content.js';

/* Pieces shared by the home page and /notes, plus the two parallax hooks
 * the hero uses. */

export const useParallax = (sensitivity = 0.1) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * sensitivity);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sensitivity]);

  return offset;
};

export const useMouseParallax = (sensitivity = 0.02) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      setPosition({
        x: (e.clientX - window.innerWidth / 2) * sensitivity,
        y: (e.clientY - window.innerHeight / 2) * sensitivity
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [sensitivity]);

  return position;
};

const GLASS = '.glass, .glass-warm, .glass-cool, .glass-gold, .glass-rim';
const BEAT_MS = 110;

/* Cards enter one beat apart as they scroll into view, and the light on the
 * glass follows the pointer. Does nothing under prefers-reduced-motion. */
export const useMotion = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // Cards already on screen at load stay put; only the ones below the fold
    // wait for their beat. With prerendered HTML this avoids a flash.
    const cards = [...document.querySelectorAll(GLASS)].filter(
      (card) => card.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    cards.forEach((card) => {
      const siblings = [...card.parentElement.children].filter((el) => el.matches(GLASS));
      const beat = Math.min(siblings.indexOf(card), 5) * BEAT_MS;
      card.style.setProperty('--beat', `${beat}ms`);
      card.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          card.classList.add('is-visible');
          observer.unobserve(card);
          window.setTimeout(() => card.classList.add('reveal-done'), 1000 + BEAT_MS * 6);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));

    const onMove = (e) => {
      const card = e.target.closest?.(GLASS);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);
};

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white sm:text-2xl">
          <Terminal className="h-5 w-5 text-orange-400 sm:h-6 sm:w-6" aria-hidden="true" />
          <span>
            DENYS<span className="text-slate-500">.DEV</span>
          </span>
        </a>
        <a
          href="/"
          className="flex min-h-[44px] items-center text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          Back to home
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const social = [
    { href: SITE.links.github, label: 'GitHub', Icon: Github },
    { href: SITE.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: SITE.links.x, label: 'X', Icon: Twitter },
    { href: `mailto:${SITE.email}`, label: 'Email', Icon: Mail }
  ];

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 sm:py-12">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="mb-1 text-lg font-bold text-white sm:text-xl">{SITE.name}</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            {SITE.place} · © {new Date().getFullYear()}
          </p>
        </div>

        <ul className="flex items-center gap-2 sm:gap-4">
          {social.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                aria-label={label}
                className="flex min-h-[44px] min-w-[44px] transform items-center justify-center text-slate-400 transition-colors hover:scale-110 hover:text-white"
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
