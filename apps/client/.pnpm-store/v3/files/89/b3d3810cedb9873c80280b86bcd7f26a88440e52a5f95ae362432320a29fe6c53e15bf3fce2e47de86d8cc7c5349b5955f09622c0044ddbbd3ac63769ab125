import { AllOptionalProperties, Properties, WithClasses } from './default.js';
export type PropertyTransformers = Record<string, (value: unknown, target: MergedProperties) => void>;
export declare class MergedProperties {
    private preTransformers?;
    private propertyMap;
    constructor(preTransformers?: PropertyTransformers | undefined);
    add(key: string, value: unknown): void;
    private addToMap;
    /**
     * @returns undefined if the property doesn't exist
     */
    read<T>(key: string, defaultValue: T): T;
    filterCompare(filter: (key: string) => boolean, old: MergedProperties | undefined, onNew: (key: string) => void, onChange: (key: string) => void, onDelete: (key: string) => void): void;
    isEqual(otherMap: MergedProperties, key: string): boolean;
    addAll(style: WithClasses<Properties> | undefined, properties: WithClasses<Properties> | undefined, defaultProperties: AllOptionalProperties | undefined, postTransformers: PropertyTransformers): void;
}
