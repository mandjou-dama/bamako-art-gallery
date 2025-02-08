"use client";
import React, { useRef } from "react";
import gsap from "gsap";

import "./styles.css";
import { useGSAP } from "@gsap/react";

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
      x: lerp(x, mouse.current.x, 0.095),
      y: lerp(y, mouse.current.y, 0.095),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  const moveCircle = (x: number, y: number): void => {
    if (!circle.current) return; // Prevent errors if component unmounts
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  useGSAP(
    () => {
      animate();
      window.addEventListener("mousemove", manageMouseMove);
      return () => {
        window.removeEventListener("mousemove", manageMouseMove);
      };
    },
    { scope: circle }
  );

  //   useEffect(() => {
  //     const cursorElement = circle.current;

  //     const handleMouseEnter = () => {
  //       if (cursorElement) {
  //         cursorElement.style.width = "50px";
  //         cursorElement.style.height = "50px";
  //       }
  //     };

  //     const handleMouseLeave = () => {
  //       if (cursorElement) {
  //         cursorElement.style.width = "30px";
  //         cursorElement.style.height = "30px";
  //       }
  //     };

  //     document.querySelectorAll("img").forEach((img) => {
  //       img.addEventListener("mouseenter", handleMouseEnter);
  //       img.addEventListener("mouseleave", handleMouseLeave);
  //     });

  //     return () => {
  //       document.querySelectorAll("img").forEach((img) => {
  //         img.removeEventListener("mouseenter", handleMouseEnter);
  //         img.removeEventListener("mouseleave", handleMouseLeave);
  //       });
  //     };
  //   }, []);

  return (
    <div className="cursor_wrapper">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, .3)",
          width: size,
          height: size,
          transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out, backdrop-filter 0.3s ease-out, background-color 0.3s ease-out`,
        }}
        className="custom_cursor"
        ref={circle}
      />
    </div>
  );
}
