import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { CustomRequest } from "../utils/CustomRequest"

export const auth = async (
    req: CustomRequest,
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization header missing or malformed' });
            return;
        }

        const token = authHeader.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, process.env.jwt_secret || "") as { id: string };
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}