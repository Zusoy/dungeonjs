import { BufferAttribute, PlaneGeometry } from 'three';
import { clamp } from 'three/src/math/MathUtils.js';
export function createPanelGeometry() {
    const geometry = new PlaneGeometry();
    const position = geometry.getAttribute('position');
    const array = new Float32Array(4 * position.count);
    const tangent = [1, 0, 0, 1];
    for (let i = 0; i < array.length; i++) {
        array[i] = tangent[i % 4];
    }
    geometry.setAttribute('tangent', new BufferAttribute(array, 4));
    return geometry;
}
export function setComponentInFloat(from, index, value) {
    const x = Math.pow(50, index);
    const currentValue = Math.floor(from / x) % 50;
    return from + (value - currentValue) * x;
}
export const panelGeometry = createPanelGeometry();
export function setBorderRadius(data, indexInData, indexInFloat, value, height) {
    data[indexInData] = setComponentInFloat(data[indexInData], indexInFloat, clamp(Math.ceil(((value ?? 0) / height) * 100), 0, 49));
}
