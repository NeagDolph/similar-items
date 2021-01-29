import { writable } from 'svelte/store';

export const image = writable({});
export const uploaded = writable(false);
export const preview = writable("");
export const uploadInProgress = writable(false);
