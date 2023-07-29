import React from "react";

export default function useKeydown(code, callback) {
    React.useEffect(() => {
        function handleKeydown(e) {
            if (e.code === code) {
                callback();
            }
        }
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [code, callback]);
}
