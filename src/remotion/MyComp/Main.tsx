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
import { AnimateBackground } from "./component/AnimateBackground/AnimateBackground";
import { Squares } from "./component/SqueareBackground";
import { FlickeringGrid } from "./component/FlickeringGrid";
import { Vortex } from "./component/Vortex";
import { CircleAnime } from "./component/CircleAnime";
import result from "../../../scripts/result";
import { AsciiArt } from "./component/AsciiArt";

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
        <AbsoluteFill className="justify-center items-center">
          <AsciiArt content={result} startDuration={fps * 2} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
