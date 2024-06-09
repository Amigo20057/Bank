import ReportModel from '../models/Report.js'

export const createReport = async (req, res) => {
	try {
		const doc = new ReportModel({
			fullName: req.body.fullName,
			email: req.body.email,
			telephoneNumber: req.body.telephoneNumber,
			title: req.body.title,
			text: req.body.text,
			user: req.userId,
		})

		const report = await doc.save()

		res.json({ report })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create report',
		})
	}
}
