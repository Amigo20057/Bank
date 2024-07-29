import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth'
import styles from './Register.module.scss'

import { AppDispatch } from '../../../redux/store'
import { FormValues, Payload } from '../../../types/authTypes'

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
				<h1>Create new account</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.alternativeRegister}>
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
					<label style={{ left: '-143px' }} htmlFor='fullName'>
						Full name
					</label>
					<input
						{...register('fullName', { required: `Вкажіть повне ім'я` })}
						placeholder={`Enter your full name`}
						type='text'
						id='fullName'
					/>
					<label htmlFor='email'>Email</label>
					<input
						{...register('email', { required: 'Вкажіть почту' })}
						placeholder='Enter email address'
						type='email'
						id='email'
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
					<button type='submit'>Register</button>
				</form>
			</div>
			<div style={{ marginTop: '30px' }}>
				<span>Your have an account?</span>
				<span>
					<Link style={{ color: '#8175dc', marginLeft: '5px' }} to='/login'>
						Sign in
					</Link>
				</span>
			</div>
		</div>
	)
}
