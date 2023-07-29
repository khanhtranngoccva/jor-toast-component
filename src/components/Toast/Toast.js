import React from 'react';
import {
    AlertOctagon,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
};

function Toast({variant, children, handleClose}) {
    const Icon = ICONS_BY_VARIANT[variant];

    if (!Icon) {
        throw new Error(`Unrecognized variant ${variant}, expect variant of one of these types: ${Object.keys(ICONS_BY_VARIANT)}`);
    }

    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            <div className={styles.iconContainer}>
                <Icon size={24}/>
            </div>
            <p className={styles.content}>
                <VisuallyHidden>{variant.toUpperCase()} - </VisuallyHidden>
                {children}
            </p>
            <button
                className={styles.closeButton}
                onClick={() => {
                    handleClose?.();
                }}
                aria-label={"Dismiss message"}
                aria-live={"off"}
            >
                <X size={24} focusable={false}/>
            </button>
        </div>
    );
}

export default Toast;
