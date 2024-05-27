import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import styles from '../module/Login.module.scss'
import { fetchAuth, selectIsAuth } from '../redux/slices/auth'

export const Login: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		// setError,
		// formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchAuth(values))
		if (!data.payload) {
			return alert('Не вдалося авторизуватись')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
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
