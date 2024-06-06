import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from '../module/MoneyTransfer.module.scss'
import { fetchCard, moneyTransfer } from '../redux/slices/card'
import { ITransferMoneyForm } from '../types/cardTypes'

export const MoneyTransfer: React.FC = () => {
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const [selectedCard, setSelectedCard] = useState('')
	const [redirect, setRedirect] = useState(false)

	const { register, handleSubmit, reset } = useForm<ITransferMoneyForm>({
		defaultValues: {
			cardNumberFirstUser: '',
			cvv: '',
			cardNumberSecondUser: '',
			money: '',
		},
	})

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

	const onSubmit = async data => {
		const formattedData = {
			...data,
			cardNumberFirstUser: String(data.cardNumberFirstUser),
			cvv: String(data.cvv),
			cardNumberSecondUser: String(data.cardNumberSecondUser),
			money: Number(data.money),
		}

		try {
			await dispatch(moneyTransfer(formattedData)).unwrap()
			reset()
			setRedirect(true)
		} catch (error) {
			console.error('Error transferring money:', error)
		}
	}

	if (redirect) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.windowTransfer}>
			<div className={styles.container}>
				<h1>Переказ</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formGroup}>
						<label>Виберіть вашу карту</label>
						<select
							{...register('cardNumberFirstUser', { required: true })}
							value={selectedCard}
							onChange={e => setSelectedCard(e.target.value)}
						>
							<option value=''>-- Виберіть карту --</option>
							{cards.items.map(card => (
								<option key={card._id} value={card.cardNumber}>
									{card.cardNumber} (Баланс: {card.balance})
								</option>
							))}
						</select>
					</div>
					<div className={styles.formGroup}>
						<label>CVV</label>
						<input
							type='password'
							{...register('cvv', { required: 'Вкажіть CVV код' })}
						/>
					</div>
					<div className={styles.formGroup}>
						<label>Карта отримувача</label>
						<input
							type='text'
							{...register('cardNumberSecondUser', {
								required: 'Вкажіть номер карти отримувача',
							})}
						/>
					</div>
					<div className={styles.formGroup}>
						<label>Кількість грошей</label>
						<input
							type='number'
							{...register('money', { required: 'Вкажіть кількість грошей' })}
						/>
					</div>
					<button type='submit'>Відправити</button>
				</form>
			</div>
		</div>
	)
}
