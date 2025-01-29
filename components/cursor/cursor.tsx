"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import "./styles.css";

export default function Cursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const circle = useRef<HTMLDivElement>(null);
  const size = 30;

  const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

  const manageMouseMove = (e: MouseEvent): void => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  const moveCircle = (x: number, y: number): void => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  useEffect(() => {
    const cursorElement = circle.current;

    const handleMouseEnter = () => {
      if (cursorElement) {
        cursorElement.style.width = "50px";
        cursorElement.style.height = "50px";
      }
    };

    const handleMouseLeave = () => {
      if (cursorElement) {
        cursorElement.style.width = "20px";
        cursorElement.style.height = "20px";
      }
    };

    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("mouseenter", handleMouseEnter);
      img.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("mouseenter", handleMouseEnter);
        img.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="cursor_wrapper">
      <div ref={circle} className="cursor" />
    </div>
  );
}
