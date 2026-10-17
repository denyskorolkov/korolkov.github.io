import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import NotesPage from './NotesPage.jsx';

/* Used only at build time by scripts/prerender.mjs. */
export function render(page) {
  return renderToString(page === 'notes' ? <NotesPage /> : <App />);
}
