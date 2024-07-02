import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { URLSearchParams } from 'url';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure:false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function register(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const refreshToken = ''
    const newUser = new User({
        email,
        password,
        refreshToken
    });
    await newUser.save();
    res.send('zarejestrowano pomyślnie');
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user:any = await User.findOne({ email });

        if (!user) {
            console.log('Nie ma takiego użytkownika');
            return res.status(401).json({ error: 'Nie ma takiego emaila' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            console.log('Nieprawidłowe hasło');
            return res.status(401).json({ error: 'Nieprawidłowe hasło' });
        }
        
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
     
        user.refreshToken = refreshToken;
        await user.save();
        console.log('Zalogowano pomyślniea:');
        res.json({ message: 'Zalogowano pomyślnie', userId: user._id,accessToken,refreshToken });
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas logowania' });
    }
    
}

// export async function changePassword(req: Request, res: Response) {
//     const userId = req.user!.userId;
//     const { oldPassword, newPassword } = req.body;
//   console.log(oldPassword,newPassword)
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
//       }
  
//       const isValidPassword = await bcrypt.compare(oldPassword, user.password);
//       if (!isValidPassword) {
//         return res.status(401).json({ error: 'Nieprawidłowe stare hasło' });
//       }
  
//       user.password = newPassword
//     //   const hashedNewPassword = await bcrypt.hash(newPassword, 10);;
//       console.log(newPassword)
//       await user.save();
  
//       res.json({ message: 'Hasło zmienione pomyślnie' });
//     } catch (error) {
//       console.error('Błąd podczas zmiany hasła:', error);
//       res.status(500).json({ error: 'Wystąpił błąd podczas zmiany hasła' });
//     }
//   }


export async function changePassword(req: Request, res: Response) {
  console.log('Received request to change password');
  console.log('Query parameters:', req.query);
  console.log('Request body:', req.body);
  const tokenquery = req.query.token as string; 
  const { oldPassword, newPassword } = req.body;
  console.log(req.user!.userId)
  try {
      let user;

      if (tokenquery) {
          // Resetowanie hasła za pomocą tokenu
          const decoded: any = jwt.verify(tokenquery, process.env.JWT_SECRET!);
          user = await User.findById(decoded.userId);
      } else {
          // Zmiana hasła dla zalogowanego użytkownika
          const userId = req.user!.userId;
          user = await User.findById(userId);

          if (!user) {
              return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
          }

          const isValidPassword = await bcrypt.compare(oldPassword, user.password);
          if (!isValidPassword) {
              return res.status(401).json({ error: 'Nieprawidłowe stare hasło' });
          }
      }

      if (!user) {
          return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }

      user.password = newPassword
      await user.save();

      res.json({ message: 'Hasło zmienione pomyślnie' });
  } catch (error) {
      console.error('Błąd podczas zmiany hasła:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas zmiany hasła' });
  }
}

export async function sendResetPasswordEmail(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log(token)

    // Uwaga: Token jest teraz przekazywany przez parametr zapytania (query parameter)
    const resetLink = `http://localhost:3000/change-password?token=${token}`;

    const mailOptions = {
      to: email,
      subject: 'Resetowanie hasła',
      text: `Kliknij w poniższy link, aby zresetować hasło: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Błąd podczas wysyłania emaila resetującego hasło:', error);
        return res.status(500).json({ error: 'Wystąpił błąd podczas wysyłania emaila' });
      }
      console.log('Email resetujący hasło został wysłany');
      res.json({ message: 'Email resetujący hasło został wysłany' });
    });
  } catch (error) {
    console.error('Błąd podczas resetowania hasła:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas resetowania hasła' });
  }}