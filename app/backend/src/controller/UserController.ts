import { Request, Response } from 'express';
import UserService from '../services/UserServices';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, token, message } = await this.userService.login(email, password);
    if (message) {
      return res.status(status).json({ message });
    }
    res.status(status).json({ token });
  };

  public validateLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { status, role } = await this.userService.validateLogin(token as string);
    return res.status(status).json({ role });
  };
}
