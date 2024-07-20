import { Router } from 'express'
import reportController from '../controllers/report.controller.js'
import checkAuth from '../utils/checkAuth.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'
import { reportCreateValidation } from '../validations.js'

const router = new Router()

router.post(
	'/create',
	checkAuth,
	reportCreateValidation,
	handleValidationErrors,
	reportController.create
)

export default router
