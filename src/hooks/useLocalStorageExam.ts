import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('Lỗi khi lấy dữ liệu từ localStorage', error);
			return initialValue;
		}
	});

	const saveValue = useCallback((newValue: T) => {
		setValue(prevValue => {
			if (JSON.stringify(prevValue) !== JSON.stringify(newValue)) {
				localStorage.setItem(key, JSON.stringify(newValue));
			}
			return newValue;
		});
	}, [key]);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, saveValue] as const;
}
