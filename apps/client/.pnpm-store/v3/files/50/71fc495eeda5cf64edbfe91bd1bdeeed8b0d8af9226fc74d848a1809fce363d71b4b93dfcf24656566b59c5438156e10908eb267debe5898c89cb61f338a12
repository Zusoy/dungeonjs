import { Signal } from '@preact/signals-core';
import { traverseProperties } from './default.js';
import { allAliases } from './alias.js';
export class MergedProperties {
    preTransformers;
    propertyMap = new Map();
    constructor(preTransformers) {
        this.preTransformers = preTransformers;
    }
    add(key, value) {
        if (value === undefined) {
            //only adding non undefined values to the properties
            return;
        }
        const transform = this.preTransformers?.[key];
        if (transform != null) {
            transform(value, this);
            return;
        }
        //applying the aliases
        const aliases = allAliases[key];
        if (aliases == null) {
            this.addToMap(key, value);
            return;
        }
        const length = aliases.length;
        for (let i = 0; i < length; i++) {
            this.addToMap(aliases[i], value);
        }
    }
    addToMap(key, value) {
        let entry = this.propertyMap.get(key);
        if (entry == null) {
            this.propertyMap.set(key, (entry = []));
        }
        if (!(value instanceof Signal)) {
            //if its not a signal we can clear the previous values
            entry.length = 0;
        }
        entry.push(value);
    }
    /**
     * @returns undefined if the property doesn't exist
     */
    read(key, defaultValue) {
        const entry = this.propertyMap.get(key);
        if (entry == null) {
            return defaultValue;
        }
        const length = entry.length;
        //searching for the property with the highest precedence (most right) that is not undefined
        for (let i = length - 1; i >= 0; i--) {
            const value = entry[i];
            const result = value instanceof Signal ? value.value : value;
            if (result === undefined) {
                continue;
            }
            return result;
        }
        //no property found that is not undefined
        return defaultValue;
    }
    filterCompare(filter, old, onNew, onChange, onDelete) {
        for (const key of this.propertyMap.keys()) {
            if (!filter(key)) {
                continue;
            }
            if (old == null) {
                onNew(key);
                continue;
            }
            const oldEntry = old.propertyMap.get(key);
            if (oldEntry == null) {
                //new
                onNew(key);
                continue;
            }
            const thisEntry = this.propertyMap.get(key);
            if (shallodwEqual(oldEntry, thisEntry)) {
                continue;
            }
            //changed
            onChange(key);
        }
        if (old == null) {
            return;
        }
        for (const key of old.propertyMap.keys()) {
            if (!filter(key)) {
                continue;
            }
            if (this.propertyMap.has(key)) {
                continue;
            }
            onDelete(key);
        }
    }
    isEqual(otherMap, key) {
        const entry1 = this.propertyMap.get(key);
        const entry2 = otherMap.propertyMap.get(key);
        if (entry1 == null || entry2 == null) {
            return entry1 === entry2;
        }
        return shallodwEqual(entry1, entry2);
    }
    addAll(style, properties, defaultProperties, postTransformers) {
        traverseProperties(style, properties, defaultProperties, (p) => {
            for (const key in p) {
                this.add(key, p[key]);
            }
            for (const key in postTransformers) {
                const property = p[key];
                if (property == null) {
                    continue;
                }
                postTransformers[key](property, this);
            }
        });
    }
}
function shallodwEqual(a1, a2) {
    const length = a1.length;
    if (length != a2.length) {
        return false;
    }
    for (let i = 0; i < length; i++) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}
