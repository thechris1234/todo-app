import { Request, Response, Router } from 'express';
import { hash } from 'bcryptjs';

import User from '../models/user';
import { generateToken } from '../utils/auth';

const router = Router();

router.post('/create', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const emailInUse = await User.findOne({ email });

        if (emailInUse) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await hash(password, process.env.PW_SALT as string);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(newUser._id);

        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while creating user', error });
    }
});

export default router;
