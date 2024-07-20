import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import cardRouter from './routes/card.routes.js'
import reportRouter from './routes/report.routes.js'
import userRouter from './routes/user.routes.js'

const PORT = process.env.PORT
const HOST = process.env.HOST
const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', userRouter)
app.use('/card', cardRouter)
app.use('/report', reportRouter)

app.listen(PORT, HOST, err => {
	if (err) {
		console.log(err)
	}
	console.log('SERVER OK')
})
