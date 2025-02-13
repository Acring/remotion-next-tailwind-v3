import { useRef, useEffect } from "react";
import { useCurrentFrame, AbsoluteFill } from "remotion";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  className?: string;
}

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const frame = useCurrentFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas background
    canvas.style.background = "#060606";

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 计算基于帧的偏移量
      const effectiveSpeed = Math.max(speed, 0.1);
      const frameOffset = (frame * effectiveSpeed) % squareSize;

      let offsetX = 0;
      let offsetY = 0;

      switch (direction) {
        case "right":
          offsetX = -frameOffset;
          break;
        case "left":
          offsetX = frameOffset;
          break;
        case "up":
          offsetY = frameOffset;
          break;
        case "down":
          offsetY = -frameOffset;
          break;
        case "diagonal":
          offsetX = -frameOffset;
          offsetY = -frameOffset;
          break;
      }

      const startX = Math.floor(offsetX / squareSize) * squareSize;
      const startY = Math.floor(offsetY / squareSize) * squareSize;

      ctx.lineWidth = 0.5;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (offsetX % squareSize);
          const squareY = y - (offsetY % squareSize);

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2,
      );
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [direction, speed, borderColor, squareSize, frame]);

  return (
    <AbsoluteFill>
      <canvas
        ref={canvasRef}
        className={`w-full h-full border-none block ${className}`}
      />
    </AbsoluteFill>
  );
}
