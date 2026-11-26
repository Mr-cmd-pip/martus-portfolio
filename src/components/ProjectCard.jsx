import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const repos = project.repos ?? [];
  const liveLinks = project.liveLinks ?? [];
  const hasLinks = repos.length > 0 || liveLinks.length > 0;

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-card bg-surface transition-colors duration-150 hover:border-stronger lg:grid-cols-12">
      {/* Screenshot slot (16:10) */}
      {project.screenshot && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-card bg-media lg:col-span-7 lg:aspect-auto lg:min-h-[380px] lg:border-r lg:border-b-0">
          <img
            src={project.screenshot}
            alt={project.screenshotAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Card body */}
      <div className={`flex flex-col p-6 sm:p-8 lg:p-9 ${project.screenshot ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-accent">
            {formattedIndex}
          </span>
          <span className="text-xs font-medium text-muted">
            {project.role}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {project.title}
        </h3>

        {project.roleNote && (
          <p className="mt-1.5 text-xs font-medium text-muted-soft">
            {project.roleNote}
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {project.description}
        </p>

        {/* Stack chips */}
        {project.stack && project.stack.length > 0 && (
          <ul
            role="list"
            aria-label={`${project.title} technologies`}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-chip bg-surface-raised px-2.5 py-1 font-mono text-xs text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Repository & live link(s) */}
        {hasLinks && (
          <div className="mt-auto pt-8">
            <div className="border-t border-line-soft pt-5">
              <div className="flex flex-wrap items-center gap-5">
                {liveLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} ${link.label}`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </a>
                ))}
                {repos.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} ${repo.label} repository on GitHub`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    <span>{repo.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
