
import React, { useEffect, useRef, useState } from 'react';

const TRAIL_COUNT = 10;

const CustomCursor: React.FC = () => {
    const mainCursorRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<Array<HTMLDivElement | null>>([]);
    const points = useRef<{ x: number; y: number }[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    useEffect(() => {
        const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(touchCheck);
        if (touchCheck) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('no-touch-device');
        }
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const mainCursor = mainCursorRef.current;
        if (!mainCursor) return;
        
        points.current = [...Array(TRAIL_COUNT)].map(() => ({ x: 0, y: 0 }));
        
        const coords = { x: 0, y: 0 };
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animateDots = () => {
            let x = coords.x;
            let y = coords.y;

            mainCursor.style.transform = `translate3d(${x - mainCursor.offsetWidth / 2}px, ${y - mainCursor.offsetHeight / 2}px, 0)`;

            points.current.forEach((point, index) => {
                const nextPoint = points.current[index + 1] || points.current[index];
                
                point.x += (x - point.x) * 0.4;
                point.y += (y - point.y) * 0.4;

                x = point.x;
                y = point.y;
                
                const trailEl = trailRefs.current[index];
                if (trailEl) {
                    const scale = (TRAIL_COUNT - index) / TRAIL_COUNT;
                    trailEl.style.transform = `translate3d(${x - trailEl.offsetWidth / 2}px, ${y - trailEl.offsetHeight / 2}px, 0) scale(${scale})`;
                    trailEl.style.opacity = `${scale}`;
                }
            });

            animationFrameId = requestAnimationFrame(animateDots);
        };
        
        animateDots();
        
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, input, textarea, select, label, [role="button"]')) {
                mainCursor.classList.add('cursor-grow');
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
             if ((e.target as HTMLElement).closest('a, button, input, textarea, select, label, [role="button"]')) {
                mainCursor.classList.remove('cursor-grow');
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isTouchDevice]);

    if (isTouchDevice) {
        return null;
    }

    return (
        <>
            <div ref={mainCursorRef} className="custom-cursor__main" />
            {[...Array(TRAIL_COUNT)].map((_, i) => (
                <div key={i} ref={el => trailRefs.current[i] = el} className="custom-cursor__trail" />
            ))}
        </>
    );
};

export default CustomCursor;
