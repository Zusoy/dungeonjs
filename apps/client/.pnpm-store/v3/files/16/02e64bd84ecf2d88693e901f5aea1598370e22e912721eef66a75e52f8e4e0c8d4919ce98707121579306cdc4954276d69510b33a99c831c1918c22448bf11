import { effect, untracked } from '@preact/signals-core';
export function setupImmediateProperties(propertiesSignal, activeSignal, hasProperty, setProperty, subscriptions) {
    let active = false;
    let currentProperties;
    let propertySubscriptions = {};
    //the following 2 effects are seperated so that the cleanup call only happens when active changes from true to false
    //or everything is cleaned up because the component is destroyed
    subscriptions.push(effect(() => {
        const newProperties = propertiesSignal.value;
        if (active) {
            applyProperties(hasProperty, newProperties, currentProperties, propertySubscriptions, setProperty);
        }
        currentProperties = newProperties;
    }), effect(() => {
        active = activeSignal.value;
        if (!active) {
            return;
        }
        if (currentProperties == null) {
            return;
        }
        //(re-)write all current properties since the object is (re-)activiated it might not have its values set
        applyProperties(hasProperty, currentProperties, undefined, propertySubscriptions, setProperty);
        return () => {
            unsubscribeProperties(propertySubscriptions);
            propertySubscriptions = {};
        };
    }));
}
function applyProperties(hasProperty, currentProperties, oldProperties, subscriptions, setProperty) {
    const onNew = (key) => 
    //subscribe and write property
    (subscriptions[key] = effect(() => setProperty(key, currentProperties.read(key, undefined))));
    const onDelete = (key) => {
        //remove subscription
        subscriptions[key]?.();
        delete subscriptions[key];
        //read is fine since we execute the compare in "untracked"
        if (oldProperties.read(key, undefined) === undefined) {
            //no need to set to undefined if already was undefined
            return;
        }
        //reset property
        setProperty(key, undefined);
    };
    const onChange = (key) => {
        //unsubscribe old property
        subscriptions[key]?.();
        onNew(key);
    };
    untracked(() => currentProperties.filterCompare(hasProperty, oldProperties, onNew, onChange, onDelete));
}
function unsubscribeProperties(subscriptions) {
    for (const key in subscriptions) {
        subscriptions[key]();
    }
}
