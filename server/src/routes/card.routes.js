import { Router } from 'express'
import CardController from '../controllers/card.controller.js'
import checkAuth from '../utils/checkAuth.js'
import { cardCreateValidation } from '../validations.js'

const router = new Router()

router.get('/card', checkAuth, CardController.getCard)
router.post(
	'/create',
	checkAuth,
	cardCreateValidation,
	CardController.createCard
)
router.delete('/delete', checkAuth, CardController.deleteCard)
router.patch('/moneyTransfer', checkAuth, CardController.moneyTransfer)
router.post('/takeLoan', checkAuth, CardController.takeLoan)
router.post('/repayLoan', checkAuth, CardController.repayLoan)

export default router
