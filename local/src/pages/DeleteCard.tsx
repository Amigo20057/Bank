import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from '../module/DeleteCard.module.scss'
import { deleteCard, fetchCard } from '../redux/slices/card'
import { FormDelete } from '../types/authTypes'

export const DeleteCard: React.FC = () => {
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const [selectedCard, setSelectedCard] = useState('')
	const [redirect, setRedirect] = useState(false)
	const { register, handleSubmit } = useForm<FormDelete>({
		defaultValues: {
			cardNumber: '',
			cvv: '',
		},
		mode: 'onChange',
	})

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

	const onSubmit = async (data: FormDelete) => {
		await dispatch(deleteCard(data))
		setRedirect(true)
	}
	if (redirect) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.deleteCard}>
			<div className={styles.container}>
				<X
					size={34}
					style={{ position: 'absolute', right: '30px', top: '25px' }}
					onClick={() => {
						setRedirect(true)
					}}
				/>
				<div className={styles.name}>
					<h1>Для видалення карти вкажіть: </h1>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h3>Виберіть карту</h3>
					<select
						{...register('cardNumber', { required: 'Вкажіть номер карти' })}
						value={selectedCard}
						onChange={e => setSelectedCard(e.target.value)}
					>
						<option value=''>-- Виберіть карту --</option>
						{cards.items.map(card => (
							<option key={card._id} value={card.cardNumber}>
								{card.cardNumber} (Баланс: {card.balance} $)
							</option>
						))}
					</select>
					<h3>cvv код</h3>
					<input
						{...register('cvv', { required: 'Вкажіть cvv код' })}
						placeholder='cvv'
						type='password'
					/>
					<button type='submit'>Видалити</button>
				</form>
			</div>
		</div>
	)
}
