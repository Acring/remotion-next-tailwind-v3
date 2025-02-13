import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { interpolate } from "remotion";

interface AsciiArtProps {
  content: string;
  startDuration: number;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export const AsciiArt: React.FC<AsciiArtProps> = ({
  content,
  startDuration = 30 * 2,
}) => {
  const frame = useCurrentFrame();

  // 将内容分割成行
  const lines = useMemo(() => content.split("\n"), [content]);

  // 计算每行显示的时间
  const framePerLine = startDuration / lines.length;
  console.log("framePerLine", framePerLine);

  // 创建字符变换函数
  const getShuffledChar = (
    char: string,
    lineIndex: number,
    charIndex: number,
  ) => {
    if (char.trim() === "") return char;

    // 使用初始字符的 charCode 作为种子
    const seed = char.charCodeAt(0);
    const shouldShuffle =
      frame > startDuration && Math.sin(seed + frame * 0.1) > 0.9;

    if (shouldShuffle) {
      // 使用字符的 charCode 来确定随机字符的选择
      const randomIndex = Math.floor(
        Math.abs(Math.sin(seed + frame)) * CHARS.length,
      );
      return CHARS[randomIndex];
    }
    return char;
  };

  return (
    <div
      style={{ fontFamily: "Consolas, Monaco, 'Courier New', monospace" }}
      className="text-xs"
    >
      {lines.map((line, lineIndex) => {
        // 计算当前行的显示进度
        const lineProgress = interpolate(
          frame,
          [lineIndex * framePerLine, (lineIndex + 1) * framePerLine],
          [0, 1],
          { extrapolateRight: "clamp" },
        );

        return (
          <div
            key={lineIndex}
            className="text-white"
            style={{
              opacity: lineProgress,
              transform: `translateY(${(1 - lineProgress) * 10}px)`,
            }}
          >
            {line.split("").map((char, charIndex) => (
              <span key={charIndex}>
                {getShuffledChar(char, lineIndex, charIndex)}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
