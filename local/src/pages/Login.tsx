import React from 'react'
import styles from '../module/Login.module.scss'
// import { Form } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

export const Login: React.FC = () => {
	const isAuth: boolean = true

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.login}>
			<div className={styles.container}>
				<h1>LOGIN</h1>
			</div>
		</div>
	)
}
