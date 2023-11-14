import { derived, get, writable } from "svelte/store";
import translations from "./translations";

export const locale = writable("de");
export const locales = Object.keys(translations);

export function translate(key: string, lang = get(locale), vars: any = {}) {
  if (!key) throw new Error("no key provided to $t()");

  if(!translations || !translations[lang]){return key}
  let text = translations[lang][key]
  if (!text) return key;
  return text;
}

export const _ = derived(locale, ($locale) => (key: string, vars = {}) =>
  translate(key, $locale, vars)
);

