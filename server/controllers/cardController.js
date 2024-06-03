import CardModel from '../models/Card.js'
import UserModel from '../models/User.js'

export const create = async (req, res) => {
	try {
		const doc = new CardModel({
			cardNumber: req.body.cardNumber,
			month: req.body.month,
			year: req.body.year,
			cvv: req.body.cvv,
		})

		const card = await doc.save()

		const user = await UserModel.findByIdAndUpdate(
			req.userId,
			{ card: card._id },
			{ new: true }
		)

		res.json({ card, user })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'failed to create card',
		})
	}
}

export const getCard = async (req, res) => {
	try {
		const card = await CardModel.findById(req.params.cardId)

		if (!card) {
			return res.status(404).json({
				message: 'Card not found',
			})
		}

		res.json(card)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Error retrieving card',
		})
	}
}
