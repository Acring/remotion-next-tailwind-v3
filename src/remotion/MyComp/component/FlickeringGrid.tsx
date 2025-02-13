import React, { useMemo, useRef } from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

interface FlickeringGridProps {
  // 每个方块的大小（像素）
  squareSize?: number;
  // 方块之间的间距（像素）
  gridGap?: number;
  // 每秒闪烁的概率
  flickerChance?: number;
  // 方块的颜色，支持 rgb 格式
  color?: string;
  // 方块的最大不透明度
  maxOpacity?: number;
}

/**
 * 闪烁网格组件 - Remotion 版本
 * 渲染一个由小方块组成的网格，每个方块会随机闪烁
 */
const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 16,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 获取 Remotion 的视频配置和当前帧
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // 将 RGB 颜色转换为 RGBA 格式
  const memoizedColor = useMemo(() => {
    const rgbMatch = color.match(/\d+/g);
    if (!rgbMatch) return "rgba(0,0,0,";
    return `rgba(${rgbMatch.slice(0, 3).join(",")},`;
  }, [color]);

  // 初始化网格参数和方块状态
  const gridParams = useMemo(() => {
    const cols = Math.floor(width / (squareSize + gridGap));
    const rows = Math.floor(height / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);
    // 初始化每个方块的透明度
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity;
    }
    return { cols, rows, squares };
  }, [width, height, squareSize, gridGap, maxOpacity]);

  // 每帧更新和渲染网格
  useMemo(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布尺寸
    canvas.width = width;
    canvas.height = height;

    // 计算每帧的时间增量
    const deltaTime = 1 / fps;
    // 更新方块的透明度
    for (let i = 0; i < gridParams.squares.length; i++) {
      if (Math.random() < flickerChance * deltaTime) {
        gridParams.squares[i] = Math.random() * maxOpacity;
      }
    }

    // 清空画布并重新绘制所有方块
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < gridParams.cols; i++) {
      for (let j = 0; j < gridParams.rows; j++) {
        const opacity = gridParams.squares[i * gridParams.rows + j];
        ctx.fillStyle = `${memoizedColor}${opacity})`;
        ctx.fillRect(
          i * (squareSize + gridGap),
          j * (squareSize + gridGap),
          squareSize,
          squareSize,
        );
      }
    }
  }, [
    frame, // 每帧触发重新渲染
    width,
    height,
    gridParams,
    squareSize,
    gridGap,
    memoizedColor,
    flickerChance,
    maxOpacity,
    fps,
  ]);

  // 使用 AbsoluteFill 确保 Canvas 填满整个视频画面
  return (
    <AbsoluteFill>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </AbsoluteFill>
  );
};

export { FlickeringGrid };
