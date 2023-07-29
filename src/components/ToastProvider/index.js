import useToasts from "../../hooks/useToasts";
import ToastShelf from "../ToastShelf";
import React from "react";
import useKeydown from "../../hooks/useKeydown";

const ToastContext = React.createContext({
    addToast: () => {}
});

export default ToastContext;

export function ToastProvider({children}) {
    const {toasts, addToast, clearToasts} = useToasts();
    useKeydown("Escape", clearToasts);
    const values = React.useMemo(() => {
        return {
            addToast
        };
    }, [addToast]);

    return <ToastContext.Provider value={values}>
        <ToastShelf toasts={toasts}></ToastShelf>
        {children}
    </ToastContext.Provider>
}
