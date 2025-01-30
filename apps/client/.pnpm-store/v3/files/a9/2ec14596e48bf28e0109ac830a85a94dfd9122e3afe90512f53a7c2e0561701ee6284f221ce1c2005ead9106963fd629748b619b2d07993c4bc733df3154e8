import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { convertParsedHtml, parseHtml, } from '@pmndrs/uikit/internals';
import { useMemo, useRef } from 'react';
import { DefaultProperties } from '../../default.js';
import { Container } from '../../container.js';
import { Input } from '../../input.js';
import { Text } from '../../text.js';
import { Svg } from '../../svg.js';
import { Image } from '../../image.js';
import { Video } from '../../video.js';
import { Icon } from '../../icon.js';
export function PreviewHtml({ children, colorMap, customHook, }) {
    const { classes, element } = useMemo(() => parseHtml(children, colorMap), [children, colorMap]);
    return _jsx(PreviewParsedHtml, { classes: classes, element: element, colorMap: colorMap, customHook: customHook });
}
export function PreviewParsedHtml({ classes, element, colorMap, componentMap, customHook, }) {
    return useMemo(() => {
        try {
            return convertParsedHtml(element, classes, createRenderElement(componentMap, customHook), colorMap, componentMap);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }, [element, classes, componentMap, colorMap, customHook]);
}
function createRenderElement(componentMap, customHook) {
    const Component = ({ custom, props, typeName, children, element, }) => {
        const ref = useRef(null);
        props = customHook?.(element, ref, props) ?? props;
        if (custom && componentMap != null) {
            const Component = componentMap[typeName].renderAsImpl;
            if (Component == null) {
                throw new Error(`unknown custom component "${typeName}"`);
            }
            return (_jsx(Component, { ...props, ref: ref, children: children }));
        }
        switch (typeName) {
            case 'Video':
                return _jsx(Video, { ...props, ref: ref });
            case 'Image':
                return (_jsx(Image, { ...props, ref: ref, children: children }));
            case 'Svg':
                return (_jsx(Svg, { ...props, ref: ref, children: children }));
            case 'Icon':
                return _jsx(Icon, { ...props, ref: ref });
            case 'Input':
                return _jsx(Input, { ...props, ref: ref });
            case 'Text':
                return (_jsx(Text, { ...props, ref: ref, children: children?.join('') ?? '' }));
            case 'Container':
                return (_jsx(Container, { ...props, ref: ref, children: children }));
            case 'DefaultProperties':
                return _jsx(DefaultProperties, { ...props, children: children });
            case 'Fragment':
                return _jsx(_Fragment, { children: children });
        }
    };
    return (element, typeName, custom, props, index, children) => (_jsx(Component, { element: element, custom: custom, props: props, typeName: typeName, children: children }, index));
}
