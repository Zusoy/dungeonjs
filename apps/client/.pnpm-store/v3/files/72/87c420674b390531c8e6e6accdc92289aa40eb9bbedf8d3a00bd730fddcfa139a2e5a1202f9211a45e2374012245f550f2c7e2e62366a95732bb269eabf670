import { signal, effect } from '@preact/signals-core';
import { Matrix4 } from 'three';
import { defaultClippingData } from '../clipping.js';
import { unsubscribeSubscriptions } from '../utils.js';
import { setupImmediateProperties } from '../properties/immediate.js';
export function createInstancedPanel(propertiesSignal, orderInfo, panelGroupDependencies, panelGroupManager, matrix, size, offset, borderInset, clippingRect, isVisible, materialConfig, subscriptions) {
    subscriptions.push(effect(() => {
        if (orderInfo.value == null) {
            return;
        }
        const innerSubscriptions = [];
        const group = panelGroupManager.getGroup(orderInfo.value.majorIndex, panelGroupDependencies?.value);
        new InstancedPanel(propertiesSignal, group, orderInfo.value.minorIndex, matrix, size, offset, borderInset, clippingRect, isVisible, materialConfig, innerSubscriptions);
        return () => unsubscribeSubscriptions(innerSubscriptions);
    }));
    return subscriptions;
}
const matrixHelper1 = new Matrix4();
const matrixHelper2 = new Matrix4();
export class InstancedPanel {
    group;
    minorIndex;
    matrix;
    size;
    offset;
    borderInset;
    clippingRect;
    materialConfig;
    indexInBucket;
    bucket;
    unsubscribeList = [];
    insertedIntoGroup = false;
    active = signal(false);
    constructor(propertiesSignal, group, minorIndex, matrix, size, offset, borderInset, clippingRect, isVisible, materialConfig, subscriptions) {
        this.group = group;
        this.minorIndex = minorIndex;
        this.matrix = matrix;
        this.size = size;
        this.offset = offset;
        this.borderInset = borderInset;
        this.clippingRect = clippingRect;
        this.materialConfig = materialConfig;
        const setters = materialConfig.setters;
        setupImmediateProperties(propertiesSignal, this.active, materialConfig.hasProperty, (key, value) => {
            const index = this.getIndexInBuffer();
            if (index == null) {
                return;
            }
            const { instanceData, instanceDataOnUpdate: instanceDataAddUpdateRange, root } = this.group;
            setters[key](instanceData.array, instanceData.itemSize * index, value, size, instanceDataAddUpdateRange);
            root.requestRender();
        }, subscriptions);
        const isPanelVisible = materialConfig.computedIsVisibile(propertiesSignal, borderInset, size, isVisible);
        subscriptions.push(effect(() => {
            if (isPanelVisible.value) {
                this.requestShow();
                return;
            }
            this.hide();
        }), () => this.hide());
    }
    setIndexInBucket(index) {
        this.indexInBucket = index;
    }
    getIndexInBuffer() {
        if (this.bucket == null || this.indexInBucket == null) {
            return undefined;
        }
        return this.bucket.offset + this.indexInBucket;
    }
    activate(bucket, index) {
        this.bucket = bucket;
        this.indexInBucket = index;
        this.active.value = true;
        this.unsubscribeList.push(effect(() => {
            if (this.matrix.value == null || this.size.value == null) {
                return;
            }
            const index = this.getIndexInBuffer();
            if (index == null) {
                return;
            }
            const arrayIndex = index * 16;
            const [width, height] = this.size.value;
            const pixelSize = this.group.pixelSize.value;
            matrixHelper1.makeScale(width * pixelSize, height * pixelSize, 1);
            if (this.offset != null) {
                const [x, y] = this.offset.value;
                matrixHelper1.premultiply(matrixHelper2.makeTranslation(x * pixelSize, y * pixelSize, 0));
            }
            matrixHelper1.premultiply(this.matrix.value);
            const { instanceMatrix, root } = this.group;
            matrixHelper1.toArray(instanceMatrix.array, arrayIndex);
            instanceMatrix.addUpdateRange(arrayIndex, 16);
            instanceMatrix.needsUpdate = true;
            root.requestRender();
        }), effect(() => {
            const index = this.getIndexInBuffer();
            if (index == null || this.size.value == null) {
                return;
            }
            const [width, height] = this.size.value;
            const { instanceData, root } = this.group;
            const { array } = instanceData;
            const bufferIndex = index * 16 + 13;
            array[bufferIndex] = width;
            array[bufferIndex + 1] = height;
            instanceData.addUpdateRange(bufferIndex, 2);
            instanceData.needsUpdate = true;
            root.requestRender();
        }), effect(() => {
            const index = this.getIndexInBuffer();
            if (index == null || this.borderInset.value == null) {
                return;
            }
            const { instanceData, root } = this.group;
            const offset = index * 16 + 0;
            instanceData.array.set(this.borderInset.value, offset);
            instanceData.addUpdateRange(offset, 4);
            instanceData.needsUpdate = true;
            root.requestRender();
        }), effect(() => {
            const index = this.getIndexInBuffer();
            if (index == null) {
                return;
            }
            const { instanceClipping, root } = this.group;
            const offset = index * 16;
            const clipping = this.clippingRect?.value;
            if (clipping != null) {
                clipping.toArray(instanceClipping.array, offset);
            }
            else {
                instanceClipping.array.set(defaultClippingData, offset);
            }
            instanceClipping.addUpdateRange(offset, 16);
            instanceClipping.needsUpdate = true;
            root.requestRender();
        }));
    }
    requestShow() {
        if (this.insertedIntoGroup) {
            return;
        }
        this.insertedIntoGroup = true;
        this.group.insert(this.minorIndex, this);
    }
    hide() {
        if (!this.insertedIntoGroup) {
            return;
        }
        this.active.value = false;
        this.group.delete(this.minorIndex, this.indexInBucket, this);
        this.insertedIntoGroup = false;
        this.bucket = undefined;
        this.indexInBucket = undefined;
        const unsubscribeListLength = this.unsubscribeList.length;
        for (let i = 0; i < unsubscribeListLength; i++) {
            this.unsubscribeList[i]();
        }
        this.unsubscribeList.length = 0;
    }
}
