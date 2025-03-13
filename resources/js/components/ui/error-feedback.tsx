import { HTMLAttributes } from 'react';

export default function ErrorFeedback({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={
                'text-center text-sm text-balance text-red-600 dark:text-red-400 ' +
                className
            }
        >
            {message}
        </p>
    ) : null;
}
