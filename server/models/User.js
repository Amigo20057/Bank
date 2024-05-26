import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		balance: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)
