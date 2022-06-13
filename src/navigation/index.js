import up from "./up.js";
import cd from "./cd.js";
import ls from "./ls.js";
import * as logs from "../console-colors/index.js";

export { up, cd, ls };

const navigationController = async (command, args, homeDir, rootDir) => {
  switch (command) {
    case "up":
      return up(homeDir, rootDir);
    case "cd":
      return await cd(args, homeDir, rootDir);
    case "ls":
      await ls(homeDir);
      return [homeDir, rootDir];
    default:
      logs.IILog();
      return [homeDir, rootDir];
  }
};

export default navigationController;
