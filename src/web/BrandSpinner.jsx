/**
 * BrandSpinner — web (React DOM)
 * Reads the shared spinner tokens; no global CSS needed (keyframe is inlined).
 *   import { BrandSpinner } from "@shownspace/brand/web";
 */
import { tokens } from "../tokens.js";

const { spinner } = tokens;

export function BrandSpinner({ size = 40, label = "Loading", className = "" }) {
  const dur = spinner.durationMs / 1000 + "s";
  return (
    <span
      role="status"
      aria-label={label}
      className={className}
      style={{ display: "inline-flex" }}
    >
      <style>{`@keyframes ss-spin{to{transform:rotate(360deg)}}
        .ss-disc svg{animation:ss-spin ${dur} linear infinite;display:block}
        @media (prefers-reduced-motion: reduce){.ss-disc svg{animation-duration:3.2s}}`}</style>
      <span className="ss-disc">
        <svg viewBox="0 0 100 100" fill="none" style={{ width: size, height: size }} aria-hidden="true">
          <circle cx="50" cy="50" r={spinner.radius} stroke={spinner.track} strokeWidth={spinner.strokeWidth} />
          <circle
            cx="50"
            cy="50"
            r={spinner.radius}
            stroke={spinner.arc}
            strokeWidth={spinner.strokeWidth}
            strokeDasharray={spinner.dashArray}
          />
        </svg>
      </span>
    </span>
  );
}

export default BrandSpinner;
