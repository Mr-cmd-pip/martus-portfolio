import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const repos = project.repos ?? [];
  const liveLinks = project.liveLinks ?? [];
  const hasLinks = repos.length > 0 || liveLinks.length > 0;

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#111111] transition-all duration-200 hover:border-[#647BFF]/45 hover:shadow-[0_24px_56px_-30px_rgba(100,123,255,0.38)] lg:grid-cols-12">
      {/* Screenshot slot (16:10) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#1E1E1E] bg-[#0D0D0D] lg:col-span-7 lg:aspect-auto lg:min-h-[380px] lg:border-r lg:border-b-0">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.screenshotAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="slot-grid flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#242424] bg-[#141414] text-[#929292] transition-colors group-hover:border-[#647BFF]/40 group-hover:text-[#647BFF]">
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs font-medium text-[#929292]">
              Screenshot placeholder
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#929292]/75">
              TODO: {project.screenshotSlotHint}
            </p>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-9">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-[#647BFF]">
            {formattedIndex}
          </span>
          <span className="text-xs font-medium text-[#929292]">
            {project.role}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[#F5F5F5] sm:text-3xl">
          {project.title}
        </h3>

        {project.roleNote && (
          <p className="mt-1.5 text-xs font-medium text-[#929292]/90">
            {project.roleNote}
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-[#929292] sm:text-[0.9375rem]">
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
                className="rounded-md border border-[#222222] bg-[#161616] px-2.5 py-1 font-mono text-xs text-[#D4D4D4]"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Repository & live link(s) */}
        <div className="mt-auto pt-8">
          <div className="border-t border-[#1B1B1B] pt-5">
            {hasLinks ? (
              <div className="flex flex-wrap items-center gap-5">
                {liveLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} ${link.label}`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-[#F5F5F5] transition-colors hover:text-[#647BFF]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#647BFF]" aria-hidden="true" />
                  </a>
                ))}
                {repos.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} ${repo.label} repository on GitHub`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-[#F5F5F5] transition-colors hover:text-[#647BFF]"
                  >
                    <span>{repo.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#647BFF]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-[#929292]/80">
                TODO: Add repository or live link in src/data/portfolio.js
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
