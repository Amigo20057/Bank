import mongoose from 'mongoose'

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
})

const CardModel = mongoose.model('Card', cardSchema)

export default CardModel
