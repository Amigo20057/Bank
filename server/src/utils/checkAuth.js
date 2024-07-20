import jwt from 'jsonwebtoken'

const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (!token) {
		return res.status(401).json({ message: 'No token provided' })
	}

	try {
		const decoded = jwt.verify(token, 'secret123')
		req.user_id = decoded.user_id
		next()
	} catch (err) {
		console.error(err)
		return res.status(403).json({ message: 'Invalid token' })
	}
}

export default checkAuth
