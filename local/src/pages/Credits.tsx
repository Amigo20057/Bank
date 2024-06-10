import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from '../module/Credit.module.scss'
import { fetchCard } from '../redux/slices/card'
import { takeLoan } from '../redux/slices/loan'

interface IFormCredit {
	cardNumber: string
	cvv: string
	commission: number
	money: number
	term: number
	monthlyPayment: number
}

export const Credits: React.FC = () => {
	const [commission, setCommission] = useState(2.5)
	const [money, setMoney] = useState(3000)
	const [term, setTerm] = useState(12)
	const [monthlyPayment, setMonthlyPayment] = useState(0)
	const [totalCost, setTotalCost] = useState(0)
	const [totalCreditCost, setTotalCreditCost] = useState(0)
	const [oneTimeFee, setOneTimeFee] = useState(0)
	const [annualRate, setAnnualRate] = useState(0)
	const dispatch = useDispatch()
	const { cards } = useSelector(state => state.cards)
	const [selectedCard, setSelectedCard] = useState('')
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		const monthlyInterestRate = commission / 100 / 12
		const totalPayments = term
		const payment =
			(money *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, totalPayments)) /
			(Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
		setMonthlyPayment(payment)

		const totalCost = payment * totalPayments - money
		setTotalCost(totalCost)

		const totalCreditCost = payment * totalPayments
		setTotalCreditCost(totalCreditCost)

		const oneTimeFee = money * 0.01
		setOneTimeFee(oneTimeFee)

		const annualRate = (
			(Math.pow(1 + monthlyInterestRate, 12) - 1) *
			100
		).toFixed(2)
		setAnnualRate(annualRate)
	}, [commission, money, term])

	const { register, handleSubmit } = useForm<IFormCredit>({
		defaultValues: {
			cardNumber: '',
			cvv: '',
		},
		mode: 'onChange',
	})

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

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

	if (redirect) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.creditWindow}>
			<h2 style={{ position: 'absolute', top: '50px' }}>
				Зручний розрахунок щомісячного платежу за кредитом{' '}
			</h2>
			<div className={styles.content}>
				<div className={styles.calculate}>
					<h3>Ставка щомісячної комісії</h3>
					<ul>
						<li>
							<button
								className={commission === 2.5 ? styles.focus : ''}
								onClick={() => setCommission(2.5)}
							>
								2.5%
							</button>
						</li>
						<li>
							<button
								className={commission === 3 ? styles.focus : ''}
								onClick={() => setCommission(3)}
							>
								3%
							</button>
						</li>
						<li>
							<button
								className={commission === 4.25 ? styles.focus : ''}
								onClick={() => setCommission(4.25)}
							>
								4.25%
							</button>
						</li>
						<li>
							<button
								className={commission === 5 ? styles.focus : ''}
								onClick={() => setCommission(5)}
							>
								5%
							</button>
						</li>
					</ul>
					<h3>Сума в долларах</h3>
					<input type='text' value={money} readOnly />
					<input
						min={commission === 5 ? 10000 : 3000}
						max={commission === 5 ? 100000 : 50000}
						defaultValue={commission === 5 ? 10000 : 3000}
						step={1000}
						type='range'
						onChange={e => setMoney(Number(e.target.value))}
					/>
					<h3>Строк кредиту в місяцях</h3>
					<ul>
						<li>
							<button
								className={term === 12 ? styles.focus : ''}
								onClick={() => setTerm(12)}
							>
								12міс.
							</button>
						</li>
						<li>
							<button
								className={term === 24 ? styles.focus : ''}
								onClick={() => setTerm(24)}
							>
								24міс.
							</button>
						</li>
						<li>
							<button
								className={term === 36 ? styles.focus : ''}
								onClick={() => setTerm(36)}
							>
								36міс.
							</button>
						</li>
						<li>
							<button
								className={term === 48 ? styles.focus : ''}
								onClick={() => setTerm(48)}
							>
								48міс.
							</button>
						</li>
						<li>
							<button
								className={term === 60 ? styles.focus : ''}
								onClick={() => setTerm(60)}
							>
								60міс.
							</button>
						</li>
					</ul>
				</div>
				<div className={styles.info}>
					<h3>Ваш щомісячний платіж лише</h3>
					<h1>{monthlyPayment.toFixed(2)}$</h1>
					<h4>Загальні витрати за споживчим кредитом </h4>
					<h2>{totalCost.toFixed(2)}$</h2>
					<h4>Загальна вартість кредиту</h4>
					<h2>{totalCreditCost.toFixed(2)}$</h2>
					<h4>Одноразова комісія за надання Кредиту</h4>
					<h2>{oneTimeFee.toFixed(2)}$</h2>
					<h4>Реальна річна процентна ставка:</h4>
					<h2>{annualRate}%</h2>
				</div>
			</div>
			<div className={styles.credit}>
				<div className={styles.container}>
					<div className={styles.name}>
						<h1>Замовити кредит: </h1>
					</div>
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
				</div>
			</div>
		</div>
	)
}
