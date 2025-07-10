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

interface RequestWithUser extends Request {
    user?: any;
}

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Access denied.', error: 'No token provided.' });
        return;
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Access denied.', error: 'Invalid token.' });
        return;
    }
};
