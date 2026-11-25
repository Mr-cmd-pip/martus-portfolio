import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { HeroReveal } from './MotionPrimitives';

export default function Hero() {
  const { hero } = siteData;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative border-b border-[#1A1A1A] pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <HeroReveal delay={0}>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#1F1F1F] bg-[#111111] px-3.5 py-1.5 text-xs font-medium text-[#929292]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#647BFF]" />
            </span>
            <span>{hero.availability}</span>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.05}>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.85rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-[#F5F5F5]"
          >
            {hero.heading.replace(/\.$/, '')}
            <span className="text-[#647BFF]">.</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#929292] sm:text-xl sm:leading-relaxed">
            {hero.subtitle}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#F5F5F5] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#647BFF] hover:text-[#0A0A0A] active:translate-y-0"
            >
              <span>{hero.primaryCta.label}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#262626] bg-[#111111] px-6 py-3 text-sm font-medium text-[#F5F5F5] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#647BFF]/70 hover:text-[#F5F5F5] active:translate-y-0"
            >
              <span>{hero.secondaryCta.label}</span>
            </a>

            {hero.resumeUrl && (
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#929292] transition-colors hover:text-[#647BFF]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </HeroReveal>

        <HeroReveal delay={0.2}>
          <figure className="mt-16 border-t border-[#1A1A1A] pt-8 sm:mt-20">
            <blockquote className="max-w-2xl text-sm italic leading-relaxed text-[#929292] sm:text-base">
              &ldquo;{hero.tagline}&rdquo;
            </blockquote>
            <figcaption className="mt-2 font-mono text-xs text-[#929292]/80">
              — {siteData.brand.fullName} ({hero.taglineSource})
            </figcaption>
          </figure>
        </HeroReveal>
      </div>
    </section>
  );
}
