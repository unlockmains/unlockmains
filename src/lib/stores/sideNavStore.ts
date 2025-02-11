import { onMount } from 'svelte';
import { readable, writable } from 'svelte/store';

export const sideNavOpen = writable<boolean>(false);

export const toggleSideNav = () => sideNavOpen.update(wasOpen => !wasOpen)

export const sideNavCollapse = writable<boolean>(false);

export const toggleCollapseSideNav = () => sideNavCollapse.update(wasCollapsed => !wasCollapsed)

export const alwaysShow = readable(false, set => {
    let isLargeScreen = false;
    const updateAlwaysShow = () => {
        if (typeof window !== 'undefined') {
            isLargeScreen = window.innerWidth > 960;
        }
        set(isLargeScreen);
    };

    onMount(updateAlwaysShow);

    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateAlwaysShow);
    }

    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateAlwaysShow);
        }
    };

});