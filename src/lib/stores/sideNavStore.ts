import { writable } from 'svelte/store';


export const sideNavOpen = writable<boolean>(false);

export const toggleSideNav = () => sideNavOpen.update(wasOpen => !wasOpen)