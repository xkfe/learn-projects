import { useState, useEffect } from 'react';

export const useTheme = () => {
    const isCSR = typeof window !== 'undefined';

    const [theme, setThemeState] = useState<'light' | 'dark'>((isCSR ? localStorage.getItem('theme') as 'light' | 'dark' : 'dark'));

    const setTheme = (newTheme: 'light' | 'dark') => {
        // 更新状态
        setThemeState(newTheme);

        // 同步到 localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);

            // 操作 html 元素
            const html = window.document.documentElement;
            if (newTheme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        if (isCSR) {
            const html = window.document.documentElement;
            if (theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    }, [theme, isCSR]);

    return { theme, setTheme };
}