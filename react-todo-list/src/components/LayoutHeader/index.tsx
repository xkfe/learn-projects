import styles from './index.module.scss'
import { useTheme } from '@/hooks/useTheme';

function LayoutHeader() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className={styles.header}>
            <div className={styles['header-content']}>
                <div className={styles.logo}>
                    <h1 className={styles['app-title']}>TodoList</h1>
                    <span className={styles['app-subtitle']}>管理您的待办事项</span>
                </div>
                <button className={styles['theme-toggle']} id="themeToggle" onClick={toggleTheme}>
                    {theme === 'light' ? <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg> : <svg
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                    >
                        <g fill="none" fillRule="evenodd" transform="translate(-442 -200)">
                            <g fill="currentColor">
                                <path
                                    fillRule="nonzero"
                                    d="M108.5 72a6.5 6.5 0 11-13 0 6.5 6.5 0 1113 0zm-1.5 0a5 5 0 10-10 0 5 5 0 0010 0zm-6-11.25v2a.75.75 0 101.5 0v-2a.75.75 0 10-1.5 0zm-5.274 1.882l1.023 1.772a.75.75 0 001.298-.75l-1.023-1.772a.75.75 0 00-1.298.75zm-3.844 4.392l1.772 1.023a.75.75 0 00.75-1.298l-1.772-1.023a.75.75 0 00-.75 1.298zM90.75 73h2a.75.75 0 100-1.5h-2a.75.75 0 100 1.5zm1.882 5.274l1.772-1.023a.75.75 0 00-.75-1.298l-1.772 1.023a.75.75 0 00.75 1.298zm4.392 3.844l1.023-1.772a.75.75 0 00-1.298-.75l-1.023 1.772a.75.75 0 001.298.75zM103 83.25v-2a.75.75 0 10-1.5 0v2a.75.75 0 101.5 0zm5.274-1.882l-1.023-1.772a.75.75 0 10-1.298.75l1.023 1.772a.75.75 0 101.298-.75zm3.844-4.392l-1.772-1.023a.75.75 0 00-.75 1.298l1.772 1.023a.75.75 0 00.75-1.298zM113.25 71h-2a.75.75 0 100 1.5h2a.75.75 0 100-1.5zm-1.882-5.274l-1.772 1.023a.75.75 0 00.75 1.298l1.772-1.023a.75.75 0 00-.75-1.298zm-4.392-3.844l-1.023 1.772a.75.75 0 001.298.75l1.023-1.772a.75.75 0 00-1.298-.75z"
                                    stroke="currentColor"
                                    strokeWidth={0.25}
                                    transform="translate(356 144)"
                                />
                                <path
                                    d="M101.612 71.137c0-.782.263-1.494.725-2.043.192-.228.056-.585-.243-.592l-.046-.001c-1.89-.026-3.506 1.53-3.547 3.42a3.5 3.5 0 005.579 2.893c.238-.177.156-.551-.132-.624-1.356-.344-2.336-1.583-2.336-3.053"
                                    transform="translate(356 144)"
                                />
                            </g>
                            <path d="M444 228L468 228 468 204 444 204z" />
                        </g>
                    </svg>
                    }
                </button>
            </div>
        </header>
    )
}

export default LayoutHeader;