import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../module/Credit.module.scss'
import { takeLoan } from '../../redux/slices/loan'

import { CreditFormProps, IFormCredit } from '../../types/loanComponentTypes'

export const CreditForm: React.FC<CreditFormProps> = ({
	commission,
	money,
	term,
	setRedirect,
}) => {
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const [selectedCard, setSelectedCard] = React.useState('')

	const { register, handleSubmit } = useForm<IFormCredit>({
		defaultValues: {
			cardNumber: '',
			cvv: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (data: IFormCredit) => {
		const creditData = {
			...data,
			interestRate: commission,
			amount: money,
			term,
		}

		try {
			dispatch(takeLoan(creditData))
			setRedirect(true)
		} catch (error) {
			console.error(error)
		}
	}

	return (
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
			<button type='submit'>Замовити</button>
		</form>
	)
}
