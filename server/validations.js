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
