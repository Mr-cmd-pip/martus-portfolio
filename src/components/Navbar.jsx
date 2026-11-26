import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteData } from '../data/portfolio';

/** Sticky navigation with IntersectionObserver-based scrollspy. */
export default function Navbar() {
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef(null);
  const firstMobileLinkRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const sectionIds = siteData.navLinks.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (
        mobileNavRef.current?.contains(event.target) ||
        toggleBtnRef.current?.contains(event.target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    firstMobileLinkRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  const handleMobileClose = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {siteData.brand.name}
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {siteData.navLinks.map((link) => {
              const isCurrent = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`group relative inline-flex flex-col py-2 text-sm font-medium transition-colors duration-150 ${
                      isCurrent
                        ? 'is-current text-ink'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={`nav-indicator absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent transition-[transform,opacity] duration-200 ${
                        isCurrent
                          ? 'scale-x-100 opacity-100'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu toggle (min 44x44 target) */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-control bg-surface text-ink transition-colors hover:border-accent/60 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          aria-label="Mobile"
          className="border-t border-line bg-canvas px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteData.navLinks.map((link, index) => {
              const isCurrent = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={link.href}
                    onClick={handleMobileClose}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                      isCurrent
                        ? 'bg-surface-active text-ink'
                        : 'text-muted hover:bg-surface-soft hover:text-ink'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
