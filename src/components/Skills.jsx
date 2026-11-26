import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export default function Skills() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-heading"
      className="border-b border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-xs font-medium text-muted">
              Toolkit
            </p>
            <h2
              id="skills-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl"
            >
              Skills &amp; Practices
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Languages, frameworks, databases, and workflows I use across coursework and personal builds.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-card bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">
                  {group.category}
                </h3>
                <ul
                  role="list"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-chip bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
