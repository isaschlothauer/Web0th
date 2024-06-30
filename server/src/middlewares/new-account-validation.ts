import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { CreateAccountProps } from '../../@types/express/index'

export const newAccountValidation = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("This is from a middleware:", req.body);
  const schema = Joi.object<CreateAccountProps>({
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'jp', 'de', 'gov', 'edu']} 
    }),
  
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(5)
      .max(32)
      .required()
      .messages({
        "string.min": "Password must be minimum 5 characters",
        "string.max": "Password must be less than 32 characters"
      }),
  
    passwordConfirm: Joi.ref('password')
  })

  try {
    const value = await schema.validateAsync(req.body, { abortEarly: false });

    // Removing passwordConfirm
    delete req.body['passwordConfirm'];
    
    next();
  } catch (err: any) {
    const errorDetails = err.details.map((detail: {message: string})  => detail.message)

    return res.status(400).json({errors: errorDetails});
  }
}