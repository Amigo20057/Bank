import CardModel from '../models/Card.js'

export const create = async (req, res) => {
	try {
		const doc = new CardModel({
			cardNumber: req.body.cardNumber,
			month: req.body.month,
			year: req.body.year,
			cvv: req.body.cvv,
			user: req.userId,
		})

		const card = await doc.save()
		res.json(card)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'failed to create card',
		})
	}
}
