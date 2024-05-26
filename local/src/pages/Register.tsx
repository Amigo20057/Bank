import React from 'react'
import { Navigate } from 'react-router-dom'
import styles from '../module/Register.module.scss'

export const Register: React.FC = () => {
	const isAuth: boolean = true

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.register}>
			<div className={styles.container}>
				<h1>REGISTER</h1>
			</div>
		</div>
	)
}
