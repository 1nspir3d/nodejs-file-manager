import { createWriteStream } from "node:fs";
import { join } from "node:path";
import * as logs from "../console-colors/index.js";
const add = async (args, homeDir) => {
  const fileName = args.join(" ");
  const filePath = join(homeDir, fileName);
  if (fileName.match(/\\|\//g)) {
    return logs.IILog();
  }

  return new Promise((resolve) => {
    const stream = createWriteStream(filePath, { flags: "wx" });

    stream.on("error", () => {
      resolve(logs.OFLog());
    });
    stream.on("close", () => {
      resolve();
    });
    stream.write("", "utf-8");
    stream.close();
  });
};

export default add;
