import compress from "./compress.js";
const zipController = async (command, args, homeDir) => {
  switch (command) {
    case "compress":
      await compress(args, homeDir);
      break;
    // case 'decompress':
    // await decompress()
    default:
      break;
  }
};

export default zipController;
