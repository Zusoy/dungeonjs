import { computed, signal } from '@preact/signals-core';
import { createConditionalPropertyTranslator } from './utils.js';
const queryList = typeof matchMedia === 'undefined' ? undefined : matchMedia?.('(prefers-color-scheme: dark)');
const symstemIsDarkMode = signal(queryList?.matches ?? false);
queryList?.addEventListener('change', (event) => (symstemIsDarkMode.value = event.matches));
const preferredColorScheme = signal('system');
export const isDarkMode = computed(() => {
    switch (preferredColorScheme.value) {
        case 'system':
            return symstemIsDarkMode.value;
        case 'dark':
            return true;
        case 'light':
            return false;
    }
});
export function setPreferredColorScheme(scheme) {
    preferredColorScheme.value = scheme;
}
export function getPreferredColorScheme() {
    return preferredColorScheme.peek();
}
export const darkPropertyTransformers = {
    dark: createConditionalPropertyTranslator(() => isDarkMode.value),
};
export function basedOnPreferredColorScheme({ dark, light, }) {
    const result = {};
    for (const key in dark) {
        result[key] = computed(() => (isDarkMode.value ? dark[key] : light[key]));
    }
    return result;
}
