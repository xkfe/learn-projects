import styles from './index.module.scss';

function Modal({ children }) {
    console.log('children', children)
    return (
        <div className={[styles['modal'], styles[children?.show]].filter(Boolean).join(' ')} >
            <div className="modal-overlay" />
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">{children?.title}</h3>
                </div>
            </div>
        </div >
    )
}

export default Modal;