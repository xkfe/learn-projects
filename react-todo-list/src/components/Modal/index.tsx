import type { PropsWithChildren } from 'react'
import styles from './index.module.scss';

interface ModelProps {
    show: boolean,
    toggleModal: () => void,
    headerTitle: string,
}

function Modal({ show, toggleModal, headerTitle, headerSlot, children }: PropsWithChildren<ModelProps>) {
    return (
        <div className={[styles['modal'], show ? styles['show'] : ''].filter(Boolean).join(' ')} onClick={toggleModal}>
            <div className={styles['modal-content']}>
                <div className={styles['modal-header']}>
                    {headerSlot}
                    <h3 className={styles['modal-title']}>{headerTitle}</h3>
                </div>
                {children}
            </div>
        </div >
    )
}

export default Modal;