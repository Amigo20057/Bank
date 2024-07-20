import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db.js'

class UserController {
	async register(req, res) {
		try {
			const { email, fullName, password } = req.body
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			const newUserResult = await db.query(
				'INSERT INTO users (email, fullName, passwordHash) VALUES ($1, $2, $3) RETURNING *',
				[email, fullName, hash]
			)

			const newUser = newUserResult.rows[0]

			const token = jwt.sign({ user_id: newUser.user_id }, 'secret123', {
				expiresIn: '30d',
			})

			res.json({ ...newUser, token })
		} catch (err) {
			console.error(err)
			res.status(500).json({ message: 'Failed to register' })
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body
			const userResult = await db.query(
				'SELECT * FROM users WHERE email = $1',
				[email]
			)

			if (userResult.rows.length === 0) {
				return res.status(404).json({ message: 'User not found' })
			}

			const user = userResult.rows[0]
			const isValidPass = await bcrypt.compare(password, user.passwordhash)

			if (!isValidPass) {
				return res.status(401).json({ message: 'Wrong login or password' })
			}

			const token = jwt.sign({ user_id: user.user_id }, 'secret123', {
				expiresIn: '30d',
			})

			res.json({ ...user, token })
		} catch (err) {
			console.error(err)
			res.status(500).json({ message: 'Failed to login' })
		}
	}

	async getMe(req, res) {
		try {
			const user_id = req.user_id

			const userResult = await db.query(
				'SELECT * FROM users WHERE user_id = $1',
				[user_id]
			)

			if (userResult.rows.length === 0) {
				return res.status(404).json({ message: 'User not found' })
			}

			const user = userResult.rows[0]
			const token = jwt.sign({ user_id: user.user_id }, 'secret123', {
				expiresIn: '30d',
			})

			res.json({ ...user, token })
		} catch (err) {
			console.error(err)
			res.status(500).json({ message: 'Failed to get user data' })
		}
	}
}

export default new UserController()
