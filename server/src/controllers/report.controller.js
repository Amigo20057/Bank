import db from '../db.js'

class ReportController {
	async create(req, res) {
		try {
			const { fullName, email, telephoneNumber, title, text } = req.body
			const user_id = req.user_id

			if (!user_id) {
				return res.status(400).json({ message: 'User ID is required' })
			}

			const newReportResult = await db.query(
				'INSERT INTO reports (fullName, email, telephoneNumber, title, text, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
				[fullName, email, telephoneNumber, title, text, user_id]
			)

			const newReport = newReportResult.rows[0]

			res.json(newReport)
		} catch (err) {
			console.error(err)
			res.status(500).json({
				message: 'Failed to create report',
			})
		}
	}
}

export default new ReportController()
