import { Router, Request, Response } from 'express';
import accountCreationController from '../controllers/account-creation.controller'
import loginController from '../controllers/login.controller'
import { newAccountValidation } from '../middlewares/new-account-validation';
import { loginInputValidation } from '../middlewares/login-validation'

// const api = Router()
//   .use(accountCreationController)

//   export default Router().use('/api', api);


// router.post("/api/register", (req: Request, res: Response) => {
//   console.log(req.body);
// })

// export default router;

  // const api = router
  //   .use(accountCreationController);

  const api = Router()
    .use('/register', newAccountValidation, accountCreationController)
    .use('/login', loginInputValidation, loginController);

  export default Router().use('/api', api);