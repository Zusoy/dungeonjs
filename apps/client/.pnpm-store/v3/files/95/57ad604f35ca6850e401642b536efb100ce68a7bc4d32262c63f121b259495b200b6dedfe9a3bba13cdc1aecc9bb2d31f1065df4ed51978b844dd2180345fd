import { createContext, useContext } from 'react';
const ParentContext = createContext(undefined);
export function useParent() {
    const parent = useContext(ParentContext);
    if (parent == null) {
        throw new Error(`Cannot be used outside of a uikit component.`);
    }
    return parent;
}
export const ParentProvider = ParentContext.Provider;
