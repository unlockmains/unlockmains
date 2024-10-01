import { onMount } from 'svelte';
import { readable, writable } from 'svelte/store';

export const sideNavOpen = writable<boolean>(false);

export const toggleSideNav = () => sideNavOpen.update(wasOpen => !wasOpen)

export const alwaysShow = readable(false, set => {
    const updateAlwaysShow = () => {
        const isLargeScreen = window.innerWidth > 960;
        set(isLargeScreen);
    };

    updateAlwaysShow();
    
    onMount(() => {
        window.addEventListener('resize', updateAlwaysShow);

        return () => {
            window.removeEventListener('resize', updateAlwaysShow);
        };
    })
    
});