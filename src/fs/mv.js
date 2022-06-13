import { isAbsolute, join, parse } from "node:path";
import { dirExists, fileExists } from "../utils/index.js";
import * as logs from "../console-colors/index.js";
import * as fs from "node:fs/promises";
import rn from "./rn.js";

const mv = async (args, homeDir) => {
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

  if (isAbsolute(source) && isAbsolute(dest)) {
    if (!fileExists(source) || !dirExists(dest)) {
      return logs.IILog();
    }
    try {
      await fs.rename(source, join(dest, parse(source).base));
    } catch (error) {
      logs.OFLog();
    }
  }

  if (isAbsolute(source)) {
    const newDest = join(homeDir, dest);
    if (!fileExists(source) || !dirExists(newDest)) {
      return logs.IILog();
    }
    try {
      await fs.rename(source, join(newDest, parse(source).base));
    } catch (error) {
      logs.OFLog();
    }
  }

  if (isAbsolute(dest)) {
    const newSource = join(homeDir, source);
    if (!fileExists(newSource) || !dirExists(dest)) {
      return logs.IILog();
    }
    try {
      await fs.rename(newSource, join(dest, parse(newSource).base));
    } catch (error) {
      logs.OFLog();
    }
  }

  const relativeSource = join(homeDir, source);
  const relativeDest = join(homeDir, dest);

  if (!fileExists(relativeSource) || !dirExists(relativeDest)) {
    return logs.IILog();
  }

  try {
    await fs.rename(
      relativeSource,
      join(relativeDest, parse(relativeSource).base)
    );
  } catch (error) {
    logs.OFLog();
  }
};

export default mv;
