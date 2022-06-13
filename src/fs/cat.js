import * as logs from "../console-colors/index.js";
import { isAbsolute, join } from "node:path";
import { readfile } from "../utils/index.js";

const cat = async (args, homeDir) => {
  if (args.length === 0) {
    return logs.IILog();
  }

  if (args.length === 1) {
    const path = args[0];

    if (isAbsolute(path)) {
      return await readfile(path);
    }

    const relativePath = join(homeDir, path);

    return await readfile(relativePath);
  }

  if (args.length > 1) {
    const input = args.join(" ");
    const path = input
      .replaceAll('"', "'")
      .split("' ")
      .map((item) => item.replaceAll("'", ""))[0];

    if (isAbsolute(path)) {
      return await readfile(path);
    }

    const relativePath = join(homeDir, path);

    return await readfile(relativePath);
  }
};

export default cat;
