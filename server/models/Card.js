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
})

cardSchema.methods.addTransfer = async function (transfer) {
	this.transfers.unshift(transfer)

	if (this.transfers.length > 10) {
		this.transfers.pop()
	}

	await this.save()
}

const CardModel = mongoose.model('Card', cardSchema)

export default CardModel
