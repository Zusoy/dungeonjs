export function traverseProperties(style, properties, defaultProperties, fn) {
    if (defaultProperties != null) {
        traverseClasses(defaultProperties.classes, fn);
        fn(defaultProperties);
    }
    if (properties != null) {
        traverseClasses(properties.classes, fn);
        fn(properties);
    }
    if (style != null) {
        traverseClasses(style.classes, fn);
        fn(style);
    }
}
function traverseClasses(classes, fn) {
    if (classes == null) {
        return;
    }
    if (!Array.isArray(classes)) {
        fn(classes);
        return;
    }
    const classesLength = classes.length;
    for (let i = 0; i < classesLength; i++) {
        fn(classes[i]);
    }
    return;
}
