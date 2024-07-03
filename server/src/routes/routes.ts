import { Router, Request, Response } from 'express';
import accountCreationController from '../controllers/account-creation.controller'
import loginController from '../controllers/login.controller'
import credentialController from '../controllers/credential.controller';
import { newAccountValidation } from '../middlewares/new-account-validation';
import { loginInputValidation } from '../middlewares/login-validation'

const api = Router()
  .use('/register', newAccountValidation, accountCreationController)
  .use('/login', loginInputValidation, loginController)
  .use('/protected/userAuth', credentialController);

export default Router().use('/api', api);