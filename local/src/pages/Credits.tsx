import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../module/Credit.module.scss'
import { fetchCard } from '../redux/slices/card'

import { Navigate } from 'react-router-dom'
import { Commission } from '../components/Credit/Commission'
import { CreditForm } from '../components/Credit/CreditForm'
import { LoanCalculator } from '../components/Credit/LoanCalculator'
import { Term } from '../components/Credit/Term'

export const Credits: React.FC = () => {
	const [commission, setCommission] = useState(2.5)
	const [money, setMoney] = useState(3000)
	const [term, setTerm] = useState(12)
	const [monthlyPayment, setMonthlyPayment] = useState(0)
	const [totalCost, setTotalCost] = useState(0)
	const [totalCreditCost, setTotalCreditCost] = useState(0)
	const [oneTimeFee, setOneTimeFee] = useState(0)
	const [annualRate, setAnnualRate] = useState('')
	const dispatch = useDispatch()
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

	useEffect(() => {
		dispatch(fetchCard())
	}, [dispatch])

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
					<div style={{ marginRight: '50px' }}>
						<Commission commission={commission} setCommission={setCommission} />
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
						<Term term={term} setTerm={setTerm} />
					</div>
					<LoanCalculator
						money={money}
						setMoney={setMoney}
						monthlyPayment={monthlyPayment}
						totalCost={totalCost}
						totalCreditCost={totalCreditCost}
						oneTimeFee={oneTimeFee}
						annualRate={annualRate}
					/>
				</div>
				<div className={styles.credit}>
					<div className={styles.container}>
						<div className={styles.name}>
							<h1>Замовити кредит: </h1>
							<CreditForm
								commission={commission}
								money={money}
								term={term}
								setRedirect={setRedirect}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
