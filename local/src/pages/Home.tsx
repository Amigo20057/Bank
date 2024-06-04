import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/slices/auth'

import { Card } from '../components/Card'
import styles from '../module/Home.module.scss'
import { fetchCard } from '../redux/slices/card'
export const Home: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const { card } = useSelector(state => state.card)
	let data = card.items

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	console.log(data.balance)

	return (
		<div className={styles.home}>
			<Card
				_id={data._id}
				numberCard={data.numberCard}
				month={data.month}
				year={data.year}
				cvv={data.cvv}
			/>
		</div>
	)
}
