import { createReadStream } from "node:fs";
import * as logs from "../console-colors/index.js";

const readfile = async (path) => {
  return new Promise((resolve) => {
    const stream = createReadStream(path);

    stream.on("error", () => {
      resolve(logs.OFLog());
    });
    stream.on("data", (data) => {
      resolve(logs.brightWhiteLog(data.toString()));
    });
    stream.on("end", () => {
      resolve();
    });
  });
};

export default readfile;
