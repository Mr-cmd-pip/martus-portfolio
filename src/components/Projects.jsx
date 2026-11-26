import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '../data/portfolio';
import { Reveal } from './MotionPrimitives';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const projects = siteData.projects;
  const total = projects.length;

  const trackRef = useRef(null);
  const currentIndexRef = useRef(0);
  const settledIndexRef = useRef(0);
  const pendingTargetRef = useRef(null);
  const pendingScrollLeftRef = useRef(null);
  const queuedStepRef = useRef(0);
  const rafIdRef = useRef(null);
  const settleTimerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  const getScrollBehavior = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return 'auto';
    }
    return 'smooth';
  }, []);

  const getSlidesInVisualOrder = useCallback((track) => {
    return Array.from(track.children).sort((a, b) => a.offsetLeft - b.offsetLeft);
  }, []);

  const getNearestDomIndex = useCallback((track) => {
    const slides = Array.from(track.children);
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearestIdx = 0;
    let minDistance = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = idx;
      }
    });

    return nearestIdx;
  }, []);

  /**
   * Updates `--current` (or resets to `initial` for marker jumps) while keeping
   * the currently visible slide anchored via an instant compensating scroll.
   */
  const applyParking = useCallback((nextCurrentValue, { lockOverflow = true } = {}) => {
    const track = trackRef.current;
    if (!track || total < 3) return;

    const anchorDomIndex = currentIndexRef.current;
    const anchorSlide = track.children[anchorDomIndex];
    if (!anchorSlide) return;

    const prevOffset = anchorSlide.offsetLeft;
    const prevSnap = track.style.scrollSnapType;
    const prevBehavior = track.style.scrollBehavior;

    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    if (lockOverflow) {
      track.style.overflowX = 'hidden';
    }

    if (nextCurrentValue === null) {
      track.style.setProperty('--current', 'initial');
    } else {
      track.style.setProperty('--current', String(nextCurrentValue));
    }

    const delta = anchorSlide.offsetLeft - prevOffset;
    if (delta !== 0) {
      track.scrollLeft += delta;
    }

    track.style.scrollSnapType = prevSnap;
    track.style.scrollBehavior = prevBehavior;

    if (lockOverflow) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.overflowX = '';
          }
        });
      });
    }
  }, [total]);

  const scrollToSlide = useCallback(
    (domIndex, { isMarkerJump = false } = {}) => {
      const track = trackRef.current;
      if (!track) return;

      const targetSlide = track.children[domIndex];
      if (!targetSlide) return;

      if (isMarkerJump && domIndex !== currentIndexRef.current && total >= 3) {
        // Restore DOM order for the marker trip without locking overflow (Safari requirement)
        applyParking(null, { lockOverflow: false });
      }

      pendingTargetRef.current = domIndex;
      pendingScrollLeftRef.current = track.scrollLeft;
      currentIndexRef.current = domIndex;
      setActiveIndex(domIndex);

      const targetLeft =
        targetSlide.offsetLeft - (track.clientWidth - targetSlide.offsetWidth) / 2;

      track.scrollTo({
        left: targetLeft,
        behavior: getScrollBehavior(),
      });
    },
    [applyParking, getScrollBehavior, total]
  );

  const stepBy = useCallback(
    (direction) => {
      const track = trackRef.current;
      if (!track) return;

      // If slides are temporarily in DOM order for a marker trip, queue one step for settle
      if (track.style.getPropertyValue('--current') === 'initial') {
        queuedStepRef.current = direction;
        return;
      }

      const baseDomIndex =
        pendingTargetRef.current !== null
          ? pendingTargetRef.current
          : getNearestDomIndex(track);

      const baseSlide = track.children[baseDomIndex];
      const visualSlides = getSlidesInVisualOrder(track);
      const visualIdx = visualSlides.indexOf(baseSlide);

      const nextVisualSlide = visualSlides[visualIdx + direction];
      if (!nextVisualSlide) return;

      const nextDomIndex = Array.from(track.children).indexOf(nextVisualSlide);
      if (nextDomIndex === -1) return;

      pendingTargetRef.current = nextDomIndex;
      pendingScrollLeftRef.current = track.scrollLeft;
      currentIndexRef.current = nextDomIndex;
      setActiveIndex(nextDomIndex);

      const targetLeft =
        nextVisualSlide.offsetLeft -
        (track.clientWidth - nextVisualSlide.offsetWidth) / 2;

      track.scrollTo({
        left: targetLeft,
        behavior: getScrollBehavior(),
      });
    },
    [getNearestDomIndex, getScrollBehavior, getSlidesInVisualOrder]
  );

  const handleSettle = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    // Ignore stale settle events at the exact scroll position where a new scroll was requested
    if (
      pendingScrollLeftRef.current !== null &&
      Math.abs(track.scrollLeft - pendingScrollLeftRef.current) < 1 &&
      pendingTargetRef.current !== null
    ) {
      return;
    }

    const settledIdx = getNearestDomIndex(track);

    // Ignore an early settle if a newer pending scroll is still aiming elsewhere
    if (
      pendingTargetRef.current !== null &&
      pendingTargetRef.current !== settledIdx
    ) {
      return;
    }

    pendingTargetRef.current = null;
    pendingScrollLeftRef.current = null;
    currentIndexRef.current = settledIdx;
    setActiveIndex(settledIdx);

    if (total >= 3) {
      const currentProp = track.style.getPropertyValue('--current');
      if (currentProp !== String(settledIdx)) {
        const hadQueuedStep = queuedStepRef.current !== 0;
        applyParking(settledIdx, { lockOverflow: !hadQueuedStep });
      }
    }

    if (settledIdx !== settledIndexRef.current) {
      settledIndexRef.current = settledIdx;
      const project = projects[settledIdx];
      setStatusMessage(`Slide ${settledIdx + 1} of ${total}: ${project.title}`);
    }

    if (queuedStepRef.current !== 0) {
      const queued = queuedStepRef.current;
      queuedStepRef.current = 0;
      stepBy(queued);
    }
  }, [applyParking, getNearestDomIndex, projects, stepBy, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!CSS.supports('order: sibling-count()')) {
      track.style.setProperty('--children-count', String(track.children.length));
    }

    if (total >= 3) {
      applyParking(0, { lockOverflow: true });
    }

    const supportsScrollEnd = 'onscrollend' in window;

    const onScroll = () => {
      if (pendingTargetRef.current === null) {
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            if (!trackRef.current || pendingTargetRef.current !== null) return;
            const nearest = getNearestDomIndex(trackRef.current);
            if (nearest !== currentIndexRef.current) {
              currentIndexRef.current = nearest;
              setActiveIndex(nearest);
            }
          });
        }
      }

      if (!supportsScrollEnd) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = window.setTimeout(handleSettle, 120);
      }
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    if (supportsScrollEnd) {
      track.addEventListener('scrollend', handleSettle);
    }

    return () => {
      track.removeEventListener('scroll', onScroll);
      if (supportsScrollEnd) {
        track.removeEventListener('scrollend', handleSettle);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.clearTimeout(settleTimerRef.current);
    };
  }, [applyParking, getNearestDomIndex, handleSettle, total]);

  const formattedCurrent = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="border-b border-[#1A1A1A] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#929292]">
                Selected work
              </p>
              <h2
                id="projects-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-[#F5F5F5] sm:text-4xl"
              >
                Projects
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#929292]">
              Academic systems, personal web apps, and Discord bots built across coursework and self-directed practice.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            className="mt-12"
          >
            {/* Controls & slide counter placed before track in DOM order */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-[#929292]" aria-hidden="true">
                <span className="text-[#F5F5F5]">{formattedCurrent}</span>
                <span className="mx-1.5 text-[#929292]/50">/</span>
                <span>{formattedTotal}</span>
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => stepBy(-1)}
                  aria-label="Previous project"
                  className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg border border-[#242424] bg-[#111111] text-[#F5F5F5] transition-colors hover:border-[#647BFF]/70 hover:text-[#647BFF] active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => stepBy(1)}
                  aria-label="Next project"
                  className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg border border-[#242424] bg-[#111111] text-[#F5F5F5] transition-colors hover:border-[#647BFF]/70 hover:text-[#647BFF] active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Horizontally scrollable 1-card-per-view track */}
            <div
              ref={trackRef}
              tabIndex={0}
              role="group"
              aria-label="Project slides"
              className="carousel-track rounded-2xl"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                  className="w-full"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>

            {/* Visually hidden polite status region for settled slide changes */}
            <p className="sr-only" role="status" aria-live="polite">
              {statusMessage}
            </p>

            {/* Marker navigation */}
            <nav
              aria-label="Choose a project slide"
              className="mt-6 flex flex-wrap items-center justify-center gap-1"
            >
              {projects.map((project, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => scrollToSlide(index, { isMarkerJump: true })}
                    aria-label={`Go to slide ${index + 1}: ${project.title}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex min-h-8 min-w-8 touch-manipulation cursor-pointer items-center justify-center rounded-full p-1"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-2 w-7 rounded-full transition-[transform,background-color] duration-150 ${
                        isActive
                          ? 'scale-x-100 bg-[#647BFF] ring-1 ring-[#647BFF]/50 ring-offset-2 ring-offset-[#0A0A0A]'
                          : 'scale-x-[0.2857] bg-[#333333] group-hover:bg-[#929292]'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
