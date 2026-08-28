import { useEffect, useRef } from 'react';

interface SwipeHandlers {
    onSwipeRight?: () => void;
    onSwipeLeft?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
}

export function useSwipe(handlers: SwipeHandlers) {
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const handlersRef = useRef(handlers);
    const minSwipeDistance = 50;

    useEffect(() => {
        handlersRef.current = handlers;
    }, [handlers]);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if ((e.target as HTMLElement | null)?.closest("a, button, input, textarea, select")) {
                touchStartRef.current = null;
                return;
            }
            const touch = e.touches[0];
            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
            };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStartRef.current) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;

            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // Determine if this is a horizontal or vertical swipe
            if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
                // Horizontal swipe
                if (deltaX > 0) {
                    handlersRef.current.onSwipeRight?.();
                } else {
                    handlersRef.current.onSwipeLeft?.();
                }
            } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
                // A downward finger motion reveals the previous section; an
                // upward finger motion advances to the next one.
                if (deltaY > 0) {
                    handlersRef.current.onSwipeUp?.();
                } else {
                    handlersRef.current.onSwipeDown?.();
                }
            }

            touchStartRef.current = null;
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
}
