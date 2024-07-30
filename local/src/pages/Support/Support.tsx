import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styles from './Support.module.scss'

import { createReport } from '../../redux/slices/report'
import { AppDispatch } from '../../redux/store'
import { IFormSupport } from '../../types/supportTypes'

export const Support: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { register, handleSubmit, reset } = useForm<IFormSupport>({
		defaultValues: {
			fullName: '',
			email: '',
			telephoneNumber: '',
			title: '',
			text: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (data: IFormSupport) => {
		try {
			await dispatch(createReport(data)).unwrap()
			alert('Форма була відправлена, чекайте відповіді на пошту')
			reset()
		} catch (error) {
			alert('Помилка при створенні форми')
		}
	}

	return (
		<div className={styles.support}>
			<h3>
				Будь ласка, опишіть пропозицію або ж поставте запитання. Ми якомога
				швидше відповімо.
			</h3>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('fullName', { required: `Вкажіть ім'я` })}
					placeholder='Як вас звуть?'
					type='text'
				/>
				<input
					{...register('email', { required: `Вкажіть Email` })}
					placeholder='Email'
					type='text'
				/>
				<input
					{...register('telephoneNumber', { required: `Номер телефону` })}
					placeholder='Номер телефону'
					type='text'
				/>
				<input
					{...register('title', { required: `Вкажіть тему` })}
					placeholder='Тема'
					type='text'
				/>
				<textarea
					{...register('text', { required: 'Опишіть звернення' })}
					placeholder='Опишіть звернення'
				></textarea>
				<button type='submit'>Відправити</button>
			</form>
		</div>
	)
}
