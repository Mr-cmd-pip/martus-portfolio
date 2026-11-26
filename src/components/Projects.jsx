import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const projects = siteData.projects;

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="border-b border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Selected work</p>
              <h2
                id="projects-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl"
              >
                Projects
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-muted">
              Academic systems, personal web apps, and Discord bots built across coursework and self-directed practice.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
