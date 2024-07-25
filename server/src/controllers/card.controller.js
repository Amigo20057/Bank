import db from '../db.js'

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

class CardController {
	async createCard(req, res) {
		try {
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const { month, year } = generateExpirationDate()
			const cardNumber = generateCardNumber()
			const cvv = generateCVV()

			await db.query('BEGIN')

			const newCardResult = await db.query(
				'INSERT INTO cards (card_number, month, year, cvv) VALUES ($1, $2, $3, $4) RETURNING *',
				[cardNumber, month, year, cvv]
			)

			const newCard = newCardResult.rows[0]

			await db.query(
				'INSERT INTO user_cards (user_id, card_id) VALUES ($1, $2)',
				[user_id, newCard.card_id]
			)

			await db.query('COMMIT')

			res.json(newCard)
		} catch (err) {
			console.error(err)
			await db.query('ROLLBACK')
			res.status(500).json({ message: 'Failed to create card' })
		}
	}

	async getCard(req, res) {
		try {
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const cardIdsResult = await db.query(
				'SELECT card_id FROM user_cards WHERE user_id = $1',
				[user_id]
			)

			if (cardIdsResult.rows.length === 0) {
				return res.status(404).json({ message: 'No cards found for this user' })
			}

			const cardIds = cardIdsResult.rows.map(row => row.card_id)
			const cardsResult = await db.query(
				'SELECT * FROM cards WHERE card_id = ANY($1::int[])',
				[cardIds]
			)

			if (cardsResult.rows.length === 0) {
				return res.status(404).json({ message: 'Cards not found' })
			}

			res.json(cardsResult.rows)
		} catch (err) {
			console.error(err)
			res.status(500).json({ message: 'Failed to get cards' })
		}
	}

	async deleteCard(req, res) {
		try {
			const { cardNumber, cvv } = req.body
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const cardIdResult = await db.query(
				`SELECT c.card_id, c.balance FROM cards c
				INNER JOIN user_cards uc ON c.card_id = uc.card_id
				WHERE uc.user_id = $1 AND c.card_number = $2 AND c.cvv = $3`,
				[user_id, cardNumber, cvv]
			)

			if (cardIdResult.rows.length === 0) {
				return res.status(404).json({ message: 'Card not found' })
			}

			const card = cardIdResult.rows[0]

			if (card.balance != 0) {
				return res.status(400).json({ message: 'There is money on the card' })
			}

			await db.query('BEGIN')

			await db.query(
				'DELETE FROM user_cards WHERE user_id = $1 AND card_id = $2',
				[user_id, card.card_id]
			)

			await db.query('DELETE FROM cards WHERE card_id = $1', [card.card_id])

			await db.query('COMMIT')

			res.json({ message: 'Card deleted successfully' })
		} catch (err) {
			console.error(err)
			await db.query('ROLLBACK')
			res.status(500).json({ message: 'Failed to delete card' })
		}
	}

	async moneyTransfer(req, res) {
		try {
			const { cvv, cardNumberFirstUser, cardNumberSecondUser, money } = req.body
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const cardFirstUserResult = await db.query(
				'SELECT * FROM cards WHERE card_number = $1 AND cvv = $2',
				[cardNumberFirstUser, cvv]
			)

			if (cardFirstUserResult.rows.length === 0) {
				return res.status(404).json({ message: 'Card sender not found' })
			}

			const cardSecondUserResult = await db.query(
				'SELECT * FROM cards WHERE card_number = $1',
				[cardNumberSecondUser]
			)

			if (cardSecondUserResult.rows.length === 0) {
				return res.status(404).json({ message: 'Card recipient not found' })
			}

			const cardFirstUser = cardFirstUserResult.rows[0]
			const cardSecondUser = cardSecondUserResult.rows[0]

			if (cardFirstUser.card_number === cardSecondUser.card_number) {
				return res.status(400).json({
					message: `You cannot send money to the sender's card`,
				})
			}

			if (cardFirstUser.balance < money) {
				return res.status(400).json({
					message: 'Insufficient funds',
				})
			}

			if (money <= 0) {
				return res.status(400).json({ message: 'Invalid amount' })
			}

			await db.query('BEGIN')

			await db.query(
				'UPDATE cards SET balance = balance - $1 WHERE card_id = $2',
				[money, cardFirstUser.card_id]
			)

			await db.query(
				'UPDATE cards SET balance = balance + $1 WHERE card_id = $2',
				[money, cardSecondUser.card_id]
			)

			const transfer = await db.query(
				'INSERT INTO transfers (sender_card_number, recipient_card_number, amount) VALUES ($1, $2, $3) RETURNING *',
				[cardFirstUser.card_number, cardSecondUser.card_number, money]
			)

			await db.query('COMMIT')

			res.json({
				message: 'Money transferred successfully',
				transfer: transfer.rows[0],
				// cardFirstUser,
				// cardSecondUser,
			})
		} catch (err) {
			console.error(err)
			await db.query('ROLLBACK')
			res.status(500).json({
				message: 'Error transferring money',
			})
		}
	}

