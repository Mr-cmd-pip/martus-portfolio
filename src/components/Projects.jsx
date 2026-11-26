import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';
import ProjectCard from './ProjectCard';

const SPRING = { type: 'spring', stiffness: 260, damping: 28 };
const useEnhancedLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function useCarousel(total) {
  const [index, setIndex] = useState(0);

  const goTo = (nextIndex) => {
    if (!total) return;
    setIndex(((nextIndex % total) + total) % total);
  };

  return {
    index,
    next: () => setIndex((current) => (current + 1) % total),
    prev: () => setIndex((current) => (current - 1 + total) % total),
    goTo,
  };
}

function getCircularOffset(index, activeIndex, total) {
  const offset = (index - activeIndex + total) % total;
  return offset > total / 2 ? offset - total : offset;
}

function StackCard({
  project,
  index,
  activeIndex,
  total,
  layout,
  prefersReducedMotion,
  draggedRef,
  onActivate,
  onOpenDetails,
  onSwipe,
}) {
  const offset = getCircularOffset(index, activeIndex, total);
  const distance = Math.abs(offset);
  const isActive = index === activeIndex;
  const isVisible = distance <= layout.visibleOffset;
  const cappedOffset = Math.max(-2, Math.min(2, offset));
  const animate = prefersReducedMotion
    ? {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: isActive ? 1 : 0,
        filter: 'brightness(1)',
      }
    : {
        x: offset * layout.offsetX,
        y: distance * 10,
        rotate: cappedOffset * 3,
        scale: 1 - distance * 0.07,
        opacity: isVisible ? 1 - distance * 0.18 : 0,
        filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
      };

  const handleDragEnd = (_, info) => {
    draggedRef.current = true;
        if (info.offset.x < -80 || info.velocity.x < -500) onSwipe(1);
        else if (info.offset.x > 80 || info.velocity.x > 500) onSwipe(-1);
  };

  return (
    <motion.article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!isActive}
      onPointerDownCapture={() => {
        draggedRef.current = false;
      }}
      onClickCapture={(event) => {
        if (!draggedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        draggedRef.current = false;
      }}
      onClick={() => {
        if (!isActive && isVisible && !draggedRef.current) onActivate(index);
      }}
      drag={isActive && !prefersReducedMotion ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => {
        draggedRef.current = true;
      }}
      onDragEnd={handleDragEnd}
      animate={animate}
      transition={prefersReducedMotion ? { duration: 0.16, ease: 'easeOut' } : SPRING}
      style={{
        zIndex: 100 - distance,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      className="absolute inset-0"
    >
      <div className="grid h-full overflow-hidden rounded-2xl border border-card bg-surface shadow-2xl lg:grid-cols-[7fr_5fr]">
        <ProjectCover project={project} />

        <div className="flex min-h-0 flex-col p-5 sm:p-6 lg:p-7">
          <span className="w-fit max-w-full truncate rounded-full border border-chip bg-surface-raised px-3 py-1 text-xs font-medium text-muted">
            {project.role}
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            {project.description}
          </p>

          {project.stack?.length > 0 && (
            <ul
              role="list"
              aria-label={`${project.title} technologies`}
              className="mt-5 flex flex-wrap gap-2"
            >
              {project.stack.slice(0, 3).map((technology) => (
                <li
                  key={technology}
                  className="rounded-md border border-chip bg-surface-raised px-2.5 py-1 font-mono text-xs text-ink-soft"
                >
                  {technology}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-5">
            {isActive ? (
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => onOpenDetails(project, index, event.currentTarget)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-control bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-stronger hover:text-accent"
              >
                View details
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : (
              <span aria-hidden="true" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
                View details
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCover({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = project.screenshot && !imageFailed;

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden border-b border-card bg-media lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r ${
        hasImage ? '' : 'bg-gradient-to-br from-surface-raised via-surface to-accent/20'
      }`}
      role={hasImage ? undefined : 'img'}
      aria-label={hasImage ? undefined : `${project.title} project cover`}
    >
      {hasImage ? (
        <img
          src={project.screenshot}
          alt={project.screenshotAlt}
          loading="lazy"
          draggable="false"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-6 sm:p-8">
          <span className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectDetailsDialog({ selectedProject, onClose, dialogRef, closeButtonRef }) {
  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby="project-details-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;

        const focusable = [
          ...event.currentTarget.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ),
        ].filter((element) => !element.hasAttribute('aria-hidden'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first) {
          event.preventDefault();
          event.currentTarget.focus();
        } else if (!event.currentTarget.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-card bg-canvas p-0 text-ink shadow-2xl backdrop:bg-black/75"
    >
      {selectedProject && (
        <>
          <div className="sticky top-0 z-10 flex justify-end border-b border-line bg-canvas/95 p-3 backdrop-blur">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-control bg-surface text-muted transition-colors hover:border-stronger hover:text-ink"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <ProjectCard
              project={selectedProject.project}
              index={selectedProject.index}
              headingId="project-details-title"
            />
          </div>
        </>
      )}
    </dialog>
  );
}

export default function Projects() {
  const projects = siteData.projects;
  const { index, next, prev, goTo } = useCarousel(projects.length);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [stackLayout, setStackLayout] = useState({ visibleOffset: 1, offsetX: 20 });
  const [selectedProject, setSelectedProject] = useState(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const carouselRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const draggedRef = useRef(false);

  useEnhancedLayoutEffect(() => {
    setIsEnhanced(true);

    const updateLayout = () => {
      if (window.innerWidth >= 1024) {
        setStackLayout({ visibleOffset: 2, offsetX: 56 });
      } else if (window.innerWidth >= 640) {
        setStackLayout({ visibleOffset: 1, offsetX: 44 });
      } else {
        setStackLayout({ visibleOffset: 1, offsetX: 20 });
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    if (!selectedProject || !dialogRef.current) return undefined;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  const closeDetails = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    setSelectedProject(null);
    window.requestAnimationFrame(() => {
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
    });
  };

  const openDetails = (project, projectIndex, trigger) => {
    returnFocusRef.current = trigger ?? carouselRef.current;
    setSelectedProject({ project, index: projectIndex });
  };

  const handleCarouselKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(projects.length - 1);
    } else if (event.key === 'Enter' && event.target === event.currentTarget) {
      event.preventDefault();
      openDetails(projects[index], index, carouselRef.current);
    }

    if (event.target !== event.currentTarget && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.currentTarget.focus();
    }
  };

  const activeProject = projects[index];

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className={`border-b border-line py-24 sm:py-32 ${isEnhanced ? 'projects-carousel-ready' : ''}`}
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

        <div className="projects-carousel-enhanced mt-12">
          <div
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <div className="projects-carousel-stage relative h-[36rem] overflow-hidden sm:h-[40rem] lg:h-[33rem]">
              <div className="relative mx-auto h-full w-full max-w-[720px] sm:max-w-[560px] lg:max-w-[720px]">
                {projects.map((project, projectIndex) => (
                  <StackCard
                    key={project.id}
                    project={project}
                    index={projectIndex}
                    activeIndex={index}
                    total={projects.length}
                    layout={stackLayout}
                    prefersReducedMotion={prefersReducedMotion}
                    draggedRef={draggedRef}
                    onActivate={goTo}
                    onOpenDetails={openDetails}
                    onSwipe={(direction) => (direction > 0 ? next() : prev())}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-control bg-surface text-muted transition-colors hover:border-stronger hover:text-ink"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-control bg-surface text-muted transition-colors hover:border-stronger hover:text-ink"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
              <span className="ml-1 font-mono text-sm text-muted">
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2" aria-label="Choose a project">
              {projects.map((project, projectIndex) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(projectIndex)}
                  aria-label={`Go to project ${projectIndex + 1}: ${project.title}`}
                  aria-current={projectIndex === index ? 'true' : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    className={`block h-3 rounded-full transition-[width,background-color] ${
                      projectIndex === index ? 'w-6 bg-accent' : 'w-3 bg-stronger hover:bg-muted'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Project {index + 1} of {projects.length}: {activeProject.title}
          </p>
        </div>

        <div className="projects-list-fallback mt-12 flex flex-col gap-6">
          {projects.map((project, projectIndex) => (
            <Reveal key={project.id} delay={projectIndex * 0.05}>
              <ProjectCard project={project} index={projectIndex} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectDetailsDialog
        selectedProject={selectedProject}
        onClose={closeDetails}
        dialogRef={dialogRef}
        closeButtonRef={closeButtonRef}
      />
    </section>
  );
}
