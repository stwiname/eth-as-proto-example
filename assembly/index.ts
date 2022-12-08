// The entry file of your WebAssembly module.


import { EthereumLog, encodeEthereumLog, decodeEthereumLog} from "./proto/Ethereum"; // generated file
import { EVMLog, encodeEVMLog, decodeEVMLog} from "./proto/EvmLog"; // generated file


export function add(a: i32, b: i32): i32 {
  return a + b;
}
// Simulate flink input
const inputMessage = new EthereumLog(
    57,
    "0xf31dd4ee74e1dbf198a53d34d950724510dfdf45e27a0fca089cc2de13212923",
    36,
    "0xae451c8c9c6534dca93a487e5d58d0bba890e9742e36e7511e3a3bbf6a7cc37f",
    15937607,
    "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
    "0x000000000000000000000000000000000000000000000003826696afe47f8b96",
    ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x00000000000000000000000053de8e90e24e8f6c4dee06939e4edfc8a073863a",
      "0x00000000000000000000000074de5d4fcbf63e00296fd95d33236b9794016631"]
);

const encodedArray = encodeEthereumLog(inputMessage);

// Handle input

export function transform(encodedArray: Uint8Array):Uint8Array{
  const ethereumLog = decodeEthereumLog(encodedArray);
  const evmLog = new EVMLog(
      `${ethereumLog.blockNumber}-${ethereumLog.index}`,
      ethereumLog.address,
      ethereumLog.blockNumber,

  )

  for(let i = 0; i < ethereumLog.topics.length; i ++) {
    switch(i) {
      case 0:
        evmLog.topics0 = ethereumLog.topics[i];
        break;
      case 1:
        evmLog.topics1 = ethereumLog.topics[i];
        break;
      case 2:
        evmLog.topics2 = ethereumLog.topics[i];
        break;
      case 3:
        evmLog.topics3 = ethereumLog.topics[i];
        break;
    }
  }

  return encodeEVMLog(evmLog)
}

export function transformPtr(ptr: i32, len: i32, outPtr: i32): i32 {
  const input = readBufferFromMemory(ptr, len)

  const result = transform(input);

  return writeBufferToMemory(outPtr, result);
}

export function readBufferFromMemory(ptr: i32, len: i32): Uint8Array {
  let buffer = new Uint8Array(len)

  for (let i = 0; i < len; i ++) {
    buffer[i] = load<u8>(ptr + i)
  }

  return buffer;
}

export function writeBufferToMemory(ptr: i32, data: Uint8Array): i32 {

  for (let i = 0; i < data.length; i ++) {
    store<u8>(ptr + i, data[i])
  }

  return data.length; // TODO what is byteLength?
}

export function testTransform():Uint8Array{
    return transform(encodedArray)
}


export function myAbort(message: usize, fileName: usize, line: u32, column: u32):void{
// override missing abort in env
    // add `--use abort=assembly/index/myAbort` when run asc build

}
