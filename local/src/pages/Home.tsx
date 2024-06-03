import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/slices/auth'

import styles from '../module/Home.module.scss'
// import { fetchCard } from '../redux/slices/card'

export const Home: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	// const dispatch = useDispatch()
	// const cards = useSelector(state => state.cards)

	// useEffect(() => {
	// 	dispatch(fetchCard(cards._id))
	// }, [dispatch])

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	return (
		<div className={styles.home}>
			{/* <Card
				_id={cards._id}
				numberCard={cards.numberCard}
				month={cards.month}
				year={cards.year}
				cvv={cards.cvv}
			/> */}
		</div>
	)
}
