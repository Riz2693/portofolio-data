import { useSyncExternalStore } from "react";

export default function useIsMobile(breakpoint = 768) {
    const query = `(max-width: ${breakpoint - 1}px)`;

    const subscribe = (onStoreChange) => {
        if (typeof window === "undefined") {
            return () => { };
        }

        const mediaQuery = window.matchMedia(query);

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", onStoreChange);
            return () => mediaQuery.removeEventListener("change", onStoreChange);
        }

        mediaQuery.addListener(onStoreChange);
        return () => mediaQuery.removeListener(onStoreChange);
    };

    const getSnapshot = () => {
        if (typeof window === "undefined") {
            return false;
        }
        return window.matchMedia(query).matches;
    };

    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
