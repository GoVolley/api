const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string()
    .required()
    .empty()
    .messages({
      "string.base": `Le champ est invalide`,
      "string.empty": `Le champ ne peu pas être vide`,
      "any.required": `Le champ est requis`
  }),
  primary_color: Joi.string()
    .max(6)
    .required()
    .empty()
    .messages({
      "string.base": `Le champ est invalide`,
      "string.empty": `Le champ ne peu pas être vide`,
      "string.max": `La valeur est trop importante`,
      "any.required": `Le champ est requis`
  }),
  secondary_color: Joi.string()
    .max(6)
    .required()
    .empty()
    .messages({
      "string.base": `Le champ est invalide`,
      "string.empty": `Le champ ne peu pas être vide`,
      "string.max": `La valeur est trop importante`,
      "any.required": `Le champ est requis`
  }),
});

module.exports = schema;