import React from "react";
import {useMemoizedObject} from "./useMemoizedObject";

export default function useToasts() {
    const [toasts, setToasts] = React.useState({});

    const addToast = React.useCallback(({
        message, variant, duration=5000,
    }) => {
        const newToastId = crypto.randomUUID();
        const newToast = {
            id: newToastId,
            message,
            variant,
            remove() {
                setToasts(curToasts => {
                   const newToasts = {...curToasts};
                   delete newToasts[newToastId];
                   return newToasts;
                });
            }
        };
        if (duration) {
            setTimeout(() => newToast.remove(), duration);
        }
        setToasts(curToasts => {
            return {
                ...curToasts,
                [newToastId]: newToast,
            };
        })
    }, []);

    const clearToasts = React.useCallback(() => {
        setToasts({});
    }, []);

    const toastArray = React.useMemo(() => {
        return Object.values(toasts);
    }, [toasts]);

    return useMemoizedObject({toasts: toastArray, addToast, clearToasts});
}
