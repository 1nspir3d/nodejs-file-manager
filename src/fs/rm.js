import { isAbsolute, join } from "node:path";
import { dirExists, fileExists } from "../utils/index.js";
import * as logs from "../console-colors/index.js";
import * as fs from "node:fs/promises";

const rm = async (args, homeDir) => {
  const input = args.join(" ").replaceAll('"', "'");
  let source = "";
  if (input.includes(" '")) {
    [source] = input
      .split("' ")
      .join(" ")
      .split(" '")
      .map((item) => item.replaceAll("'", ""));
  } else if (input.includes("' ")) {
    [source] = input.split("' ").map((item) => item.replaceAll("'", ""));
  } else {
    [source] = input.split(" ");
  }

  if (isAbsolute(source)) {
    if (!fileExists(source)) {
      return logs.IILog();
    }

    try {
      return await fs.rm(source);
    } catch (error) {
      return logs.OFLog();
    }
  }

  const relativePath = join(homeDir, source);
  if (!fileExists(relativePath)) {
    return logs.IILog();
  }
  try {
    return await fs.rm(relativePath);
  } catch (error) {
    return logs.OFLog();
  }
};

export default rm;
