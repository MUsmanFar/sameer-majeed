"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  DrawSVGPlugin,
  Flip,
  MorphSVGPlugin,
);

gsap.defaults({
  ease: "power2.out",
  duration: 0.8,
});

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, DrawSVGPlugin, Flip, MorphSVGPlugin };
