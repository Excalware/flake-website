import data from './data';
import { derived, writable } from 'svelte/store';

export const locale = writable('en-US');
export const locales = Object.keys(data);

export type Values = Iterable<any> | Record<string, any>
export function translate(locale: string, key: string, values: Values) {
	let text = data[locale][key];
	if (typeof text !== 'string')
		return key;

	text = text.replaceAll(/{(.*)}/g, (t, k) => (values as any)[k] ?? t);
	text = text.replaceAll(/\$\((.*)\)/g, (_, p1) => {
		const [key, values] = p1.split(', ');
		return translate(locale, key, values);
	});

	return text;
}

export const t = derived(locale, ($locale) => (key: string, vars: Values = []) =>
	translate($locale, key, vars)
);