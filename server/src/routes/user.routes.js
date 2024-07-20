import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import checkAuth from '../utils/checkAuth.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'
import { loginValidation, registerValidation } from '../validations.js'

const router = new Router()

router.post(
	'/login',
	loginValidation,
	handleValidationErrors,
	UserController.login
)
router.post(
	'/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
)
router.get('/me', checkAuth, UserController.getMe)

export default router
