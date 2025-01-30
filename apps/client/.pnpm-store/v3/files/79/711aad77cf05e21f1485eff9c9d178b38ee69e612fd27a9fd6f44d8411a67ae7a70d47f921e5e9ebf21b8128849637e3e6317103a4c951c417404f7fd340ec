export type Bucket<E> = {
    offset: number;
    elements: Array<E>;
    /**
     * positive: missing space
     * negative: too much space
     */
    missingSpace: number;
    add: Array<E>;
};
export declare function assureBucketExists(buckets: Array<Bucket<unknown>>, bucketIndex: number): void;
export declare function resizeSortedBucketsSpace(buckets: Array<Bucket<unknown>>, oldSize: number, newSize: number): void;
/**
 * @returns true iff a call to @function updateSortedBucketsAllocation is necassary
 */
export declare function addToSortedBuckets<E>(buckets: Array<Bucket<E>>, bucketIndex: number, element: E, activateElement: (element: E, bucket: Bucket<E>, index: number) => void): boolean;
/**
 * assures that the free space of a bucket is always at the end
 * @returns true iff a call to @function updateSortedBucketsAllocation is necassary
 */
export declare function removeFromSortedBuckets<E>(buckets: Array<Bucket<E>>, bucketIndex: number, element: E, elementIndex: number | undefined, activateElement: (element: E, bucket: Bucket<E>, index: number) => void, clearBufferAt: (index: number) => void, setElementIndex: (element: E, index: number) => void, bufferCopyWithin: (targetIndex: number, startIndex: number, endIndex: number) => void): boolean;
/**
 * @requires that the buffer has room for elementCount number of elements
 */
export declare function updateSortedBucketsAllocation<E>(buckets: Array<Bucket<E>>, activateElement: (element: E, bucket: Bucket<E>, index: number) => void, bufferCopyWithin: (targetIndex: number, startIndex: number, endIndex: number) => void): void;
