// I use Anime.js v4 beta, but v3 should work similarly
import { useEffect, useId, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import anime from "animejs/lib/anime.es.js";

export const useAnimeTimeline = (
  animeTimelineFactory: () => anime.AnimeTimelineInstance,
) => {
  // const animationScopeRef = useRef<T>(null);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = useId();

  useEffect(() => {
    timelineRef.current = animeTimelineFactory();
    timelineRef.current.pause();
    return () => {};
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      console.log("timelineRef.current", timelineRef.current, fps);
      const seekDuration = (frame / fps) * 1000;
      console.log("seekDuration", seekDuration);
      timelineRef.current.seek(seekDuration);
    }
  }, [frame, fps]);

  console.log("frame", frame);

  return id.replaceAll(":", "_");
};
