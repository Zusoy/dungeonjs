import { computed, effect } from '@preact/signals-core';
import { Euler, Matrix4, Quaternion, Vector3 } from 'three';
import { alignmentXMap, alignmentYMap, percentageRegex } from './utils.js';
import { computedInheritableProperty } from './properties/index.js';
const tHelper = new Vector3();
const sHelper = new Vector3();
const originVector = new Vector3();
const matrixHelper = new Matrix4();
const eulerHelper = new Euler();
const quaternionHelper = new Quaternion();
const toRad = Math.PI / 180;
function toQuaternion([x, y, z]) {
    return quaternionHelper.setFromEuler(eulerHelper.set(x * toRad, y * toRad, z * toRad));
}
const defaultTransformOriginX = 'center';
const defaultTransformOriginY = 'center';
export function computedTransformMatrix(propertiesSignal, { relativeCenter, size }, pixelSizeSignal) {
    //B * O^-1 * T * O
    //B = bound transformation matrix
    //O = matrix to transform the origin for matrix T
    //T = transform matrix (translate, rotate, scale)
    const tTX = computedInheritableProperty(propertiesSignal, 'transformTranslateX', 0);
    const tTY = computedInheritableProperty(propertiesSignal, 'transformTranslateY', 0);
    const tTZ = computedInheritableProperty(propertiesSignal, 'transformTranslateZ', 0);
    const tRX = computedInheritableProperty(propertiesSignal, 'transformRotateX', 0);
    const tRY = computedInheritableProperty(propertiesSignal, 'transformRotateY', 0);
    const tRZ = computedInheritableProperty(propertiesSignal, 'transformRotateZ', 0);
    const tSX = computedInheritableProperty(propertiesSignal, 'transformScaleX', 1);
    const tSY = computedInheritableProperty(propertiesSignal, 'transformScaleY', 1);
    const tSZ = computedInheritableProperty(propertiesSignal, 'transformScaleZ', 1);
    const tOX = computedInheritableProperty(propertiesSignal, 'transformOriginX', defaultTransformOriginX);
    const tOY = computedInheritableProperty(propertiesSignal, 'transformOriginY', defaultTransformOriginY);
    return computed(() => {
        if (relativeCenter.value == null) {
            return undefined;
        }
        const [x, y] = relativeCenter.value;
        const pixelSize = pixelSizeSignal.value;
        const result = new Matrix4().makeTranslation(x * pixelSize, y * pixelSize, 0);
        let originCenter = true;
        if (tOX.value != 'center' || tOY.value != 'center') {
            if (size.value == null) {
                return undefined;
            }
            const [width, height] = size.value;
            originCenter = false;
            originVector.set(-alignmentXMap[tOX.value] * width * pixelSize, -alignmentYMap[tOY.value] * height * pixelSize, 0);
            result.multiply(matrixHelper.makeTranslation(originVector));
            originVector.negate();
        }
        const r = [tRX.value, tRY.value, tRZ.value];
        const t = [translateToNumber(tTX.value, size, 0), -translateToNumber(tTY.value, size, 1), tTZ.value];
        const s = [scaleToNumber(tSX.value), scaleToNumber(tSY.value), scaleToNumber(tSZ.value)];
        if (t.some((v) => v != 0) || r.some((v) => v != 0) || s.some((v) => v != 1)) {
            result.multiply(matrixHelper.compose(tHelper.fromArray(t).multiplyScalar(pixelSize), toQuaternion(r), sHelper.fromArray(s)));
        }
        if (!originCenter) {
            result.multiply(matrixHelper.makeTranslation(originVector));
        }
        return result;
    });
}
function scaleToNumber(scale) {
    if (typeof scale === 'number') {
        return scale;
    }
    const result = percentageRegex.exec(scale);
    if (result == null) {
        throw new Error(`invalid value "${scale}", expected number of percentage`);
    }
    return parseFloat(result[1]) / 100;
}
function translateToNumber(translate, size, sizeIndex) {
    if (typeof translate === 'number') {
        return translate;
    }
    const result = percentageRegex.exec(translate);
    if (result == null) {
        throw new Error(`invalid value "${translate}", expected number of percentage`);
    }
    const sizeOnAxis = size.value?.[sizeIndex] ?? 0;
    return (sizeOnAxis * parseFloat(result[1])) / 100;
}
export function applyTransform(root, object, transformMatrix, initializers) {
    initializers.push(() => effect(() => {
        if (transformMatrix.value == null) {
            object.current?.matrix.elements.fill(0);
            return;
        }
        object.current?.matrix.copy(transformMatrix.value);
        root.requestRender();
    }));
}
