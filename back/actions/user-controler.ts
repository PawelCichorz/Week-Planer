import { Request, Response } from 'express';
import User from '../models/user';

import { Session, SessionData } from 'express-session';

declare module 'express-session' {
    interface SessionData {
      userId?: string;
      email?: string;
    }
  }

export async function register(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email,
        password
    });
    await newUser.save();
    res.send('zarejestrowano pomyślnie');
}

export async function login(req: Request, res: Response) {
    try {
        const user:any = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log('Nie ma takiego użytkownika');
            return res.status(401).json({ error: 'Nie ma takiego emaila' });
        }

        const isValidPassword = await user.comparePassword(req.body.password);
        if (!isValidPassword) {
            console.log('Nieprawidłowe hasło');
            return res.status(401).json({ error: 'Nieprawidłowe hasło' });
        }
        
        req.session.userId = user._id
       
        await req.session.save();
    
        console.log('Zalogowano pomyślniea:', req.session.id);
        res.json({ message: 'Zalogowano pomyślnie', email: user._id });
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas logowania' });
    }
}