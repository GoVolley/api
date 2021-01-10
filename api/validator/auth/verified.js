const Joi = require('@hapi/joi');

const schema = Joi.object({
    token: Joi.required()
      .empty()
      .messages({
        "string.empty": `Le champ ne peu pas être vide`,
        "any.required": `Le champ est requis`
    }),
});

module.exports = schema;