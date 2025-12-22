import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './index.module.scss';

function LayoutAside() {
    const [filterActiveIndex, setFilterActiveIndex] = useState(0);
    const [filterData] = useState([
        { filterText: '全部', filterValue: 3 },
        { filterText: '待完成', filterValue: 2 },
        { filterText: '已完成', filterValue: 1 }
    ])
    const [priorityChecked, setPriorityChecked] = useState<Array<string>>([]);
    const priorityData = [
        { priorityText: '高优先级', colorClass: 'high' },
        { priorityText: '中优先级', colorClass: 'medium' },
        { priorityText: '低优先级', colorClass: 'low' }
    ]
    function onPriorityChecked(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (!priorityChecked.includes(value)) {
            setPriorityChecked([...priorityChecked, value])
        } else {
            setPriorityChecked(checked => checked.filter(item => item !== value))
        }
    }
    useEffect(() => {
        console.log('priorityChecked', priorityChecked)
    }, [priorityChecked])

    return <aside className={styles['sidebar']}>
        <div className={styles['sidebar-content']}>
            <section className={styles['search-box']}>
                <div className={styles['search-input-container']}>
                    <svg className={styles['search-icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input type="text" className={styles['search-input']} placeholder="搜索任务..." />
                </div>
            </section>
            <section className={styles['filter-section']}>
                <h3 className={styles['filter-title']}>筛选</h3>
                <div className={styles['filter-options']}>
                    {filterData.map((item, index) => {
                        return (
                            <button key={index} className={[styles['filter-btn'], filterActiveIndex === index ? styles['active'] : ''].filter(Boolean).join(' ')} onClick={() => setFilterActiveIndex(index)}>
                                <span className={styles['filter-text']}>{item.filterText}</span>
                                <span className={styles['filter-count']}>{item.filterValue}</span>
                            </button>)
                    })}
                </div>
            </section>
            <section className={styles['priority-filter']}>
                <h3 className={styles['filter-title']}>优先级</h3>
                <div className={styles['priority-options']}>
                    {priorityData.map((item, index) => {
                        return (
                            <label key={index} className={styles['priority-option']}>
                                <input type="checkbox" className={styles['priority-checkbox']} value={item.colorClass} onChange={onPriorityChecked} />
                                <span className={[styles['priority-indicator'], styles[item.colorClass]].join(' ')}></span>
                                <span className={styles['priority-text']}>{item.priorityText}</span>
                            </label>
                        )
                    })}
                </div>
            </section>
            <section className={styles['stats-panel']}>
                <h3 className={styles['stats-title']}>统计</h3>
                <div className={styles['stats-grid']}>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-value']}>3</div>
                        <div className={styles['stat-label']}>总任务</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-value']}>1</div>
                        <div className={styles['stat-label']}>已完成</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-value']}>33%</div>
                        <div className={styles['stat-label']}>完成率</div>
                    </div>
                </div>
            </section>
        </div>
    </aside>
}

export default LayoutAside