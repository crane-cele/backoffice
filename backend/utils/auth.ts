import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

interface CustomRequest extends Request {
  userId?: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'] as string;
  if (!token) {
    res.status(403).send({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(500).send({ message: 'Failed to authenticate token.' });
      return;
    }

    const payload = decoded as DecodedToken;
    req.userId = payload.id;
    next();
  });
};
