import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import styles from '../module/Login.module.scss'
import { fetchAuth, selectIsAuth } from '../redux/slices/auth'

import { AppDispatch } from '../redux/store'
import { FormValues, Payload } from '../types/authTypes'

export const Login: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch<AppDispatch>()
	const { register, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<FormValues> = async values => {
		const data = await dispatch(fetchAuth(values))
		if (!data.payload) {
			return alert('Не вдалося авторизуватись')
		}
		const payload = data.payload as Payload
		if (payload.token) {
			window.localStorage.setItem('token', payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.login}>
			<div className={styles.container}>
				<h1>LOGIN ACCOUNT</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('email', { required: 'Вкажіть почту' })}
						placeholder='E-Mail'
						type='text'
					/>
					<input
						{...register('password', { required: 'Вкажіть пароль' })}
						placeholder='Пароль'
						type='password'
					/>
					<button type='submit'>Авторизуватись</button>
					<Link
						style={{ color: 'var(--main-color)', marginTop: '25px' }}
						to='/register'
					>
						Створити акаунт
					</Link>
				</form>
			</div>
		</div>
	)
}
