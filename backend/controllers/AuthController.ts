import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, createUser, getUserByEmail, updateUserVerification, hashPassword, verifyPassword } from '../models/User';
import { sendVerificationEmail } from '../services/EmailServices';
import { config } from '../config/config';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { hash, salt } = hashPassword(password);
    const newUser: User = {
      id: Date.now().toString(),
      email,
      passwordHash: hash,
      passwordSalt: salt,
      verified: false,
      segments: [],
    };

    await createUser(newUser);

    const token = jwt.sign({ id: newUser.id }, config.jwtSecret, { expiresIn: '24h' });
    await sendVerificationEmail(email, token);

    res.status(200).send({ message: 'User registered successfully! Please check your email to confirm.' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      res.status(401).send({ message: 'Invalid email or password.' });
      return;
    }

    if (!user.verified) {
      res.status(401).send({ message: 'Please verify your email first.' });
      return;
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '24h' });
    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const confirmEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const decoded: any = jwt.verify(token, config.jwtSecret);
    await updateUserVerification(decoded.id);
    res.status(200).send({ message: 'Email confirmed successfully!' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};