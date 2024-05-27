import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import styles from '../module/Register.module.scss'
import { fetchRegister, selectIsAuth } from '../redux/slices/auth'

interface FormValues {
	fullName: string
	email: string
	password: string
}

interface Payload {
	token?: string
}

export const Register: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		// formState: { errors, isValid },
	} = useForm<FormValues>({
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
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
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
							marginTop: '20px',
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
