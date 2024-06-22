import jwt,{ JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
declare module 'express' {
    interface Request {
      user?: JwtPayload & { userId: string }; // Używamy rozszerzenia JwtPayload
    }
  }

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Nieprawidłowy token JWT' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Nieprawidłowy token JWT' });
        }
        const jwtPayload = decoded as JwtPayload;

  
   
        req.user = {
            userId: jwtPayload.userId,
            email: jwtPayload.email,
          };
        next();
    });
};

