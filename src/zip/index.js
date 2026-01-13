import compress from "./compress.js";
import decompress from "./decompress.js";
const zipController = async (command, args, homeDir) => {
  switch (command) {
    case "compress":
      await compress(args, homeDir);
      break;
    case "decompress":
      await decompress(args, homeDir);
      break;
    default:
      break;
  }
};

export default zipController;
