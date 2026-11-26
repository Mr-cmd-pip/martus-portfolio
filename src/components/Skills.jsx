import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

export default function Skills() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-heading"
      className="border-b border-[#1A1A1A] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#929292]">
              Toolkit
            </p>
            <h2
              id="skills-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-[#F5F5F5] sm:text-4xl"
            >
              Skills &amp; Practices
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#929292] sm:text-base">
              Languages, frameworks, databases, and workflows I use across coursework and personal builds—currently strengthening React.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-[#1E1E1E] bg-[#111111] p-6">
                <h3 className="font-display text-base font-semibold text-[#F5F5F5]">
                  {group.category}
                </h3>
                <ul
                  role="list"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {group.items.map((item) => {
                    const isStrengthening = item === 'React';
                    return (
                      <li
                        key={item}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                          isStrengthening
                            ? 'border-[#647BFF]/50 bg-[#647BFF]/10 text-[#F5F5F5]'
                            : 'border-[#222222] bg-[#161616] text-[#D4D4D4]'
                        }`}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
