import { effect, signal } from '@preact/signals-core';
import { createInstancedPanel } from './panel/instanced-panel.js';
import { ElementType, computedOrderInfo } from './order.js';
import { computedBorderInset, unsubscribeSubscriptions, } from './utils.js';
import { createPanelMaterialConfig, defaultPanelDependencies, } from './panel/index.js';
const selectionBorderKeys = [
    'selectionBorderRightWidth',
    'selectionBorderTopWidth',
    'selectionBorderLeftWidth',
    'selectionBorderBottomWidth',
];
let selectionMaterialConfig;
function getSelectionMaterialConfig() {
    selectionMaterialConfig ??= createPanelMaterialConfig({
        backgroundColor: 'selectionColor',
        backgroundOpacity: 'selectionOpacity',
        borderBend: 'selectionBorderBend',
        borderBottomLeftRadius: 'selectionBorderBottomLeftRadius',
        borderBottomRightRadius: 'selectionBorderBottomRightRadius',
        borderColor: 'selectionBorderColor',
        borderOpacity: 'selectionBorderOpacity',
        borderTopLeftRadius: 'selectionBorderTopLeftRadius',
        borderTopRightRadius: 'selectionBorderTopRightRadius',
    }, {
        backgroundColor: 0xb4d7ff,
        backgroundOpacity: 1,
    });
    return selectionMaterialConfig;
}
export function createSelection(propertiesSignal, matrix, selectionBoxes, isVisible, prevOrderInfo, parentClippingRect, panelGroupManager, initializers) {
    const panels = [];
    const orderInfo = computedOrderInfo(undefined, ElementType.Panel, defaultPanelDependencies, prevOrderInfo);
    const borderInset = computedBorderInset(propertiesSignal, selectionBorderKeys);
    initializers.push(() => effect(() => {
        const selections = selectionBoxes.value;
        const selectionsLength = selections.length;
        for (let i = 0; i < selectionsLength; i++) {
            let panelData = panels[i];
            if (panelData == null) {
                const size = signal([0, 0]);
                const offset = signal([0, 0]);
                const panelSubscriptions = [];
                createInstancedPanel(propertiesSignal, orderInfo, undefined, panelGroupManager, matrix, size, offset, borderInset, parentClippingRect, isVisible, getSelectionMaterialConfig(), panelSubscriptions);
                panels[i] = panelData = {
                    panelSubscriptions,
                    offset,
                    size,
                };
            }
            const selection = selections[i];
            panelData.size.value = selection.size;
            panelData.offset.value = selection.position;
        }
        const panelsLength = panels.length;
        for (let i = selectionsLength; i < panelsLength; i++) {
            unsubscribeSubscriptions(panels[i].panelSubscriptions);
        }
        panels.length = selectionsLength;
    }), () => () => {
        const panelsLength = panels.length;
        for (let i = 0; i < panelsLength; i++) {
            unsubscribeSubscriptions(panels[i].panelSubscriptions);
        }
    });
    return orderInfo;
}
