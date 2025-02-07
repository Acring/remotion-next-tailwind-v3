import { useRef } from "react";
import { useAnimeTimeline } from "../../lib/useAnimeTimeline";
import anime from "animejs/lib/anime.es.js";
import { AbsoluteFill } from "remotion";

export function CircleAnime() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  useAnimeTimeline(() => {
    const t1 = anime.timeline({
      direction: "normal",
      easing: "easeInOutSine",
      elasticity: 200,
      autoplay: false,
    });

    t1.add({
      targets: ref.current,
      translateX: 100,
    });

    t1.add(
      {
        targets: ref2.current,
        translateX: 100,
      },
      "-=100",
    );

    return t1;
  });

  return (
    <AbsoluteFill>
      <div
        ref={ref}
        className="w-10 h-10 bg-red-500 absolute top-0 left-0"
      ></div>
      <div
        ref={ref2}
        className="w-10 h-10 bg-blue-500 absolute top-10 left-0"
      ></div>
    </AbsoluteFill>
  );
}
