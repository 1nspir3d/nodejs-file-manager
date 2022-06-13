import * as logs from "../console-colors/index.js";
import * as os from "node:os";
import { parse } from "node:path";
const osController = async (args) => {
  if (args.length === 0 || args.length > 1) {
    return logs.IILog();
  }

  const flag = args[0];

  switch (flag) {
    case "--EOL":
      logs.magentaLog(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const res = os.cpus().reduce((acc, curr, next) => {
        const times = curr.times;
        delete curr.times;
        return [
          ...acc,
          {
            ...curr,
            ...times,
          },
        ];
      }, []);
      console.table(res);
      break;
    case "--homedir":
      logs.magentaLog(os.homedir());
      break;
    case "--username":
      logs.magentaLog(parse(os.homedir()).base);
      break;
    case "--architecture":
      logs.magentaLog(os.arch);
      break;
    default:
      logs.IILog();
      break;
  }
};

export default osController;
