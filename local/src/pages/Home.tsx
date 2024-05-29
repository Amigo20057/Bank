import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/slices/auth'

import styles from '../module/Home.module.scss'

export const Home: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	return <div className={styles.home}>Home</div>
}
