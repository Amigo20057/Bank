import React from 'react'
import styles from '../../module/Credit.module.scss'

interface CommissionSelectorProps {
	commission: number
	setCommission: (value: number) => void
}

export const Commission: React.FC<CommissionSelectorProps> = ({
	commission,
	setCommission,
}) => {
	return (
		<div>
			<h3>Ставка щомісячної комісії</h3>
			<ul>
				{[2.5, 3, 4.25, 5].map(value => (
					<li key={value}>
						<button
							className={commission === value ? styles.focus : ''}
							onClick={() => setCommission(value)}
						>
							{value}%
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
