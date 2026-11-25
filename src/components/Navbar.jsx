import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { siteData } from '../data/portfolio';

/**
 * Sticky minimal navigation with native CSS scrollspy (`scroll-target-group`)
 * paired with an IntersectionObserver fallback for cross-browser `aria-current`.
 */
export default function Navbar({ theme, onThemeToggle }) {
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

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

    document.addEventListener('keydown', handleKeyDown);
    firstMobileLinkRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleMobileClose = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-[#F5F5F5] transition-colors hover:text-[#647BFF]"
        >
          {siteData.brand.name}
          <span className="text-[#647BFF]" aria-hidden="true">
            .
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="nav-links flex items-center gap-7">
            {siteData.navLinks.map((link) => {
              const isCurrent = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`group relative inline-flex flex-col py-2 text-sm font-medium transition-colors duration-150 ${
                      isCurrent
                        ? 'is-current text-[#F5F5F5]'
                        : 'text-[#929292] hover:text-[#F5F5F5]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={`nav-indicator absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#647BFF] transition-all duration-200 ${
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

        <button
          type="button"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="theme-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#111111] text-[#F5F5F5] transition-colors hover:border-[#647BFF]/60"
        >
          <Sun className="theme-icon theme-icon-sun h-5 w-5" aria-hidden="true" />
          <Moon className="theme-icon theme-icon-moon h-5 w-5" aria-hidden="true" />
        </button>

        {/* Mobile menu toggle (min 44x44 target) */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#1F1F1F] bg-[#111111] text-[#F5F5F5] transition-colors hover:border-[#647BFF]/60 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="border-t border-[#1A1A1A] bg-[#0A0A0A] px-6 py-4 md:hidden"
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
                        ? 'bg-[#141414] text-[#F5F5F5]'
                        : 'text-[#929292] hover:bg-[#121212] hover:text-[#F5F5F5]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#647BFF]"
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
