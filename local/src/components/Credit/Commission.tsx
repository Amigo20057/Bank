import React from 'react'
import styles from '../../pages/Credit/Credit.module.scss'

import { CommissionSelectorProps } from '../../types/loanComponentTypes'

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
