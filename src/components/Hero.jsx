import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { HeroReveal } from './MotionPrimitives';

export default function Hero() {
  const { hero } = siteData;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative border-b border-line pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <HeroReveal delay={0}>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-control bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{hero.availability}</span>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.05}>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.85rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink"
          >
            {hero.heading.replace(/\.$/, '')}
            <span className="text-accent">.</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            {hero.subtitle}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-colors duration-150 hover:bg-accent active:scale-[0.98]"
            >
              <span>{hero.primaryCta.label}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-strong bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:border-stronger hover:text-ink active:scale-[0.98]"
            >
              <span>{hero.secondaryCta.label}</span>
            </a>

            {hero.resumeUrl && (
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </HeroReveal>

        {hero.highlights?.length > 0 && (
          <HeroReveal delay={0.2}>
            <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8 sm:mt-20">
              {hero.highlights.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs font-medium text-muted">{label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </HeroReveal>
        )}
      </div>
    </section>
  );
}
