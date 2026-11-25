import { flushSync } from 'react-dom';
import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  );
  const fallbackTransitionTimeout = useRef(null);

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clientX = event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX;
    const clientY = event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY;
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const applyTheme = () => {
      flushSync(() => {
        setTheme(nextTheme);
        root.dataset.theme = nextTheme;
      });

      try {
        window.localStorage.setItem('portfolio-theme', nextTheme);
      } catch (error) {
        console.warn('Unable to save the theme preference.', error);
      }

      const themeColor = document.querySelector('meta[name="theme-color"]');
      themeColor?.setAttribute('content', nextTheme === 'dark' ? '#0A0A0A' : '#F7F8FC');
    };

    root.style.setProperty('--theme-origin-x', `${clientX}px`);
    root.style.setProperty('--theme-origin-y', `${clientY}px`);

    if (hasReducedMotion) {
      applyTheme();
      return;
    }

    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(applyTheme);
      return;
    }

    root.classList.add('theme-color-transition');
    applyTheme();

    window.clearTimeout(fallbackTransitionTimeout.current);
    fallbackTransitionTimeout.current = window.setTimeout(() => {
      root.classList.remove('theme-color-transition');
      fallbackTransitionTimeout.current = null;
    }, 350);
  };

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
