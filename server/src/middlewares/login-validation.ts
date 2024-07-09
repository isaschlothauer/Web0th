import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { LoginValueProps } from '../../@types/express/index'

export const loginInputValidation = async (req: Request, res: Response, next: NextFunction ) => {

  const inputSchema = Joi.object<LoginValueProps>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberId: Joi.boolean().required()
  })

  try {
    const loginInput = await inputSchema.validateAsync(req.body, { abortEarly: false });

    next();
  }
  catch (err) {
    return res.status(400).json({ error: err})
  }
}