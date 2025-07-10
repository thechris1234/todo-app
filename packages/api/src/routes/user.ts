import { Request, Response, Router } from 'express';
import { hash } from 'bcryptjs';

import User from '../models/user';
import { generateToken } from '../utils/auth';

const router = Router();

router.post('/create', async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).json({ message: 'Request body is missing or invalid.' });
        return;
    }

    const { name, email, password } = req.body;

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if (missingFields.length > 0) {
        res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}.` });
        return;
    }

    try {
        const emailInUse = await User.findOne({ email });

        if (emailInUse) {
            res.status(400).json({ message: 'Email already in use.' });
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
        console.error('[API - Error]:', e);
        res.status(500).json({ message: 'Server error while creating user.' });
        return;
    }
});

export default router;
