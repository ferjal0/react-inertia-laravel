import React, { ComponentPropsWithoutRef, CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface RippleProps extends ComponentPropsWithoutRef<'div'> {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    className,
    ...props
}: RippleProps) {
    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] select-none',
                className,
            )}
            {...props}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className={`[--i: animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl${i}]`}
                        style={
                            {
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity,
                                animationDelay,
                                borderStyle,
                                borderWidth: '1px',
                                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) scale(1)',
                            } as CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
});

Ripple.displayName = 'Ripple';
