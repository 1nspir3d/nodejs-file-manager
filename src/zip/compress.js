import { isAbsolute, join } from "node:path";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { fileExists } from "../utils/index.js";
import * as logs from "../console-colors/index.js";

const compress = async (args, homeDir) => {
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

  const brotli = createBrotliCompress();

  if (isAbsolute(source) && isAbsolute(dest)) {
    const sourceExists = await fileExists(source);
    const destExists = await fileExists(dest);
    if (!sourceExists || destExists) {
      return logs.IILog();
    }
    const rStream = createReadStream(source);
    const wStream = createWriteStream(dest);
    return await pipeline(rStream, brotli, wStream);
  }

  if (isAbsolute(source)) {
    const destPath = join(homeDir, dest);
    if (!(await fileExists(source)) || (await fileExists(destPath))) {
      return logs.IILog();
    }
    const rStream = createReadStream(source);
    const wStream = createWriteStream(destPath);
    return await pipeline(rStream, brotli, wStream);
  }

  if (isAbsolute(dest)) {
    const sourcePath = join(homeDir, source);
    if (!(await fileExists(sourcePath)) || (await fileExists(dest))) {
      return logs.IILog();
    }
    const rStream = createReadStream(sourcePath);
    const wStream = createWriteStream(dest);
    return await pipeline(rStream, brotli, wStream);
  }

  const relativeSource = join(homeDir, source);
  const relativeDest = join(homeDir, dest);

  if (!(await fileExists(relativeSource)) || (await fileExists(relativeDest))) {
    return logs.IILog();
  }

  const rStream = createReadStream(relativeSource);
  const wStream = createWriteStream(relativeDest);
  return await pipeline(rStream, brotli, wStream);
};

export default compress;
