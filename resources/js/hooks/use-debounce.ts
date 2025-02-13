import { useEffect, useState } from 'react';

/**
 * A hook that returns a debounced value that only updates after the specified delay.
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 *
 * useEffect(() => {
 *   // This effect will only run when debouncedSearch changes
 *   // instead of on every search change
 *   performSearch(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up the timeout to update the debounced value
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timeout if the value changes before the delay has passed
        // or if the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
