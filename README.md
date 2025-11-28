# korolkov-github-io

Modern React + Vite setup that renders the interactive portfolio previously embedded in `index.js`.

## Prerequisites
- Node.js 18+
- npm 9+

## Scripts
- `npm install` - install dependencies
- `npm run dev` - start Vite dev server (default `http://127.0.0.1:5173`)
- `npm run build` - create production build in `dist/`
- `npm run preview` - serve the production build locally

## Project Structure
- `index.html` – Vite entry attaching the React app to `#root`
- `src/main.jsx` – React bootstrap
- `src/App.jsx` – full application moved from `index.js`
- `src/index.css` – Tailwind entrypoint + base styles

Tailwind scans `index.html` and everything inside `src/` as configured in `tailwind.config.js`.
