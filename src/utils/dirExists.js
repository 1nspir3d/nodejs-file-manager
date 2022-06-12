import { stat } from "node:fs/promises";
const dirExists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export default dirExists;
