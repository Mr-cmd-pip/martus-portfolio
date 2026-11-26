import { useState } from 'react';
import { Code2, GitBranch, Network, Pause, Play, Sparkles, Workflow } from 'lucide-react';
import {
  SiC,
  SiClaude,
  SiCss,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';
import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';

const skillIcons = {
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: Code2,
  PHP: SiPhp,
  C: SiC,
  'C++': SiCplusplus,
  HTML5: SiHtml5,
  CSS3: SiCss,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  Django: SiDjango,
  'Spring Boot': SiSpringboot,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  Postman: SiPostman,
  'VS Code': Code2,
  'REST APIs': Network,
  Agile: GitBranch,
  Scrum: Workflow,
  Claude: SiClaude,
  Antigravity: Sparkles,
  'GitHub Copilot': SiGithubcopilot,
};

function getSkillDetails(item) {
  const name = typeof item === 'string' ? item : item.name;
  const Icon = (typeof item === 'string' ? null : item.icon) ?? skillIcons[name] ?? Code2;
  return { name, Icon };
}

function SkillChip({ item }) {
  const { name, Icon } = getSkillDetails(item);

  return (
    <li className="mx-2 shrink-0 sm:mx-3">
      <div className="group flex items-center gap-3 rounded-xl border border-card bg-surface py-2 pl-2 pr-4 transition-colors">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-raised text-muted transition-colors group-hover:bg-accent/10 group-hover:text-accent">
          <Icon
            aria-hidden="true"
            focusable="false"
            className="h-6 w-6"
            color="currentColor"
          />
        </span>
        <span className="font-display text-lg font-semibold text-muted transition-colors group-hover:text-accent sm:text-xl">
          {name}
        </span>
      </div>
    </li>
  );
}

export default function Skills() {
  const [isPaused, setIsPaused] = useState(false);
  const skills = siteData.skills.flatMap((group) => group.items);
  const rows = [[], []];
  skills.forEach((item, index) => rows[index % 2].push(item));

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
              My toolkit includes languages, frameworks, databases, and workflows, along with AI-assisted development tools I use.
            </p>
          </div>
        </Reveal>

        <div className="skills-marquee-controls mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? 'Play skills animation' : 'Pause skills animation'}
            aria-pressed={isPaused}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-control bg-surface px-4 text-sm font-medium text-muted transition-colors hover:border-stronger hover:text-ink"
          >
            {isPaused ? (
              <Play aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Pause aria-hidden="true" className="h-4 w-4" />
            )}
            {isPaused ? 'Play' : 'Pause'}
          </button>
        </div>

        <div className={`skills-marquee mt-4 ${isPaused ? 'is-paused' : ''}`}>
          <div className="skills-marquee-row" role="group" aria-label="First skills row" tabIndex={0}>
            <div className="skills-marquee-track">
              <ul role="list" className="flex w-max items-center py-4">
                {rows[0].map((item, index) => (
                  <SkillChip key={`${getSkillDetails(item).name}-${index}`} item={item} />
                ))}
              </ul>
              <ul aria-hidden="true" tabIndex={-1} className="flex w-max items-center py-4">
                {rows[0].map((item, index) => (
                  <SkillChip key={`${getSkillDetails(item).name}-${index}`} item={item} />
                ))}
              </ul>
            </div>
          </div>
          <div className="skills-marquee-row" role="group" aria-label="Second skills row" tabIndex={0}>
            <div className="skills-marquee-track skills-marquee-track-reverse">
              <ul role="list" className="flex w-max items-center py-4">
                {rows[1].map((item, index) => (
                  <SkillChip key={`${getSkillDetails(item).name}-${index}`} item={item} />
                ))}
              </ul>
              <ul aria-hidden="true" tabIndex={-1} className="flex w-max items-center py-4">
                {rows[1].map((item, index) => (
                  <SkillChip key={`${getSkillDetails(item).name}-${index}`} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="skills-marquee-static mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.skills.map((group) => (
            <div key={group.category} className="rounded-2xl border border-card bg-surface p-6">
              <h3 className="font-display text-base font-semibold text-ink">
                {group.category}
              </h3>
              <ul role="list" className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const { name } = getSkillDetails(item);
                  return (
                    <li
                      key={name}
                      className="rounded-md border border-chip bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-soft"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
