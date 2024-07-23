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
				<h1>Log in account</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.alternativeLogin}>
						<button>
							<img
								src='./logo-google-icon.png'
								alt='google-icon'
								width={24}
								height={24}
							/>
							<p>Google</p>
						</button>
						<button>
							<img
								src='./logo-facebook-icon.png'
								alt='facebook-icon'
								width={15}
								height={25}
							/>
							<p>Facebook</p>
						</button>
					</div>
					<p>or</p>
					<label htmlFor='email'>Email</label>
					<input
						{...register('email', { required: 'Вкажіть почту' })}
						id='email'
						placeholder='Enter email address'
						type='text'
					/>
					<label style={{ left: '-143px' }} htmlFor='password'>
						Password
					</label>
					<input
						{...register('password', { required: 'Вкажіть пароль' })}
						placeholder='Enter your password'
						type='password'
						id='password'
					/>
					<button type='submit'>Log in</button>
				</form>
			</div>
			<div style={{ marginTop: '30px' }}>
				<span>Don't have an account?</span>
				<span>
					<Link style={{ color: '#8175dc', marginLeft: '5px' }} to='/register'>
						Sign up
					</Link>
				</span>
			</div>
		</div>
	)
}
