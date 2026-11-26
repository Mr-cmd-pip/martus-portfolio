import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export default function Contact() {
  const { contact } = siteData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable; mailto link remains directly usable
    }
  };

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium text-[#929292]">
                {contact.eyebrow}
              </p>
              <h2
                id="contact-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-[#F5F5F5] sm:text-5xl"
              >
                {contact.heading}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#929292] sm:text-lg">
                {contact.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-[#F5F5F5] px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#647BFF] hover:text-[#0A0A0A] active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{contact.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#262626] bg-[#111111] px-4 py-3 text-sm font-medium text-[#F5F5F5] transition-colors hover:border-[#333333]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#647BFF]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#929292]" aria-hidden="true" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pre-rendered live region for screen reader copy confirmation */}
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? `Copied ${contact.email} to clipboard.` : ''}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.08}>
              <h3 className="text-xs font-medium text-[#929292]">
                Elsewhere
              </h3>
              <ul
                role="list"
                className="mt-4 divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]"
              >
                {contact.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-14 items-center justify-between py-3 transition-colors"
                    >
                      <div>
                        <span className="block text-sm font-medium text-[#F5F5F5] transition-colors group-hover:text-[#647BFF]">
                          {social.name}
                        </span>
                        <span className="block font-mono text-xs text-[#929292]">
                          {social.handle}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-[#929292]"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
