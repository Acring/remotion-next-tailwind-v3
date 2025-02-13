import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps } from "../../../types/constants";
import { NextLogo } from "./NextLogo";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";
import { AnimateBackground } from "./AnimateBackground/AnimateBackground";
import { Squares } from "@/components/SqueareBackground";
import { FlickeringGrid } from "@/components/FlickeringGrid";
import { Vortex } from "@/components/Vortex";
import { CircleAnime } from "./CircleAnime";
import result from "../../../scripts/result";

loadFont();

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  return (
    <AbsoluteFill className="bg-white">
      <Sequence durationInFrames={transitionStart + transitionDuration}>
        <Rings outProgress={logoOut}></Rings>
        <AbsoluteFill className="justify-center items-center">
          <NextLogo outProgress={logoOut}></NextLogo>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={transitionStart + transitionDuration / 2}>
        <TextFade>
          <h1
            className="text-[70px] font-bold"
            style={{
              fontFamily,
            }}
          >
            {title}
          </h1>
        </TextFade>
      </Sequence>
      <Sequence from={transitionStart + transitionDuration}>
        {/* <AnimateBackground interactive={false} /> */}
        {/* <FlickeringGrid /> */}
        <Vortex />
      </Sequence>
      <Sequence from={transitionStart + transitionDuration}>
        <div
          className="absolute top-0 left-0 w-full h-full whitespace-pre text-xs"
          style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
        >
          {result.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
