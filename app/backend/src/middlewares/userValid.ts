import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';

export default class userValid {
  public valid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body as IUser;
    if (!email) {
      const message = 'All fields must be filled';
      return res.status(400).json({ message });
    }
    if (!password) {
      const message = 'All fields must be filled';
      return res.status(400).json({ message });
    }
    if (password.length < 6) {
      const smallPassword = 'Password must be more than 6 characters';
      return res.status(400).json({ smallPassword });
    }
    next();
  };
}
