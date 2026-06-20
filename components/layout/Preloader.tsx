"use client";

import { useEffect, useState } from "react";
import { HouseMark } from "@/components/layout/HouseMark";

/**
 * Full-screen splash shown while the page loads: the brand house mark sits
 * centred on an ivory backdrop with a gentle "breathing" pulse. Once the
 * window has loaded (or after a short safety timeout) the overlay fades out
 * and is removed from the DOM. Skips entirely for reduced-motion users.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDone(true);
      return;
    }

    let removeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      setHidden(true); // trigger fade-out
      removeTimer = setTimeout(() => setDone(true), 600); // remove after fade
    };

    // Hide a touch after load so the mark is actually seen; cap the wait so a
    // slow asset never traps the user behind the splash.
    const minShow = setTimeout(finish, 1400);
    const safety = setTimeout(finish, 4000);

    return () => {
      clearTimeout(minShow);
      clearTimeout(safety);
      clearTimeout(removeTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`preloader${hidden ? " is-hidden" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <HouseMark className="preloader-house" />
    </div>
  );
}
