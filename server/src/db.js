import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
	host: process.env.HOST,
	port: process.env.PORT_POSTGRES,
	user: process.env.USER,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
})

export default pool
