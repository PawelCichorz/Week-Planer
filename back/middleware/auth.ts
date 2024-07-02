import jwt,{ JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/user';

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

export async function refreshAccessToken(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
      return res.status(401).json({ error: 'Brak tokena odświeżania' });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);
    const user = await User.findById((decoded as JwtPayload).userId);

    if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ error: 'Nieprawidłowy token odświeżania' });
    }

    const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '30m' });
    res.json({ accessToken: newAccessToken });
} catch (error) {
    console.error(error);
    res.status(403).json({ error: 'Nieprawidłowy token odświeżania' });
}}
