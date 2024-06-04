import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Invalid email format').isEmail(),
	body('password', 'Password must have at least 5 characters').isLength({
		min: 5,
	}),
	body('fullName', 'Enter your name').isLength({ min: 3 }),
]

export const loginValidation = [
	body('email', 'Invalid email format').isEmail(),
	body('password', 'Password must have at least 5 characters').isLength({
		min: 5,
	}),
]

export const cardCreateValidation = [
	body('cardNumber')
		.isLength({ min: 16, max: 16 })
		.withMessage('Invalid Card Number')
		.isNumeric()
		.withMessage('Card Number must be numeric'),
	body('month')
		.isInt({ min: 1, max: 12 })
		.withMessage('Invalid Month')
		.custom(value => value.length === 2)
		.withMessage('Month must be 2 digits'),
	body('year').isInt({ min: 0, max: 99 }).withMessage('Invalid Year'),
	body('cvv').isInt({ min: 100, max: 999 }).withMessage('Invalid CVV'),
]
