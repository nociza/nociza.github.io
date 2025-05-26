import { useState } from "react";

export interface CollapsibleState {
    [key: string]: boolean;
}

export function useCollapsibleSections(initialState: CollapsibleState) {
    const [state, setState] = useState<CollapsibleState>(initialState);

    const toggle = (key: string) => {
        setState(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const isOpen = (key: string) => state[key] || false;

    return {
        isOpen,
        toggle,
        state
    };
} 