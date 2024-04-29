import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { addBebidaSchema, atualizarBebidaSchema } from '../schemas/validation.schemas';

function validateBody(schema: Joi.Schema){
  return function(req: Request, res: Response, next: NextFunction){
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details.map((e) => e.message).join(', ') });
    } else {
      next();
    }
  };
}

export const validateAddBebida = validateBody(addBebidaSchema);

export const validateAtualizarBebida = validateBody(atualizarBebidaSchema);


