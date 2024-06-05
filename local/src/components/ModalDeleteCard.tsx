import { CircleX } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styles from '../module/ModalDeleteCard.module.scss'
import { deleteCard } from '../redux/slices/card'
import { FormDelete } from '../types/authTypes'

type TModalCard = {
	setModalWindow: React.SetStateAction
}

export const ModalDeleteCard: React.FC<TModalCard> = ({ setModalWindow }) => {
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm<FormDelete>({
		defaultValues: {
			cardNumber: '',
			cvv: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (data: FormDelete) => {
		await dispatch(deleteCard(data))
		setModalWindow(false)
	}

	return (
		<div className={styles.modal}>
			<div className={styles.close}>
				<CircleX onClick={() => setModalWindow(false)} size={44} />
			</div>
			<div className={styles.name}>
				<h1>Для видалення карти вкажіть: </h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Номер карти</h3>
				<input
					{...register('cardNumber', { required: 'Вкажіть номер карти' })}
					placeholder='Номер карти'
					type='text'
				/>
				<h3>cvv код</h3>
				<input
					{...register('cvv', { required: 'Вкажіть cvv код' })}
					placeholder='cvv'
					type='password'
				/>
				<button type='submit'>Видалити</button>
			</form>
		</div>
	)
}
