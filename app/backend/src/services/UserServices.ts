import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import validate from '../helpers/jwtHelper';
import { JWT_SECRET } from '../middlewares/jwtConfig';
import UserModel from '../models/UserModel';

export default class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(_email: string, _password: string) {
    const user = await this.model.findOne(_email);
    console.log(user.email);
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
    const email = validate(token);
    const { role } = await this.model.findOne(email);
    return { status: 200, role };
  }
}
