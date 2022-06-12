import { readdir } from "node:fs/promises";
const dirExists = async (path) => {
  try {
    await readdir(path);
    return true;
  } catch (error) {
    return false;
  }
};

export default dirExists;
