import { convertParsedHtml, parseHtml } from '@pmndrs/uikit/internals';
import { format } from 'prettier/standalone';
import babel, * as starBabel from 'prettier/plugins/babel.js';
import estree, * as starEstree from 'prettier/plugins/estree.js';
export { ConversionNode, ConversionHtmlNode } from '@pmndrs/uikit/internals';
export function htmlToCode(html, colorMap, componentMap) {
    const { classes, element } = parseHtml(html, colorMap);
    return parsedHtmlToCode(element, classes, colorMap, componentMap);
}
export function parsedHtmlToCode(element, classes, colorMap, componentMap) {
    return format(`export default function Index() { return ${convertParsedHtml(element, classes, elementToCode, colorMap, componentMap) ?? `null`} }`, {
        parser: 'babel',
        plugins: [babel ?? starBabel, estree ?? starEstree],
        semi: false,
    });
}
function elementToCode(element, typeName, custom, props, index, children) {
    const propsText = Object.entries(props)
        .filter(([, value]) => typeof value != 'undefined')
        .map(([name, value]) => {
        const firstChar = name[0];
        if ('0' <= firstChar && firstChar <= '9') {
            return `{...${JSON.stringify({ [name]: value })}}`;
        }
        if (name === 'panelMaterialClass' && typeof value === 'function') {
            return `${name}={${value.name}}`;
        }
        switch (typeof value) {
            case 'number':
                return `${name}={${value}}`;
            case 'string':
                if (value.includes('\n')) {
                    return `${name}={\`${value.replaceAll('`', '\\`')}\`}`;
                }
                return `${name}="${value.replaceAll('"', "'")}"`;
            case 'boolean':
                return `${name}={${value ? 'true' : 'false'}}`;
            case 'object':
                return `${name}={${JSON.stringify(value)}}`;
        }
        throw new Error(`unable to generate property "${name}" with value of type "${typeof value}"`);
    })
        .join(' ');
    if (children == null) {
        return `<${typeName} ${propsText} />`;
    }
    if (typeName === 'Fragment') {
        typeName = '';
    }
    return `<${typeName} ${propsText} >${children.join('\n')}</${typeName}>`;
}
export { conversionPropertyTypes, MetalMaterial, GlassMaterial, PlasticMaterial, } from '@pmndrs/uikit/internals';
export * from './preview.js';
