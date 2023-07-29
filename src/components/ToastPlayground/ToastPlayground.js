import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from "../Toast";
import ToastContext from "../ToastProvider";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPreview({message, variant, open, setOpen}) {
    if (!open) return null;

    return <div className={styles.preview}>
        <span className={styles.previewDescription}>Preview</span>
        <Toast variant={variant} handleClose={e => {
            setOpen(false);
        }}>{message}</Toast>
    </div>
}

function ToastPlayground() {
    const instanceId = React.useId();
    const [duration, setDuration] = React.useState();
    const [message, setMessage] = React.useState('');
    const [curVariant, setCurVariant] = React.useState(VARIANT_OPTIONS[0]);
    const [previewActive, setPreviewActive] = React.useState(false);
    const {addToast} = React.useContext(ToastContext);

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/toast.png"/>
                <h1>Toast Playground</h1>
            </header>

            <form className={styles.controlsWrapper} onChange={e => {
                setPreviewActive(true);
            }} onSubmit={e => {
                e.preventDefault();
                addToast({
                    message: message,
                    variant: curVariant,
                    duration: duration,
                })
            }}>
                <div className={styles.row}>
                    <label
                        htmlFor={`${instanceId}-message`}
                        className={styles.label}
                        style={{alignSelf: 'baseline'}}
                    >
                        Message
                    </label>
                    <div className={styles.inputWrapper}>
                        <textarea id={`${instanceId}-message`} value={message} onChange={e => {
                            setMessage(e.currentTarget.value);
                        }} className={styles.messageInput}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}>Variant</div>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        {VARIANT_OPTIONS.map(option => {
                            return <label htmlFor={`${instanceId}-variant-${option}`} key={option}>
                                <input
                                    id={`${instanceId}-variant-${option}`}
                                    type="radio"
                                    name="variant"
                                    value={option}
                                    checked={option === curVariant}
                                    onChange={e => {
                                        setCurVariant(e.currentTarget.value);
                                    }}
                                />
                                {option}
                            </label>
                        })}
                    </div>
                </div>

                <div className={styles.row}>
                    <label
                        htmlFor={`${instanceId}-duration`}
                        className={styles.label}
                        style={{alignSelf: 'baseline'}}
                    >
                        Duration
                    </label>
                    <div className={styles.inputWrapper}>
                        <input id={`${instanceId}-duration`} type={"number"} value={duration ?? ''} onChange={e => {
                            if (e.currentTarget.value) {
                                setDuration(e.currentTarget.value);
                            } else {
                                setDuration(undefined);
                            }
                        }} className={styles.durationInput}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}/>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        <Button>Pop Toast!</Button>
                    </div>
                </div>
            </form>

            <ToastPreview open={previewActive} setOpen={setPreviewActive} message={message}
                          variant={curVariant}></ToastPreview>
        </div>
    );
}

export default ToastPlayground;
