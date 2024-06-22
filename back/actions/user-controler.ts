import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



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
        
        
       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15s' });
    
        console.log('Zalogowano pomyślniea:');
        res.json({ message: 'Zalogowano pomyślnie', userId: user._id,token });
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas logowania' });
    }
}