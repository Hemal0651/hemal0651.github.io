import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check if device is touch-based or has no precise pointer (mobile/tablets) or narrow layout
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouchDevice) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isInitialized = false;
    let isRequesting = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isInitialized) {
        ringX = mouseX;
        ringY = mouseY;
        isInitialized = true;
      }
      
      if (isHidden) {
        setIsHidden(false);
      }

      // Smooth custom cursor outer circle with lerped physics
      if (!isRequesting) {
        isRequesting = true;
        requestAnimationFrame(updatePositions);
      }
    };

    const updatePositions = () => {
      // 1. Move the central exact dot immediately with CSS hardware acceleration
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // 2. Interpolate outer magnetic ring position for elegant responsive "lag" physics
      const easing = 0.16; // Lerp multiplier
      ringX += (mouseX - ringX) * easing;
      ringY += (mouseY - ringY) * easing;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Keep repeating calculation if there is significant distance left to close
      const deltaX = Math.abs(mouseX - ringX);
      const deltaY = Math.abs(mouseY - ringY);
      
      if (deltaX > 0.05 || deltaY > 0.05) {
        requestAnimationFrame(updatePositions);
      } else {
        isRequesting = false;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect hoverable premium objects
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeaveWindow = () => setIsHidden(true);
    const onMouseEnterWindow = () => setIsHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, [isHidden]);

  // Hide cursor on touch devices or small layouts directly via helper guard
  if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)) {
    return null;
  }

  return (
    <>
      {/* Target Global Cursor Hiding Class in Desktop Mode */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input, select, textarea, .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Core tracking dot at target location (no transform transition to avoid frame lag) */}
        <div
          ref={dotRef}
          className="w-1.5 h-1.5 rounded-full bg-[#F97316] fixed top-0 left-0 -mt-[3px] -ml-[3px] pointer-events-none z-50 shadow-md shadow-orange-500/50"
        />

        {/* Easing outer fluid ring helper - wrapper has NO CSS transitions on transform */}
        <div
          ref={ringRef}
          className="fixed top-0 left-0 pointer-events-none z-40"
        >
          {/* Inner circle scales & changes styling with clean CSS transitions, without affecting layout transformation */}
          <div
            className={`rounded-full border-2 ease-out duration-200 transition-all ${
              isClicking
                ? "w-6 h-6 -mt-3 -ml-3 border-[#F97316] bg-[#F97316]/20 scale-90"
                : isHovering
                ? "w-12 h-12 -mt-6 -ml-6 border-[#F97316] bg-[#F97316]/5 shadow-lg shadow-orange-500/10 scale-100"
                : "w-8 h-8 -mt-4 -ml-4 border-[#F97316]/40 bg-transparent scale-100"
            }`}
          />
        </div>
      </div>
    </>
  );
}
