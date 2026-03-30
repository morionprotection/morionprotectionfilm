"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, delay = 0, direction = "up" }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    // Set initial position based on direction
    let x = 0, y = 0;

    switch (direction) {
      case "down":
        y = -60;
        break;
      case "left":
        x = 60;
        break;
      case "right":
        x = -60;
        break;
      default: // "up"
        y = 60;
    }

gsap.set(element, { y, x, opacity: 0, willChange: "transform" });

    const animation = gsap.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      once: true,
      onEnter: () => animation.play(),
      onEnterBack: () => animation.play(),
    });

    // If already in view, play immediately
    if (ScrollTrigger.isInViewport(element)) {
      animation.play(0);
    }

    return () => {
      trigger.kill();
      animation.kill();
    };
  }, [delay, direction]);

  return <div ref={revealRef}>{children}</div>;
}
