import { z } from 'zod';

export const userCreateSchema = z
    .object({
        name: z.string().min(3, 'auth.input.error.nameLength'),
        email: z.email('auth.input.error.invalidEmail'),
        password: z.string().min(10, 'auth.input.error.passwordLength'),
        confirmPassword: z.string('auth.input.error.confirmPasswordMissing'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'auth.input.error.passwordMatch',
        path: ['confirmPassword'],
    });
