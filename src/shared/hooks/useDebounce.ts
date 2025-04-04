import { useEffect, useState } from 'react';

/**
 * Хук, который создает дебаунсированную версию значения
 * @param value - исходное значение
 * @param delay - задержка в миллисекундах
 * @returns дебаунсированное значение
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
} 