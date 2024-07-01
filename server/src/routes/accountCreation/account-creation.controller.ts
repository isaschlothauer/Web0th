import { Router, Request, Response } from 'express';
import { CreateAccountProps, UserDataProps, UserDuplicateCheckProps } from "../../../@types/express/index"

import { hashPassword } from '../../services/password-hashing';
import { loginDuplicateCheck } from '../../services/login-duplicate-check';
import { newAccountDatabaseInsert } from '../../services/new-account-database-insert'
import { QueryResult } from 'mysql2';

const router = Router();

// Account creation 
router.post("/", async (req: Request, res:Response) => {

  const { email, password }: CreateAccountProps = req.body;

  let users: UserDuplicateCheckProps[] = [];

  // Check existing user with same login
  try {
    users = await loginDuplicateCheck(email);
  }
  catch (err: any) {
    res.status(400).send({ sucess: false, error: err.message });
    return;
  }

  if (users.length > 0) {
    res.status(409).send({ success: false, error: "Account already exists" });
    return;
  }

  // Password hash
  const passwordHash = await hashPassword(password);

  // Data for database function
  const userDataPrepared = { 
    login: email,
    passwordHash: passwordHash
  }

  // Database insertion
  const databaseInsertResult = await newAccountDatabaseInsert(userDataPrepared);

  if (databaseInsertResult === false) 
    return res.status(400).send({ success: false, error: "Error. Unable to create a new account" })
  else
    return res.status(200).send({ success: true, message: "New account created" });
  

  // const databaseInsertResult: boolean = await newAccountDatabaseInsert(req.body);

  // databaseInsertResult? res.status(200).send({ success: true, message: "New account created"}) : res.status(400).send({ error: "Account creation failed. Please contact the administrator" })


  // let users: UserDuplicateCheckProps[];
  // let passwordHash: string = "";
  // // Argon2 // Password hashing
  // try {
  //   passwordHash = await hashPassword(password);

  //   // res.status(200).send({ success: true, message: 'Password hashing successful'})
  //   console.log("test ok");


  // }
  // catch (err: any) {
  //   // Password hashing error
  //   res.status(400).send({ success: false, error: err.message });
  // }  

  // // Data to the database
  // try {
  //   users = await newAccountDatabaseInsert({ email, passwordHash })

  //   console.log("acc controller. Test only. Delete", users);

  // }
  // catch (err: any) {
  //   // Database insert error. 
  //   res.status(400).send({ success: false, error: err.message });

  // }




})


export default router;