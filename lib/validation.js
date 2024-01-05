const Joi = require('joi');

export const registrationSchema = Joi.object({
    firstName: Joi.string()
                    .alphanum()
                    .min(1)
                    .max(30)
                    .required(),
    lastName: Joi.string()
                    .alphanum()
                    .min(1)
                    .max(30)
                    .required(),
    username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    email: Joi.string()
                .email()
                .required(),
    password: Joi.string()
                    .min(7)
                    .max(500)
                    .required(),
});

export const loginSchema = Joi.object({
    emailOrUsername: Joi.string()
                .required(),
    password: Joi.string()
                .required(),
});

export const requiredInputSchema = Joi.object({
    input: Joi.string()
                .required()
});

export const emailSchema = Joi.object({
    email: Joi.string()
                .email()
                .required()
});

export const usernameSchema = Joi.object({
    username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                        'string.alphanum': 'Username must be alphanumeric',
                        'string.min': 'Username must be at least 3 characters long',
                        'string.max': 'Username must not exceed 30 characters',
                        'string.required': 'Username is required',
                        'string.empty': 'Username is required'
                    })
});

export const nameSchema = Joi.object({
    name: Joi.string()
                .alphanum()
                .min(1)
                .max(30)
                .required()
                .messages({
                    'string.alphanum': 'Name must be alphanumeric',
                    'string.min': 'Name must be at least 1 character long',
                    'string.max': 'Name must not exceed 30 characters',
                    'string.required': 'Name is required',
                    'string.empty': 'Name is required'
                })
});

export const passwordSchema = Joi.object({
    password: Joi.string()
                    .min(7)
                    .max(500)
                    .required()
                    .messages({
                        'string.min': 'Password must be at least 7 characters long',
                        'string.max': 'Password must not exceed 500 characters',
                        'string.required': 'Password is required',
                        'string.empty': 'Password is required'
                    })
});
