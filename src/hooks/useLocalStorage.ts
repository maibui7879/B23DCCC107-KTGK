import { useState, useEffect } from "react";

/**
 * Custom hook để lưu và lấy dữ liệu từ localStorage
 * @param key string - Khóa để lưu trữ trong localStorage
 * @param initialValue any - Giá trị mặc định nếu không có dữ liệu trong localStorage
 */
const useLocalStorage = <T,>(key: string, initialValue: T) => {
    // Lấy dữ liệu từ localStorage
    const getStoredValue = (): T => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ localStorage", error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    // Cập nhật localStorage khi giá trị thay đổi
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Lỗi khi lưu vào localStorage", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;