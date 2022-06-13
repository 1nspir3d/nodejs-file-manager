import { parse } from "node:path";
import { pwd } from "../utils/index.js";

const up = (homeDir, rootDir) => {
  if (homeDir === rootDir) {
    pwd(homeDir);
    return [homeDir, rootDir];
  }
  const newHomeDir = parse(homeDir).dir;
  pwd(newHomeDir);
  return [newHomeDir, rootDir];
};

export default up;
