import React from 'react'
import { ICard } from '../types/cardTypes'

export const Card: React.FC<ICard> = ({
	_id,
	numberCard,
	month,
	year,
	cvv,
}) => {
	return (
		<>
			<div>{_id}</div>
			<div>{numberCard}</div>
			<div>{month}</div>
			<div>{year}</div>
			<div>{cvv}</div>
		</>
	)
}
