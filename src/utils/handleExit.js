import { brightMagentaLog } from "../console-colors/index.js";

const handleExit = (username) => {
  brightMagentaLog(`Thank you for using File Manager, ${username}!`);
  process.exit();
};

export default handleExit;
