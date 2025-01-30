import { ColorRepresentation } from '../../utils.js';
export type ConversionPropertyType = Array<string | Array<string>>;
export type ConversionPropertyTypes = Array<Record<string, ConversionPropertyType>> | Record<string, ConversionPropertyType>;
export type ConversionColorMap = Record<string, ColorRepresentation | (() => ColorRepresentation)>;
export declare function isInheritingProperty(key: string): boolean;
export declare function convertProperties(propertyTypes: ConversionPropertyTypes, properties: Record<string, string>, colorMap: ConversionColorMap | undefined, convertKey?: (key: string) => string): Record<string, unknown> | undefined;
export declare function convertProperty(propertyTypes: ConversionPropertyTypes, key: string, value: string, colorMap: ConversionColorMap | undefined): boolean | string | number | ColorRepresentation | undefined;
export declare function toNumber(value: string): number | undefined;
