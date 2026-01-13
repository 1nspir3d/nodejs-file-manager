import * as logs from "../console-colors/index.js";
import cat from "./cat.js";
import add from "./add.js";
import rn from "./rn.js";
// import cp from "./cp.js";
import mv from "./mv.js";
import rm from "./rm.js";

const fsController = async (command, args, homeDir, rootDir) => {
  switch (command) {
    case "cat":
      await cat(args, homeDir);
      break;
    case "add":
      await add(args, homeDir);
      break;
    case "rn":
      await rn(args, homeDir);
      break;
    // case "cp":
    //   await cp();
    //   break;
    case "mv":
      await mv(args, homeDir);
      break;
    case "rm":
      await rm(args, homeDir);
      break;
    default:
      logs.IILog();
      break;
  }
};

export default fsController;
