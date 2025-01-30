import { effect } from '@preact/signals-core';
export function setupLayoutListeners(l1, l2, size, initializers) {
    initializers.push(() => effect(() => {
        const s = size.value;
        if (s == null) {
            return;
        }
        l1.peek()?.onSizeChange?.(...s);
        l2.peek()?.onSizeChange?.(...s);
    }));
}
export function setupClippedListeners(l1, l2, isClippedSignal, initializers) {
    let first = true;
    initializers.push(() => effect(() => {
        const isClipped = isClippedSignal.value;
        if (first) {
            first = false;
            return;
        }
        l1.peek()?.onIsClippedChange?.(isClipped);
        l2.peek()?.onIsClippedChange?.(isClipped);
    }));
}
