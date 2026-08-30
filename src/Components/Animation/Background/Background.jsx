import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Background.module.css";

/**
 * Ambient portfolio background: a static schematic grid with a
 * handful of light "pulses" that travel along random lines.
 *
 * Design notes (fixes vs. the previous version):
 * - The grid itself is painted with a CSS gradient, not 60+ divs —
 *   cheaper to render and, because it uses one cell size for both
 *   axes, the cells are always squares (never stretched rectangles).
 * - Nothing animates on an infinite CSS loop, so there's no moment
 *   where every line syncs up and fires at once (on load, or later).
 * - A small JS scheduler is the single source of truth for motion:
 *   every CYCLE_MS it lights up BURST_SIZE random lines at once
 *   (mixing vertical + horizontal), lets them finish, then stays
 *   quiet until the next cycle — exactly one thing happening at a
 *   time, which reads as considered rather than busy.
 */

const BURST_SIZE = 5; // lines animated per burst
const CYCLE_MS = 5000; // time between bursts
const MIN_DUR = 1400; // pulse travel time (ms)
const MAX_DUR = 2000;
const MAX_STAGGER = 220; // stagger within a burst, for an organic feel
const FALLBACK_CELL = 84;

let uid = 0;

export default function Background() {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const dimsRef = useRef({ cols: 0, rows: 0, cell: FALLBACK_CELL });
  const [pulses, setPulses] = useState([]);
  const [ready, setReady] = useState(false);

  const burst = useCallback(() => {
    const { cols, rows, cell } = dimsRef.current;
    if (!cols || !rows) return;

    const usedV = new Set();
    const usedH = new Set();
    const next = [];
    const vCount = cols + 1;
    const hCount = rows + 1;

    for (let i = 0; i < BURST_SIZE; i++) {
      let axis = Math.random() < 0.5 ? "v" : "h";
      if (axis === "v" && usedV.size >= vCount) axis = "h";
      if (axis === "h" && usedH.size >= hCount) axis = "v";

      const count = axis === "v" ? vCount : hCount;
      const used = axis === "v" ? usedV : usedH;
      if (used.size >= count) break; // both axes exhausted (tiny viewport)

      let index;
      do {
        index = Math.floor(Math.random() * count);
      } while (used.has(index));
      used.add(index);

      const dur = MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR);
      const delay = Math.random() * MAX_STAGGER;

      next.push({
        id: uid++,
        axis,
        pos: index * cell,
        dur,
        delay,
      });
    }

    setPulses((prev) => [...prev, ...next]);

    next.forEach((p) => {
      window.setTimeout(() => {
        setPulses((prev) => prev.filter((item) => item.id !== p.id));
      }, p.dur + p.delay + 150);
    });
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const measure = () => {
      const cellVar = parseFloat(
        getComputedStyle(el).getPropertyValue("--cell")
      );
      const cell = Number.isFinite(cellVar) && cellVar > 0 ? cellVar : FALLBACK_CELL;
      const { width, height } = el.getBoundingClientRect();
      dimsRef.current = {
        cell,
        cols: Math.max(1, Math.round(width / cell)),
        rows: Math.max(1, Math.round(height / cell)),
      };
    };

    measure();
    setReady(true);

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    // A short, calm delay before the first burst so nothing fires
    // the instant the page paints.
    const start = window.setTimeout(burst, 700);
    const interval = window.setInterval(burst, CYCLE_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [ready, burst]);

  return (
    <div className={styles.background} ref={wrapRef} aria-hidden="true">
      <div className={styles.ambient} />
      <div className={styles.grid} ref={gridRef} />
      <div className={styles.pulses}>
        {pulses.map((p) => {
          const style =
            p.axis === "v"
              ? { left: p.pos, "--dur": `${p.dur}ms`, "--delay": `${p.delay}ms` }
              : { top: p.pos, "--dur": `${p.dur}ms`, "--delay": `${p.delay}ms` };

          return (
            <span key={p.id}>
              <span
                className={styles.litLine}
                data-axis={p.axis}
                style={style}
              />
              <span
                className={styles.pulseTrack}
                data-axis={p.axis}
                style={style}
              >
                <span className={styles.beam} />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}