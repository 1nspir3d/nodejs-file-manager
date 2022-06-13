import { readdir } from "node:fs/promises";
import { OFLog } from "../console-colors/index.js";
import { pwd } from "../utils/index.js";
const list = async (path) => {
  try {
    const content = await readdir(path);
    console.log(content);
    pwd(path);
  } catch (error) {
    OFLog();
    pwd(path);
  }
};

export default list;
