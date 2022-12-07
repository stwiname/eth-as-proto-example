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

export function transform(encodedArray:Uint8Array):Uint8Array{
  const ethereumLog = decodeEthereumLog(encodedArray);
  const evmLog = new EVMLog(
      `${ethereumLog.blockNumber}-${ethereumLog.index}`,
      ethereumLog.address,
      ethereumLog.blockNumber,
      ethereumLog.topics[0],
      ethereumLog.topics[1],
      ethereumLog.topics[2]
  )
  return encodeEVMLog(evmLog)
}

export function testTransform():Uint8Array{
    return transform(encodedArray)
}
