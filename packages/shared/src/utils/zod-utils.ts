import { formatError, ZodError } from 'zod';
import i18n from '../localization';

export function translateZodErrors(error: ZodError) {
    return {
        ...error,
        issues: error.issues.map((issue) => ({
            ...issue,
            message: i18n.t(issue.message, { lng: 'us' }),
        })),
    };
}

export const formatZodError = (error: ZodError) => {
    return formatError(error);
};

export { ZodError };
