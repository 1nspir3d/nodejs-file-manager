import * as readline from "node:readline";
import * as logs from "./console-colors/index.js";
import { homedir } from "node:os";
import { handleExit, pwd } from "./utils/index.js";
import * as path from "node:path";
import navigationController from "./navigation/index.js";
import fsController from "./fs/index.js";
import hashController from "./hash/index.js";
import osController from "./os/index.js";
import zipController from "./zip/index.js";

const usernameRegEx = /^(?:--username=)(.+)/gm;
const argv = process.argv.slice(2);
const username = [...argv[0].matchAll(usernameRegEx)]?.[0]?.[1];
const operations = {
  nav: ["up", "cd", "ls"],
  fs: ["cat", "add", "rn", "cp", "mv", "rm"],
  os: "os",
  hash: "hash",
  zip: ["compress", "decompress"],
};
let HOME_DIR = homedir();
let ROOT_DIR = path.parse(HOME_DIR).root;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

logs.greenLog(`Welcome to the File Manager, ${username}!`);
pwd(HOME_DIR);
rl.prompt();

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");

  if (operations.nav.includes(command)) {
    const [newHomeDir, newRootDir] = await navigationController(
      command,
      args,
      HOME_DIR,
      ROOT_DIR
    );
    HOME_DIR = newHomeDir;
    ROOT_DIR = newRootDir;
    rl.prompt();
    return;
  }
  if (operations.fs.includes(command)) {
    await fsController(command, args, HOME_DIR, ROOT_DIR);
    pwd(HOME_DIR);
    rl.prompt();
    return;
  }
  if (command === operations.hash) {
    await hashController(args, HOME_DIR);
    pwd(HOME_DIR);
    rl.prompt();
    return;
  }
  if (command === operations.os) {
    await osController(args);
    pwd(HOME_DIR);
    rl.prompt();
    return;
  }
  if (operations.zip.includes(command)) {
    await zipController(command, args, HOME_DIR);
    pwd(HOME_DIR);
    rl.prompt();
    return;
  }

  logs.IILog();
  pwd(HOME_DIR);
  rl.prompt();
}).on("close", () => {
  handleExit(username);
});
