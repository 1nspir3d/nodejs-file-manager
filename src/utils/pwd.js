import { EOL } from "node:os";
import { yellowLog } from "../console-colors/index.js";

const pwd = (dirPath) => {
  yellowLog(`You are currently in ${dirPath}`);
};

export default pwd;