	async getMoneyTransfers(req, res) {
		try {
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const cardIdResult = await db.query(
				'SELECT card_id FROM user_cards WHERE user_id = $1',
				[user_id]
			)

			if (cardIdResult.rows.length === 0) {
				return res.status(404).json({ message: 'No cards found for this user' })
			}

			const cardIds = cardIdResult.rows.map(row => row.card_id)

			const cardNumbersResult = await db.query(
				'SELECT card_number FROM cards WHERE card_id = ANY($1::int[])',
				[cardIds]
			)

			const cardNumbers = cardNumbersResult.rows.map(row => row.card_number)

			const transfersResult = await db.query(
				'SELECT * FROM transfers WHERE sender_card_number = ANY($1::text[]) OR recipient_card_number = ANY($1::text[])',
				[cardNumbers]
			)

			res.json(transfersResult.rows)
		} catch (err) {
			console.error(err)
			res.status(500).json({ message: 'Failed to get transfers' })
		}
	}
	async takeLoan(req, res) {
		try {
			const { cvv, cardNumber, amount, interestRate, term } = req.body

			const cardResult = await db.query(
				'SELECT card_id FROM cards WHERE card_number = $1 AND cvv = $2',
				[cardNumber, cvv]
			)

			if (cardResult.rows.length === 0) {
				return res.status(404).json({ message: 'Card not found' })
			}

			const card_id = cardResult.rows[0].card_id

			await db.query('BEGIN')

			const loanResult = await db.query(
				'INSERT INTO loans (amount, interest_rate, term, card_id) VALUES ($1, $2, $3, $4) RETURNING *',
				[amount, interestRate, term, card_id]
			)

			await db.query(
				'UPDATE cards SET balance = balance + $1 WHERE card_id = $2',
				[amount, card_id]
			)

			await db.query('COMMIT')

			res.json({
				message: 'Loan taken successfully',
				loan: loanResult.rows[0],
			})
		} catch (err) {
			console.error(err)
			await db.query('ROLLBACK')
			res.status(500).json({ message: 'Failed to take loan' })
		}
	}

	async repayLoan(req, res) {
		try {
			const { cvv, cardNumber, loan, money } = req.body

			const cardResult = await db.query(
				'SELECT card_id, balance FROM cards WHERE card_number = $1 AND cvv = $2',
				[cardNumber, cvv]
			)

			if (cardResult.rows.length === 0) {
				return res.status(404).json({ message: 'Card not found' })
			}

			const card = cardResult.rows[0]

			const loanResult = await db.query(
				'SELECT loan_id, amount FROM loans WHERE loan_id = $1 AND card_id = $2',
				[loan, card.card_id]
			)

			if (loanResult.rows.length === 0) {
				return res.status(404).json({ message: 'Loan not found' })
			}

			const loanToRepay = loanResult.rows[0]

			if (money <= 0) {
				return res.status(400).json({ message: 'Invalid repayment amount' })
			}

			if (card.balance < money) {
				return res.status(400).json({ message: 'Insufficient funds' })
			}

			if (loanToRepay.amount < money) {
				return res
					.status(400)
					.json({ message: 'Repayment amount exceeds loan amount' })
			}

			await db.query('BEGIN')

			const newLoanAmount = loanToRepay.amount - money
			if (newLoanAmount > 0) {
				await db.query('UPDATE loans SET amount = $1 WHERE loan_id = $2', [
					newLoanAmount,
					loan,
				])
			} else {
				await db.query('DELETE FROM loans WHERE loan_id = $1', [loan])
			}

			await db.query(
				'UPDATE cards SET balance = balance - $1 WHERE card_id = $2',
				[money, card.card_id]
			)

			await db.query('COMMIT')

			res.json({
				message: 'Loan repaid successfully',
				card: { ...card, balance: card.balance - money },
			})
		} catch (err) {
			console.error(err)
			await db.query('ROLLBACK')
			res.status(500).json({ message: 'Failed to repay loan' })
		}
	}

	async loan(req, res) {
		try {
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const cardIdsResult = await db.query(
				'SELECT card_id FROM user_cards WHERE user_id = $1',
				[user_id]
			)

			if (cardIdsResult.rows.length === 0) {
				return res.status(404).json({ message: 'No cards found for this user' })
			}

			const cardIds = cardIdsResult.rows.map(row => row.card_id)

			const loansResult = await db.query(
				'SELECT * FROM loans WHERE card_id = ANY($1::int[])',
				[cardIds]
			)

			res.json(loansResult.rows)
		} catch (err) {
			console.error(err)
			res.status(500).json({
				message: 'Failed to get loans',
			})
		}
	}
}

export default new CardController()
