import CardModel from '../models/Card.js'
import UserModel from '../models/User.js'

const generateCardNumber = () => {
	return Math.floor(
		1000000000000000 + Math.random() * 9000000000000000
	).toString()
}

const generateCVV = () => {
	return Math.floor(100 + Math.random() * 900).toString()
}

const generateExpirationDate = () => {
	const date = new Date()
	const month = `0${date.getMonth() + 1}`.slice(-2)
	const year = `${date.getFullYear() + 5}`.slice(-2)
	return { month, year }
}

export const create = async (req, res) => {
	try {
		const { month, year } = generateExpirationDate()

		const doc = new CardModel({
			cardNumber: generateCardNumber(),
			month,
			year,
			cvv: generateCVV(),
		})

		const card = await doc.save()

		const user = await UserModel.findByIdAndUpdate(
			req.userId,
			{ $push: { cards: card._id } },
			{ new: true }
		)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json({ card, user })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create card',
		})
	}
}

export const getCard = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId).populate('cards')

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		if (!user.cards.length) {
			return res.status(404).json({
				message: 'No cards found',
			})
		}

		res.json(user.cards)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Error retrieving cards',
		})
	}
}

export const deleteCard = async (req, res) => {
	try {
		const { cardNumber, cvv } = req.body
		const user = await UserModel.findById(req.userId).populate('cards')

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		const card = user.cards.find(
			card => card.cardNumber === cardNumber && card.cvv === cvv
		)

		if (!card) {
			return res.status(404).json({
				message: 'Card not found',
			})
		}

		await CardModel.findByIdAndDelete(card._id)
		user.cards = user.cards.filter(
			c => c._id.toString() !== card._id.toString()
		)
		await user.save()

		res.json({
			message: 'Card deleted successfully',
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to delete card',
		})
	}
}
