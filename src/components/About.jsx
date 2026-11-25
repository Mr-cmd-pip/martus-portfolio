import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export default function About() {
  const { about } = siteData;

  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      className="border-b border-[#1A1A1A] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#647BFF]">
                {about.eyebrow}
              </p>
              <h2
                id="about-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-[#F5F5F5] sm:text-4xl"
              >
                {about.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-base leading-relaxed text-[#929292] sm:text-[1.0625rem]">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]">
                {about.focusItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1.5 py-4 sm:grid-cols-3 sm:gap-6"
                  >
                    <dt className="text-sm font-medium text-[#929292]">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium text-[#F5F5F5] sm:col-span-2">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
