import React from 'react'
import styles from '../../module/Credit.module.scss'

interface TermSelectorProps {
	term: number
	setTerm: (value: number) => void
}

export const Term: React.FC<TermSelectorProps> = ({ term, setTerm }) => {
	return (
		<div>
			<h3>Строк кредиту в місяцях</h3>
			<ul>
				{[12, 24, 36, 48, 60].map(value => (
					<li key={value}>
						<button
							className={term === value ? styles.focus : ''}
							onClick={() => setTerm(value)}
						>
							{value}міс.
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
