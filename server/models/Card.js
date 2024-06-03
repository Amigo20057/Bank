import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema(
	{
		cardNumber: {
			type: Number,
			required: true,
			unique: true,
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
			type: Number,
			required: true,
			unique: true,
		},
		balance: {
			type: Number,
			default: 0,
		},
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// 	required: true,
		// },
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Card', CardSchema)
