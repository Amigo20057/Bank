import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import styles from '../module/Register.module.scss'
import { fetchRegister, selectIsAuth } from '../redux/slices/auth'

import { AppDispatch } from '../redux/store'
import { FormValues, Payload } from '../types/authTypes'

export const Register: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch: AppDispatch = useDispatch<AppDispatch>()

	const { register, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<FormValues> = async values => {
		const data = await dispatch(fetchRegister(values))
		if (!data.payload) {
			return alert('Не вдалося зареєструватися')
		}
		const payload = data.payload as Payload
		if (payload.token) {
			window.localStorage.setItem('token', payload.token)
		} else {
			alert('Токен відсутній')
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.register}>
			<div className={styles.container}>
				<h1>CREATE ACCOUNT</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('fullName', { required: `Вкажіть повне ім'я` })}
						placeholder={`Повне ім'я`}
						type='text'
					/>
					<input
						{...register('email', { required: 'Вкажіть почту' })}
						placeholder='E-Mail'
						type='email'
					/>
					<input
						{...register('password', { required: 'Вкажіть пароль' })}
						placeholder='Пароль'
						type='password'
					/>
					<button type='submit'>Зареєструватися</button>
					<Link
						style={{
							color: 'var(--main-color)',
							position: 'relative',
							// left: '150px',
							marginTop: '45px',
						}}
						to='/login'
					>
						Акаунт вже існує
					</Link>
				</form>
			</div>
		</div>
	)
}
