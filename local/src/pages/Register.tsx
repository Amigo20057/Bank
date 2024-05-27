import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from '../module/Register.module.scss'
import { fetchRegister, selectIsAuth } from '../redux/slices/auth.ts'

export const Register: React.FC = () => {
	const isAuth: boolean = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
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
				<h1>REGISTER</h1>
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
				</form>
			</div>
		</div>
	)
}
