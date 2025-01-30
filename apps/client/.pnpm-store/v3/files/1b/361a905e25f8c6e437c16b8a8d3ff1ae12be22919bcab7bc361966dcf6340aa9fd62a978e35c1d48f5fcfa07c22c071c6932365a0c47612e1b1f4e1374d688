import { computed, effect, signal } from '@preact/signals-core';
import { ElementType, computedOrderInfo } from './order.js';
import { createInstancedPanel } from './panel/instanced-panel.js';
import { computedBorderInset } from './utils.js';
import { createPanelMaterialConfig, defaultPanelDependencies, } from './panel/index.js';
import { computedInheritableProperty } from './properties/index.js';
const caretBorderKeys = [
    'caretBorderRightWidth',
    'caretBorderTopWidth',
    'caretBorderLeftWidth',
    'caretBorderBottomWidth',
];
let caretMaterialConfig;
function getCaretMaterialConfig() {
    caretMaterialConfig ??= createPanelMaterialConfig({
        backgroundColor: 'caretColor',
        backgroundOpacity: 'caretOpacity',
        borderBend: 'caretBorderBend',
        borderBottomLeftRadius: 'caretBorderBottomLeftRadius',
        borderBottomRightRadius: 'caretBorderBottomRightRadius',
        borderColor: 'caretBorderColor',
        borderOpacity: 'caretBorderOpacity',
        borderTopLeftRadius: 'caretBorderTopLeftRadius',
        borderTopRightRadius: 'caretBorderTopRightRadius',
    }, {
        backgroundColor: 0x0,
        backgroundOpacity: 1,
    });
    return caretMaterialConfig;
}
export function createCaret(propertiesSignal, matrix, caretPosition, isVisible, parentOrderInfo, parentClippingRect, panelGroupManager, initializers) {
    const orderInfo = computedOrderInfo(undefined, ElementType.Panel, defaultPanelDependencies, parentOrderInfo);
    const blinkingCaretPosition = signal(undefined);
    initializers.push(() => effect(() => {
        const pos = caretPosition.value;
        if (pos == null) {
            blinkingCaretPosition.value = undefined;
        }
        blinkingCaretPosition.value = pos;
        const ref = setInterval(() => (blinkingCaretPosition.value = blinkingCaretPosition.peek() == null ? pos : undefined), 500);
        return () => clearInterval(ref);
    }));
    const borderInset = computedBorderInset(propertiesSignal, caretBorderKeys);
    const caretWidth = computedInheritableProperty(propertiesSignal, 'caretWidth', 1.5);
    initializers.push((subscriptions) => createInstancedPanel(propertiesSignal, orderInfo, undefined, panelGroupManager, matrix, computed(() => {
        const size = blinkingCaretPosition.value;
        if (size == null) {
            return [0, 0];
        }
        return [caretWidth.value, size[2]];
    }), computed(() => {
        const position = blinkingCaretPosition.value;
        if (position == null) {
            return [0, 0];
        }
        return [position[0] - caretWidth.value / 2, position[1]];
    }), borderInset, parentClippingRect, isVisible, getCaretMaterialConfig(), subscriptions));
}
