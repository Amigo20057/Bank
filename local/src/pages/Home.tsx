import { Banknote, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Chart } from '../UI/Chart'
import { Card } from '../components/Card/Card'
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

	const calculateTotals = () => {
		let received = 0
		let spent = 0
		data.forEach(card => {
			card.transfers.forEach(transfer => {
				if (card.cardNumber === transfer.senderCardNumber) {
					spent += transfer.amount
				} else {
					received += transfer.amount
				}
			})
		})
		return { received, spent }
	}

	const { received, spent } = calculateTotals()

	const allTransfers = data.reduce((acc, card) => {
		const cardTransfers = card.transfers.map(transfer => ({
			...transfer,
			cardNumber: card.cardNumber,
		}))
		return acc.concat(cardTransfers)
	}, [])

	allTransfers.sort((a, b) => new Date(b.date) - new Date(a.date))

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
					{allTransfers.map((transfer, index) => {
						const isSent = transfer.cardNumber === transfer.senderCardNumber
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
					})}
					<button onClick={() => setFullTransfers(!fullTransfers)}>
						{!fullTransfers ? 'Усі' : 'Закрити'}
					</button>
				</ul>
			</div>
			<div className={styles.operation}>
				<h2>Операції</h2>
				<div>
					<button>
						<Link to='/moneyTransfer'>
							<Banknote size={34} color='#fff' />
						</Link>
					</button>
				</div>
			</div>
			{received !== 0 && (
				<div className={styles.chart}>
					<Chart received={received} spent={spent} />
				</div>
			)}
		</div>
	)
}
