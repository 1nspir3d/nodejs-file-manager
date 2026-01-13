const redLog = (text) => {
  console.log(`\x1b[31m${text}\x1b[0m`);
};

const greenLog = (text) => {
  console.log(`\x1b[32m${text}\x1b[0m`);
};

const yellowLog = (text) => {
  console.log(`\x1b[33m${text}\x1b[0m`);
};

const blueLog = (text) => {
  console.log(`\x1b[34m${text}\x1b[0m`);
};

const magentaLog = (text) => {
  console.log(`\x1b[35m${text}\x1b[0m`);
};

const cyanLog = (text) => {
  console.log(`\x1b[36m${text}\x1b[0m`);
};

const whiteLog = (text) => {
  console.log(`\x1b[37m${text}\x1b[0m`);
};

const grayLog = (text) => {
  console.log(`\x1b[90m${text}\x1b[0m`);
};

const brightRedLog = (text) => {
  console.log(`\x1b[91m${text}\x1b[0m`);
};

const brightGreenLog = (text) => {
  console.log(`\x1b[92m${text}\x1b[0m`);
};

const brightYellowLog = (text) => {
  console.log(`\x1b[93m${text}\x1b[0m`);
};

const brightBlueLog = (text) => {
  console.log(`\x1b[94m${text}\x1b[0m`);
};

const brightMagentaLog = (text) => {
  console.log(`\x1b[95m${text}\x1b[0m`);
};

const brightCyanLog = (text) => {
  console.log(`\x1b[96m${text}\x1b[0m`);
};

const brightWhiteLog = (text) => {
  console.log(`\x1b[97m${text}\x1b[0m`);
};

const OFLog = () => {
  brightRedLog("Operation failed");
};

const IILog = () => {
  brightRedLog("Invalid input");
};

export {
  redLog,
  greenLog,
  yellowLog,
  blueLog,
  magentaLog,
  cyanLog,
  whiteLog,
  grayLog,
  brightRedLog,
  brightGreenLog,
  brightYellowLog,
  brightBlueLog,
  brightMagentaLog,
  brightCyanLog,
  brightWhiteLog,
  OFLog,
  IILog,
};
