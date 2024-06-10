import React from 'react'
import styles from '../../module/Credit.module.scss'

interface LoanCalculatorProps {
	money: number
	setMoney: (value: number) => void
	monthlyPayment: number
	totalCost: number
	totalCreditCost: number
	oneTimeFee: number
	annualRate: string
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
	money,
	setMoney,
	monthlyPayment,
	totalCost,
	totalCreditCost,
	oneTimeFee,
	annualRate,
}) => {
	return (
		<div>
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
	)
}
