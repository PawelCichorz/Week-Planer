import { Request, Response } from 'express';
import User from '../models/user';


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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new Error('Nie ma takiego emaila');
    }
    const isValidPassword = await user.comparePassword(req.body.password);

    if (!isValidPassword) {
        throw new Error('Nieprawidłowe hasło');
    }

    req.session.user = {
        _id: user._id,
        email: user.email
    };
    res.send('')}