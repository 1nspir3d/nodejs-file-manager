import { stat } from "node:fs/promises";
const fileExists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export default fileExists;
