import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import {
	cardCreateValidation,
	loginValidation,
	registerValidation,
	reportCreateValidation,
} from './validations.js'

import checkAuth from './utils/checkAuth.js'

import * as CardController from './controllers/cardController.js'
import * as ReportController from './controllers/reportController.js'
import * as UserController from './controllers/userController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

mongoose
	.connect(
		'mongodb+srv://admin:wwwwww@cluster0.elojd0q.mongodb.net/bank?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		console.log('DB OK')
	})
	.catch(err => {
		console.log('DB ERROR', err)
	})

const app = express()
app.use(cors())
app.use(express.json())

app.post(
	'/auth/login',
	loginValidation,
	handleValidationErrors,
	UserController.login
)
app.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/card', checkAuth, CardController.getCard)
app.post('/createCard', checkAuth, cardCreateValidation, CardController.create)
app.post('/deleteCard', checkAuth, CardController.deleteCard)
app.patch('/moneyTransfer', checkAuth, CardController.moneyTransfer)
app.patch('/takeLoan', checkAuth, CardController.takeLoan)
app.patch('/repayLoan', checkAuth, CardController.repayLoan)

app.post(
	'/report',
	checkAuth,
	reportCreateValidation,
	handleValidationErrors,
	ReportController.createReport
)

app.listen(4444, err => {
	if (err) {
		return console.log(err)
	}
	console.log('Server OK')
})
