import mongoose from 'mongoose'

const transferSchema = new mongoose.Schema({
	senderCardNumber: {
		type: String,
		required: true,
	},
	recipientCardNumber: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

const loanSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
	},
	interestRate: {
		type: Number,
		required: true,
	},
	term: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

const cardSchema = new mongoose.Schema({
	cardNumber: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		default: 0,
	},
	month: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	cvv: {
		type: String,
		required: true,
	},
	transfers: {
		type: [transferSchema],
		default: [],
	},
	loans: {
		type: [loanSchema],
		default: [],
		validate: {
			validator: function (v) {
				return v.length <= 3
			},
			message: 'A card can have a maximum of 3 loans',
		},
	},
})

cardSchema.methods.addTransfer = async function (transfer) {
	this.transfers.unshift(transfer)

	if (this.transfers.length > 10) {
		this.transfers.pop()
	}

	await this.save()
}

cardSchema.methods.addLoan = async function (loan) {
	if (this.loans.length >= 3) {
		throw new Error('A card can have a maximum of 3 loans')
	}

	this.loans.unshift(loan)
	this.balance += loan.amount
	await this.save()
}

const CardModel = mongoose.model('Card', cardSchema)

export default CardModel
