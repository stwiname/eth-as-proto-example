/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/transform
 * @param encodedArray `~lib/typedarray/Uint8Array`
 * @returns `~lib/typedarray/Uint8Array`
 */
export declare function transform(encodedArray: Uint8Array): Uint8Array;
/**
 * assembly/index/testTransform
 * @returns `~lib/typedarray/Uint8Array`
 */
export declare function testTransform(): Uint8Array;
/**
 * assembly/index/allocate
 * @param size `i32`
 * @returns `usize`
 */
export declare function allocate(size: number): number;
/**
 * assembly/index/myAbort
 * @param message `usize`
 * @param fileName `usize`
 * @param line `u32`
 * @param column `u32`
 */
export declare function myAbort(message: number, fileName: number, line: number, column: number): void;
