import { Banknote, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Card } from '../components/Card'
import styles from '../module/Home.module.scss'
import { selectIsAuth } from '../redux/slices/auth'
import { createCard, fetchCard } from '../redux/slices/card'

export const Home: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const data = cards.items
	const [fullTransfers, setFullTransfers] = useState(false)

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	const handleCreateCard = () => {
		dispatch(createCard())
	}

	return (
		<div className={styles.home}>
			<div className={styles.cards}>
				<h2 className={styles.myCards}>Усі карти</h2>
				<div>
					{data.length > 0
						? data.map(card => (
								<Card
									key={card._id}
									_id={card._id}
									cardNumber={card.cardNumber}
									balance={card.balance}
									month={card.month}
									year={card.year}
									cvv={card.cvv}
								/>
						  ))
						: ''}
					{data.length < 3 && (
						<div className={styles.createCard} onClick={handleCreateCard}>
							<Plus size={48} />
						</div>
					)}
				</div>
			</div>
			<div className={styles.payments}>
				<h2>Платежі</h2>
				<ul className={fullTransfers ? styles.fullTransfers : ''}>
					{data.map(card =>
						card.transfers.map((transfer, index) => {
							const isSent = card.cardNumber === transfer.senderCardNumber
							return (
								<li
									key={index}
									className={isSent ? styles.sent : styles.received}
								>
									<span className={isSent ? styles.minus : styles.plus}>
										{isSent ? '-' : '+'}
									</span>
									{transfer.amount} $
									<span>
										{isSent
											? ' Зі своєї карти'
											: ` від ${transfer.senderCardNumber}`}
									</span>
								</li>
							)
						})
					)}
					<button onClick={() => setFullTransfers(!fullTransfers)}>
						{!fullTransfers ? 'Детальніше' : 'Закрити'}
					</button>
				</ul>
			</div>
			<div className={styles.operation}>
				<h2>Операції</h2>
				<div>
					<Link to='/moneyTransfer'>
						<button>
							<Banknote size={34} color='#fff' />
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
