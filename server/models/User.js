import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
