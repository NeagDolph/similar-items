import { writable } from 'svelte/store';

export const image = writable({});
export const uploaded = writable(false);
export const preview = writable("");
export const uploadInProgress = writable(false);
export const category = writable("");
export const score = writable(0);

