import { join, isAbsolute, normalize, parse } from "node:path";
import { dirExists, pwd } from "../utils/index.js";
import * as logs from "../console-colors/index.js";

const cd = async (args, homeDir, rootDir) => {
  if (args.length === 0 || args.length > 1) {
    logs.IILog();
    pwd(homeDir);
    return [homeDir, rootDir];
  }

  const path = args[0];

  if (isAbsolute(path)) {
    const exists = await dirExists(path);

    if (!exists) {
      logs.OFLog();
      pwd(homeDir);
      return [homeDir, rootDir];
    }

    const newHomeDir = normalize(path);

    pwd(newHomeDir);
    return [newHomeDir, parse(newHomeDir).root];
  }

  const newHomeDir = join(homeDir, path);
  const exists = await dirExists(newHomeDir);

  if (exists) {
    pwd(newHomeDir);
    return [newHomeDir, rootDir];
  }

  logs.OFLog();
  pwd(homeDir);
  return [homeDir, rootDir];
};

export default cd;
