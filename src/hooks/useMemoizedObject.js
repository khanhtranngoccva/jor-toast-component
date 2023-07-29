import React from "react";

export function useMemoizedObject(object) {
    return React.useMemo(() => {
        return object
    }, [...Object.values(object)]);
}
