import React from 'react';
import { SiteFooter, SiteHeader, useMotion } from './site.jsx';
import { NOTES } from './content.js';

export default function NotesPage() {
  useMotion();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-orange-500/30 selection:text-orange-200">
      <SiteHeader />

      <main className="ambient relative overflow-hidden px-4 pb-8 pt-14 sm:px-6">
        <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[40vw] w-[40vw] rounded-full bg-indigo-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Notes
            </span>
          </h1>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            How the pieces behind Routine Run actually fit together.
          </p>

          {NOTES.map((note) => (
            <article
              key={note.slug}
              id={note.slug}
              className="glass mt-10 scroll-mt-20 rounded-3xl p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-widest text-slate-500">{note.date}</p>
              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">{note.title}</h2>
              {note.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-4 text-base leading-relaxed text-slate-400"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
