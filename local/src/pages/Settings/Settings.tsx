import React from 'react'
import { Link } from 'react-router-dom'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import styles from './Settings.module.scss'

export const Settings: React.FC = () => {
	return (
		<div className={styles.settings}>
			<div className={styles.btnDelete}>
				<Link to='/deleteCard'>
					<button>Видалити карту</button>
				</Link>
			</div>
			<div className={styles.userInfo}>
				<UserInfo />
			</div>
		</div>
	)
}
