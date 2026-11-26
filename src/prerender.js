import { createElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';

export function prerender() {
  const app = createElement(
    StrictMode,
    null,
    createElement(MotionConfig, { reducedMotion: 'user' }, createElement(App))
  );

  return { html: renderToString(app) };
}
