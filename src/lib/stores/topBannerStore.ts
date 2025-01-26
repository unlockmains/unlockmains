import { writable } from 'svelte/store';

export const topBannerVisible = writable<boolean>(false);

export const toggleTopBannerVisible = () => topBannerVisible.update(wasOpen => !wasOpen)

export const hideTopBanner = () => {
    topBannerVisible.set(false)
}