import { ArrowUpRight, Award } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export default function Certifications() {
  return (
    <section
      id="certifications"
      tabIndex={-1}
      aria-labelledby="certifications-heading"
      className="border-b border-[#1A1A1A] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-xs font-medium text-[#929292]">
                Learning
              </p>
              <h2
                id="certifications-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-[#F5F5F5] sm:text-4xl"
              >
                Certifications
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#929292]">
                Completed foundational certifications across C programming, cloud architecture, artificial intelligence, and cybersecurity.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <ul
                role="list"
                className="divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]"
              >
                {siteData.certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1F1F1F] bg-[#121212] text-[#929292]">
                        <Award className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-medium text-[#F5F5F5] sm:text-lg">
                          {cert.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-[#929292]">
                          {cert.issuer}
                          {cert.issuedDate ? ` · ${cert.issuedDate}` : ''}
                        </p>
                      </div>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-1.5 self-start text-sm font-medium text-[#929292] transition-colors hover:text-[#647BFF] sm:self-center"
                      >
                        <span>Verify</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
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
