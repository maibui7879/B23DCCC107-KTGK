import { useState, useEffect } from 'react';

// 📌 Định nghĩa kiểu dữ liệu
export type Subject = { id: string; name: string };
export type StudySession = { id: string; subjectId: string; date: string; duration: number; content: string };
export type StudyGoal = { id: string; month: string; subjectId: string; targetHours: number; completedHours: number };

// 📌 Custom hook để lưu trữ dữ liệu vào localStorage
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

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
