import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../module/Valuta.module.scss'

export const Valuta: React.FC = () => {
	const [data, setData] = useState([])
	const [valuta, setValuta] = useState('')
	const [convertValuta, setConvertValuta] = useState('')
	const [amount, setAmount] = useState('')
	const [result, setResult] = useState(null)

	useEffect(() => {
		axios
			.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
			.then(({ data }) => {
				console.log(data)
				setData(data)
			})
	}, [])

	const handleConvert = () => {
		const fromRate = data.find(v => v.rate.toString() === valuta)?.rate || 1
		const toRate =
			data.find(v => v.rate.toString() === convertValuta)?.rate || 1
		const conversionResult = (parseFloat(amount) * fromRate) / toRate
		setResult(conversionResult.toFixed(2))
	}

	return (
		<div className={styles.valuta}>
			<div style={{ width: '50%' }}>
				<h1 style={{ marginBottom: '20px' }}>Курс валют в Украине</h1>
				<div className={styles.valutas}>
					<ul>
						{data.length > 0
							? data.map(valuta => (
									<li key={valuta.r030}>
										<div>
											<p>Валюта</p>
											<p>{valuta.cc}</p>
										</div>
										<div>
											<p>Курс</p>
											<p>{valuta.rate}</p>
										</div>
									</li>
							  ))
							: ''}
					</ul>
				</div>
			</div>
			<div className={styles.calculatorValuta}>
				<h1 style={{ position: 'absolute', top: '48px' }}>Конвертер валют</h1>
				<div className={styles.calculatorContainer}>
					<div>
						<select value={valuta} onChange={e => setValuta(e.target.value)}>
							<option value=''>-- Виберіть валюту --</option>
							{data.length > 0
								? data.map(valuta => (
										<option key={valuta.r030} value={valuta.rate}>
											{valuta.cc} - {valuta.txt}
										</option>
								  ))
								: ''}
						</select>
					</div>
					<div>
						<select
							value={convertValuta}
							onChange={e => setConvertValuta(e.target.value)}
						>
							<option value=''>-- Виберіть валюту для конвертації --</option>
							{data.length > 0
								? data.map(valuta => (
										<option key={valuta.r030} value={valuta.rate}>
											{valuta.cc} - {valuta.txt}
										</option>
								  ))
								: ''}
						</select>
					</div>
					<div>
						<input
							type='number'
							placeholder='Введіть суму'
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<button onClick={handleConvert}>Конвертувати</button>
					{result && (
						<div>
							<h2>Результат: {result}</h2>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
