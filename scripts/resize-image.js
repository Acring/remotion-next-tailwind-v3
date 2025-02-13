const sharp = require("sharp");
const path = require("path");

// 使用 path.join 和 __dirname 构建绝对路径
const inputImagePath = path.join(__dirname, "../public/deepseek.png");
const outputImagePath = path.join(__dirname, "../public/deepseek-64x64.png");

// 调整图片尺寸为 64x64
sharp(inputImagePath)
  .resize(64, 64, {
    fit: "contain", // 保持宽高比
    background: { r: 255, g: 255, b: 255, alpha: 1 }, // 白色背景
  })
  .toFile(outputImagePath)
  .then((info) => {
    console.log("图片处理完成:", info);
  })
  .catch((err) => {
    console.error("处理图片时发生错误:", err);
  });
