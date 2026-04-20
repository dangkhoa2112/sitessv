'use client';

import type { StaticImageData } from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type HeroBannerSlide = {
  image: string | StaticImageData;
  href: string;
  ariaLabel: string;
  target?: '_blank' | '_self';
  rel?: string;
};

type HeroBannerSliderProps = {
  slides: HeroBannerSlide[];
  className?: string;
  autoPlayMs?: number;
  /** Ví dụ: "Banner chính" / "Hero banners" */
  regionLabel?: string;
  dotsLabel?: string;
  prevSlideLabel?: string;
  nextSlideLabel?: string;
};

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function resolveImageSrc(image: string | StaticImageData) {
  return typeof image === 'string' ? image : image.src;
}

export function HeroBannerSlider({
  slides,
  className = '',
  autoPlayMs = 6500,
  regionLabel = 'Hero banner',
  dotsLabel = 'Slides',
  prevSlideLabel = 'Previous slide',
  nextSlideLabel = 'Next slide'
}: HeroBannerSliderProps) {
  const reducedMotion = useReducedMotion();
  const id = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  const count = slides.length;
  const hasMultipleSlides = count > 1;
  const safeIndex = ((index % count) + count) % count;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (count <= 1) return;
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const goNext = useCallback(() => goTo(safeIndex + 1, 1), [goTo, safeIndex]);
  const goPrev = useCallback(() => goTo(safeIndex - 1, -1), [goTo, safeIndex]);

  useEffect(() => {
    if (count <= 1) return;

    const idTimer = window.setInterval(() => {
      if (!pausedRef.current) {
        setDirection(1);
        setIndex((i) => (i + 1) % count);
      }
    }, autoPlayMs);

    return () => window.clearInterval(idTimer);
  }, [count, autoPlayMs]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 3200);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    pointerStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) < 56) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  const variants = reducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: (dir: number) => ({
          x: dir >= 0 ? '6%' : '-6%',
          opacity: 0,
          scale: 1.045
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1
        },
        exit: (dir: number) => ({
          x: dir < 0 ? '5%' : '-5%',
          opacity: 0,
          scale: 0.985
        })
      };

  const transition = reducedMotion
    ? { duration: 0.2 }
    : { duration: 0.72, ease: easeOutExpo };

  const kenBurnsTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 12, ease: 'linear' as const };

  if (count === 0) return null;

  const current = slides[safeIndex]!;
  const currentImage = resolveImageSrc(current.image);
  const interactiveProps = hasMultipleSlides
    ? {
        onMouseEnter: pause,
        onMouseLeave: scheduleResume,
        onFocusCapture: pause,
        onBlurCapture: scheduleResume,
        onPointerDown,
        onPointerUp
      }
    : {};

  return (
    <div
      className={`group/slider relative z-[2] mx-auto h-[250px] w-full max-w-[1920px] md:h-[360px] lg:h-[520px] ${className}`}
      {...interactiveProps}
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.a
            id={`${id}-slide`}
            key={currentImage + safeIndex}
            href={current.href}
            target={current.target ?? '_blank'}
            rel={current.rel ?? (current.target === '_self' ? undefined : 'noreferrer')}
            aria-label={current.ariaLabel}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 block overflow-hidden outline-none ring-[#6aa9c6]/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030819]"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
              style={{ backgroundImage: `url('${currentImage}')` }}
              initial={reducedMotion ? { scale: 1 } : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={reducedMotion ? { duration: 0 } : kenBurnsTransition}
            />
            {/* Gradient nhẹ — trước đây 0.7 bên trái làm góc tối sầm; hero text nằm trên card glass nên chỉ cần veil mỏng */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,48,0.22)_0%,rgba(8,18,48,0.08)_42%,rgba(8,18,48,0.03)_72%,transparent_100%)]" />
          </motion.a>
        </AnimatePresence>
      </div>

      {hasMultipleSlides && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-4 z-[4] flex justify-center gap-2 md:top-5"
            role="group"
            aria-label={dotsLabel}
          >
            {slides.map((slide, i) => {
              const active = i === safeIndex;
              const slideImage = resolveImageSrc(slide.image);
              return (
                <button
                  key={slideImage}
                  type="button"
                  aria-label={`${dotsLabel} ${i + 1} / ${count}`}
                  aria-current={active ? 'true' : undefined}
                  className={`pointer-events-auto h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ddaf0] ${
                    active ? 'w-8 bg-[#9ddaf0]' : 'w-2 bg-white/35 hover:bg-white/55'
                  }`}
                  onClick={() => goTo(i, i > safeIndex ? 1 : -1)}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label={prevSlideLabel}
            className="pointer-events-auto absolute left-2 top-1/2 z-[4] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#08184f]/55 text-white opacity-45 shadow-lg backdrop-blur-md transition hover:bg-[#08184f]/75 focus-visible:opacity-100 md:h-10 md:w-10 md:opacity-0 md:group-hover/slider:opacity-90 lg:left-5"
            onClick={() => goPrev()}
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            aria-label={nextSlideLabel}
            className="pointer-events-auto absolute right-2 top-1/2 z-[4] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#08184f]/55 text-white opacity-45 shadow-lg backdrop-blur-md transition hover:bg-[#08184f]/75 focus-visible:opacity-100 md:h-10 md:w-10 md:opacity-0 md:group-hover/slider:opacity-90 lg:right-5"
            onClick={() => goNext()}
          >
            <ChevronIcon dir="right" />
          </button>
        </>
      )}
    </div>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
