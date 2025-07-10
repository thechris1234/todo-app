import express, { Request, Response } from 'express';

import Task from '../models/task';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

interface AuthenticatedRequest extends Request {
    userId?: string;
}

router.get('/', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

export default router;
