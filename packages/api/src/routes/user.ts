import { Request, Response, Router } from 'express';
import { hash } from 'bcryptjs';

import User from '../models/user';
import { generateToken } from '../utils/auth';
import { userCreateSchema } from '@todoapp/shared/validation/user';

import { formatZodError, translateZodErrors } from '@todoapp/shared/utils/zod-utils';

const router = Router();

router.post('/create', async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).json({ message: 'Request body is missing or invalid.' });
        return;
    }

    const validation = await userCreateSchema.safeParseAsync(req.body);

    if (!validation.success) {
        const translated = translateZodErrors(validation.error);
        const errors = formatZodError(translated);

        res.status(400).json({
            message: 'Validation failed.',
            errors,
        });
        return;
    }

    const { name, email, password } = req.body;

    try {
        const emailInUse = await User.findOne({ email });

        if (emailInUse) {
            res.status(400).json({
                message: 'Request failed.',
                error: 'Provided email address is already in use.',
            });
            return;
        }

        const hashedPassword = await hash(password, process.env.PW_SALT as string);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const expiresInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
        const token = generateToken(
            { id: newUser.id, email: newUser.email, name: newUser.name },
            { expiresIn: expiresInMs }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'strict',
            maxAge: expiresInMs,
        });

        res.status(201).json({
            message: 'Registration successful.',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (e) {
        res.status(500).json({ message: 'Server error while creating user.' });
        return;
    }
});

export default router;
