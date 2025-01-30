export type WithAliases<T, A extends Record<string, ReadonlyArray<unknown>>> = T & {
    [K in keyof A as A[K][number] extends keyof T ? K : never]?: A[K][number] extends keyof T ? T[A[K][number]] : never;
};
export type WithAllAliases<T> = WithAliases<T, AllAliases>;
declare const flexAliases: {
    readonly inset: readonly ["positionTop", "positionLeft", "positionRight", "positionBottom"];
    readonly padding: readonly ["paddingBottom", "paddingTop", "paddingLeft", "paddingRight"];
    readonly paddingX: readonly ["paddingLeft", "paddingRight"];
    readonly paddingY: readonly ["paddingTop", "paddingBottom"];
    readonly margin: readonly ["marginBottom", "marginTop", "marginLeft", "marginRight"];
    readonly marginX: readonly ["marginLeft", "marginRight"];
    readonly marginY: readonly ["marginTop", "marginBottom"];
    readonly gap: readonly ["gapRow", "gapColumn"];
    readonly borderWidth: readonly ["borderBottomWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth"];
    readonly borderXWidth: readonly ["borderLeftWidth", "borderRightWidth"];
    readonly borderYWidth: readonly ["borderTopWidth", "borderBottomWidth"];
};
declare const panelAliases: {
    readonly borderRadius: readonly ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"];
    readonly borderTopRadius: readonly ["borderTopLeftRadius", "borderTopRightRadius"];
    readonly borderLeftRadius: readonly ["borderTopLeftRadius", "borderBottomLeftRadius"];
    readonly borderRightRadius: readonly ["borderTopRightRadius", "borderBottomRightRadius"];
    readonly borderBottomRadius: readonly ["borderBottomLeftRadius", "borderBottomRightRadius"];
};
declare const scrollbarAliases: {
    readonly scrollbarBorderRadius: readonly ["scrollbarBorderTopLeftRadius", "scrollbarBorderTopRightRadius", "scrollbarBorderBottomLeftRadius", "scrollbarBorderBottomRightRadius"];
    readonly scrollbarBorderTopRadius: readonly ["scrollbarBorderTopLeftRadius", "scrollbarBorderTopRightRadius"];
    readonly scrollbarBorderLeftRadius: readonly ["scrollbarBorderTopLeftRadius", "scrollbarBorderBottomLeftRadius"];
    readonly scrollbarBorderRightRadius: readonly ["scrollbarBorderTopRightRadius", "scrollbarBorderBottomRightRadius"];
    readonly scrollbarBorderBottomRadius: readonly ["scrollbarBorderBottomLeftRadius", "scrollbarBorderBottomRightRadius"];
    readonly scrollbarBorderWidth: readonly ["scrollbarBorderBottomWidth", "scrollbarBorderTopWidth", "scrollbarBorderLeftWidth", "scrollbarBorderRightWidth"];
    readonly scrollbarBorderXWidth: readonly ["scrollbarBorderLeftWidth", "scrollbarBorderRightWidth"];
    readonly scrollbarBorderYWidth: readonly ["scrollbarBorderTopWidth", "scrollbarBorderBottomWidth"];
};
declare const caretAliases: {
    readonly caretBorderRadius: readonly ["caretBorderTopLeftRadius", "caretBorderTopRightRadius", "caretBorderBottomLeftRadius", "caretBorderBottomRightRadius"];
    readonly caretBorderTopRadius: readonly ["caretBorderTopLeftRadius", "caretBorderTopRightRadius"];
    readonly caretBorderLeftRadius: readonly ["caretBorderTopLeftRadius", "caretBorderBottomLeftRadius"];
    readonly caretBorderRightRadius: readonly ["caretBorderTopRightRadius", "caretBorderBottomRightRadius"];
    readonly caretBorderBottomRadius: readonly ["caretBorderBottomLeftRadius", "caretBorderBottomRightRadius"];
    readonly caretBorderWidth: readonly ["caretBorderBottomWidth", "caretBorderTopWidth", "caretBorderLeftWidth", "caretBorderRightWidth"];
    readonly caretBorderXWidth: readonly ["caretBorderLeftWidth", "caretBorderRightWidth"];
    readonly caretBorderYWidth: readonly ["caretBorderTopWidth", "caretBorderBottomWidth"];
};
declare const selectionAliases: {
    readonly selectionBorderRadius: readonly ["selectionBorderTopLeftRadius", "selectionBorderTopRightRadius", "selectionBorderBottomLeftRadius", "selectionBorderBottomRightRadius"];
    readonly selectionBorderTopRadius: readonly ["selectionBorderTopLeftRadius", "selectionBorderTopRightRadius"];
    readonly selectionBorderLeftRadius: readonly ["selectionBorderTopLeftRadius", "selectionBorderBottomLeftRadius"];
    readonly selectionBorderRightRadius: readonly ["selectionBorderTopRightRadius", "selectionBorderBottomRightRadius"];
    readonly selectionBorderBottomRadius: readonly ["selectionBorderBottomLeftRadius", "selectionBorderBottomRightRadius"];
    readonly selectionBorderWidth: readonly ["selectionBorderBottomWidth", "selectionBorderTopWidth", "selectionBorderLeftWidth", "selectionBorderRightWidth"];
    readonly selectionBorderXWidth: readonly ["selectionBorderLeftWidth", "selectionBorderRightWidth"];
    readonly selectionBorderYWidth: readonly ["selectionBorderTopWidth", "selectionBorderBottomWidth"];
};
declare const transformAliases: {
    readonly transformScale: readonly ["transformScaleX", "transformScaleY", "transformScaleZ"];
};
export type AllAliases = typeof flexAliases & typeof panelAliases & typeof scrollbarAliases & typeof transformAliases & typeof caretAliases & typeof selectionAliases;
export declare const allAliases: AllAliases;
export {};
