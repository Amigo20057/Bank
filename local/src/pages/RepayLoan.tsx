import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from '../module/RepayLoan.module.scss'
import { fetchCard } from '../redux/slices/card'
import { repayLoan } from '../redux/slices/loan'

import { Card, FormLoan, Loan } from '../types/repayLoanTypes'

export const RepayLoan: React.FC = () => {
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const [selectedCard, setSelectedCard] = useState('')
	const [selectedLoan, setSelectedLoan] = useState('')
	const [redirect, setRedirect] = useState(false)

	const { register, handleSubmit, watch } = useForm<FormLoan>({
		defaultValues: {
			cardNumber: '',
			loan: '',
			money: '',
			cvv: '',
		},
		mode: 'onChange',
	})

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

	const onSubmit = async (data: FormLoan) => {
		await dispatch(repayLoan(data))
		setRedirect(true)
	}

	if (redirect) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.repayLoan}>
			<div className={styles.container}>
				<X
					size={34}
					style={{ position: 'absolute', right: '30px', top: '25px' }}
					onClick={() => {
						setRedirect(true)
					}}
				/>
				<div className={styles.name}>
					<h1>Для погашення кредиту вкажіть: </h1>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h3>Виберіть карту</h3>
					<select
						{...register('cardNumber', { required: 'Вкажіть номер карти' })}
						value={selectedCard}
						onChange={e => setSelectedCard(e.target.value)}
					>
						<option value=''>-- Виберіть карту --</option>
						{cards.items.map((card: Card) => (
							<option key={card._id} value={card.cardNumber}>
								{card.cardNumber} (Баланс: {card.balance} $)
							</option>
						))}
					</select>

					{selectedCard && (
						<>
							<h3>Виберіть кредит</h3>
							<select
								{...register('loan', { required: 'Вкажіть ваш кредит' })}
								value={selectedLoan}
								onChange={e => setSelectedLoan(e.target.value)}
							>
								<option value=''>-- Виберіть кредит --</option>
								{cards.items
									.find((card: Card) => card.cardNumber === selectedCard)
									?.loans.map((loan: Loan) => (
										<option key={loan._id} value={loan._id}>
											Кредит на {loan.amount} $
										</option>
									))}
							</select>
						</>
					)}

					<h3>Сума для погашення</h3>
					<input
						{...register('money', { required: 'Вкажіть суму для погашення' })}
						type='number'
					/>

					<h3>CVV код</h3>
					<input
						{...register('cvv', { required: 'Вкажіть cvv код' })}
						type='password'
					/>

					<button type='submit'>Погасити кредит</button>
				</form>
			</div>
		</div>
	)
}
