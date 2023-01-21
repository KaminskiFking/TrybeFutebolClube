import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';

export default class userValid {
  public valid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {email, password } = req.body as IUser;
    console.log(email, password);
    if (!email) {
      const message = 'All fields must be filled';
      return res.status(400).json({ message });
    };
    if (!password && password.length > 6) {
      const message = 'All fields must be filled';
      return res.status(400).json({ message });
    };
    next();
  };
}
