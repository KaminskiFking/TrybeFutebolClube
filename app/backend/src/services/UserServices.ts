import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Validate from '../helpers/jwtHelper';
import { JWT_SECRET } from '../middlewares/jwtConfig';
import UserModel from '../models/UserModel';

export default class UserService {
  private model: UserModel;
  private validate: Validate;

  constructor() {
    this.model = new UserModel();
    this.validate = new Validate();
  }

  public async login(_email: string, _password: string) {
    const user = await this.model.findOne(_email);
    if (!user) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const validatePassword = await compare(_password, user.password);
    if (!validatePassword) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const token = sign(user.email, JWT_SECRET);
    return { status: 200, token };
  }

  public async validateLogin(token: string) {
    const email = await this.validate.valid(token);
    const { role } = await this.model.findOne(email);
    return { status: 200, role };
  }
}
