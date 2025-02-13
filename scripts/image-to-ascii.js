var asciify = require("asciify-image");
var path = require("path");
var fs = require("fs");

var options = {
  fit: "original",
  // 禁用颜色输出
  width: 64,
  color: false,
  format: "string",
};

// 使用 path.join 和 __dirname 构建绝对路径
const imagePath = path.join(__dirname, "../public/deepseek-64x64.png");
const outputPath = path.join(__dirname, "result.ts");

asciify(imagePath, options, function (err, asciified) {
  if (err) throw err;

  // 打印到控制台
  console.log(asciified.toString());

  // 保存到文件
  fs.writeFile(
    outputPath,
    `
    const result = \`${asciified.toString()}\`;
    export default result;
    `,
    (err) => {
      if (err) throw err;
      console.log("ASCII艺术已保存到 result.ts", asciified.toString().length);
    },
  );
});
