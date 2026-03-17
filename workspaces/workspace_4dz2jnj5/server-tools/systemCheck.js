import os from 'os';

export default async function(args) {
  return {
    memoryFreed: os.freemem(),
    totalMemory: os.totalmem(),
    cpuCores: os.cpus().length,
    arch: os.arch()
  };
}