import Joi from 'joi';

export const addBebidaSchema = Joi.object({
  nome: Joi.string().required(),
  tipo: Joi.string().required(),
  preco: Joi.number().positive().required(),  
});

export const atualizarBebidaSchema = Joi.object({
  nome: Joi.string(),
  tipo: Joi.string(),
  preco: Joi.number().positive(),
});
