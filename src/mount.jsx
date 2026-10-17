import React from 'react';
import ReactDOM from 'react-dom/client';

/* The build prerenders every page into its HTML, so the text is there for
 * crawlers and for the first paint. When it is, React hydrates it; in dev the
 * root is empty and React renders from scratch. */
export function mount(element) {
  const root = document.getElementById('root');
  const tree = <React.StrictMode>{element}</React.StrictMode>;
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, tree);
  else ReactDOM.createRoot(root).render(tree);
}
