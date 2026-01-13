import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { isAbsolute, join } from "node:path";
import * as logs from "../console-colors/index.js";
import { fileExists } from "../utils/index.js";

const hashController = async (args, homeDir) => {
  const providedPath = args.join(" ");

  let finalPath = "";

  if (!isAbsolute(providedPath)) {
    finalPath = join(homeDir, providedPath);
  } else {
    finalPath = providedPath;
  }
  const exists = await fileExists(finalPath);

  if (!exists) {
    return logs.IILog();
  }

  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(finalPath);
    stream.on("error", () => resolve(logs.OFLog()));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(logs.brightCyanLog(hash.digest("hex"))));
  });
};

export default hashController;
