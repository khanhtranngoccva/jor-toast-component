import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({toasts}) {
    return (
        <ol className={styles.wrapper} role={"region"} aria-live={"polite"} aria-label={"Notification"}>
            {toasts.map(toast => {
                return <li className={styles.toastWrapper} key={toast.id}>
                    <Toast variant={toast.variant} handleClose={toast.remove}>{toast.message}</Toast>
                </li>
            })}
        </ol>
    );
}

export default ToastShelf;
