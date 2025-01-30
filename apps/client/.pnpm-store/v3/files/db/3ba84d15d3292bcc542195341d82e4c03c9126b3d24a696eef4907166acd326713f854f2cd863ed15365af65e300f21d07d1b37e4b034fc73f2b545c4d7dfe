import { signal, effect } from '@preact/signals-core';
import { Object3D } from 'three';
const _addedEvent = { type: 'added' };
const _childaddedEvent = { type: 'childadded', child: null };
export function createParentContextSignal() {
    return signal(undefined);
}
export function setupParentContextSignal(parentContextSignal, container) {
    container.addEventListener('added', () => {
        if (!(container.parent?.parent instanceof Parent)) {
            throw new Error(`uikit objects can only be added to uikit parent elements (e.g. Container, Root, ...)`);
        }
        parentContextSignal.value = container.parent.parent.contextSignal;
    });
    container.addEventListener('removed', () => (parentContextSignal.value = undefined));
}
export class Component extends Object3D {
}
export class Parent extends Component {
    contextSignal = signal(undefined);
    childrenContainer = new Object3D();
    constructor() {
        super();
        this.childrenContainer.matrixAutoUpdate = false;
        super.add(this.childrenContainer);
    }
    add(...objects) {
        const objectsLength = objects.length;
        for (let i = 0; i < objectsLength; i++) {
            const object = objects[i];
            if (object instanceof Component) {
                this.childrenContainer.add(object);
            }
            else {
                super.add(object);
            }
        }
        return this;
    }
    addAt(object, index) {
        object.removeFromParent();
        object.parent = this.childrenContainer;
        this.childrenContainer.children.splice(index, 0, object);
        object.dispatchEvent(_addedEvent);
        _childaddedEvent.child = object;
        this.childrenContainer.dispatchEvent(_childaddedEvent);
        _childaddedEvent.child = null;
        return this;
    }
    remove(...objects) {
        const objectsLength = objects.length;
        for (let i = 0; i < objectsLength; i++) {
            const object = objects[i];
            if (object instanceof Component) {
                this.childrenContainer.remove(object);
            }
            else {
                super.remove(object);
            }
        }
        return this;
    }
}
export function bindHandlers(handlers, container, subscriptions) {
    subscriptions.push(effect(() => {
        const { value } = handlers;
        for (const key in value) {
            container.addEventListener(keyToEventName(key), value[key]);
        }
        return () => {
            for (const key in value) {
                container.removeEventListener(keyToEventName(key), value[key]);
            }
        };
    }));
}
function keyToEventName(key) {
    return key.slice(2).toLowerCase();
}
