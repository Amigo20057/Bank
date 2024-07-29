import { Banknote, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import { selectIsAuth } from '../../redux/slices/auth'
import {
	createCard,
	fetchCard,
	getMoneyTransfers,
} from '../../redux/slices/card'
import styles from './Home.module.scss'

export const Home: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const { cards, transfers } = useSelector(state => state.cards)
	const data = cards.items
	const transferData = transfers.items
	const [fullTransfers, setFullTransfers] = useState(false)

	const [received, setReceived] = useState(0)
	const [spent, setSpent] = useState(0)

	console.log(transferData)

	useEffect(() => {
		dispatch(fetchCard())
		dispatch(getMoneyTransfers())
	}, [dispatch])

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	const handleCreateCard = () => {
		dispatch(createCard())
	}

	//TEST
	const chart = () => {
		allTransfers.map(transfer => {
			if (transfer.isSent) {
				setSpent(transfer.amount)
			}
			setReceived(transfer.amount)
		})
	}

	const allTransfers = transferData
		.map((transfer, index) => {
			const isSent = data.some(
				card => card.card_number === transfer.sender_card_number
			)
			return {
				...transfer,
				isSent,
			}
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date))

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
									cardNumber={card.card_number}
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
					{allTransfers.map((transfer, index) => (
						<li
							key={index}
							className={transfer.isSent ? styles.sent : styles.received}
						>
							<span className={transfer.isSent ? styles.minus : styles.plus}>
								{transfer.isSent ? '' : '+'}
							</span>
							{transfer.amount} $
							<span>
								{transfer.isSent
									? ' Зі своєї карти'
									: ` від ${transfer.sender_card_number}`}
							</span>
						</li>
					))}
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
		</div>
	)
}
