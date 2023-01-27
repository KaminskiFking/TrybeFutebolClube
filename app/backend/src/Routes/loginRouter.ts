import * as express from 'express';
import UserController from '../controller/UserController';
import UserValid from '../middlewares/userValid';

const userRouter = express.Router();

const userController = new UserController();
const userValidate = new UserValid();

userRouter.post('/', userValidate.valid, userController.login);
userRouter.get('/validate', userController.validateLogin);

export default userRouter;
