import { fileExists } from "../utils/index.js";
import { rename } from "node:fs/promises";
import * as logs from "../console-colors/index.js";
import { isAbsolute, parse, join } from "node:path";

const rn = async (args, homeDir) => {
  const input = args.join(" ").replaceAll('"', "'");
  let source = "";
  let dest = "";
  if (input.includes(" '")) {
    [source, dest] = input
      .split("' ")
      .join(" ")
      .split(" '")
      .map((item) => item.replaceAll("'", ""));
  } else if (input.includes("' ")) {
    [source, dest] = input.split("' ").map((item) => item.replaceAll("'", ""));
  } else {
    [source, dest] = input.split(" ");
  }

  if (dest.match(/\\|\//g)) {
    return logs.IILog();
  }

  if (isAbsolute(source)) {
    const sourceExists = await fileExists(source);

    if (!sourceExists) {
      return logs.IILog();
    }

    const dir = parse(source).dir;
    const newFilePath = join(dir, dest);

    try {
      await rename(source, newFilePath);
    } catch (error) {
      logs.OFLog();
    }
  }

  const oldFilePath = join(homeDir, source);
  const dir = parse(oldFilePath).dir;
  const newFilePath = join(dir, dest);

  const oldFileExists = await fileExists(oldFilePath);
  if (oldFileExists) {
    try {
      await rename(oldFilePath, newFilePath);
    } catch (error) {
      logs.OFLog();
    }
  }
};

export default rn;
