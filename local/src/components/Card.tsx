import React, { useState } from 'react'
import { ICard } from '../types/cardTypes'

import styles from '../module/Card.module.scss'

export const Card: React.FC<ICard> = ({
	_id,
	cardNumber,
	balance,
	month,
	year,
	cvv,
}) => {
	const [reverse, setReverse] = useState(false)

	const handleTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
	}

	return (
		<>
			<div
				onClick={() => setReverse(!reverse)}
				className={!reverse ? styles.container : styles.reverse}
			>
				<div className={styles.date}>
					<h3 onClick={handleTextClick}>Карта</h3>
					<div onClick={handleTextClick}>
						<span>{month}</span>
						<span>/</span>
						<span>{year}</span>
					</div>
				</div>
				<div className={styles.balance}>
					<h2 onClick={handleTextClick}>{balance}</h2>
					<span>$</span>
				</div>
				<div className={styles.numberCard}>
					<h3 onClick={handleTextClick}>{cardNumber}</h3>
				</div>
				<div onClick={handleTextClick} className={styles.cvv}>
					<h4>CVV:</h4>
					<span>{cvv}</span>
				</div>
			</div>
		</>
	)
}
