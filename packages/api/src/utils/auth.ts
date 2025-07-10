import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (payload: object, options: SignOptions): string => {
    return sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
};

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token missing or malformed.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token) as { userId: string };

        if (!decoded?.userId) {
            res.status(401).json({ message: 'Invalid token payload.' });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid or expired token.' });
        return;
    }
};
