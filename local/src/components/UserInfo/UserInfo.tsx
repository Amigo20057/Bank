import { useSelector } from 'react-redux'
import styles from './UserInfo.module.scss'

export const UserInfo: React.FC = () => {
	const userData = useSelector(state => state.auth.data)

	if (!userData) {
		return <p>Loading...</p>
	}

	return (
		<div className={styles.userInfo}>
			<h1
				style={{
					textAlign: 'center',
					borderBottom: '1px solid #fff',
					fontSize: '25px',
					height: '90px',
					marginBottom: '20px',
				}}
			>
				Інформація про користувача
			</h1>
			<div>
				<p>FULL NAME : </p>
				<p>{userData.fullname}</p>
			</div>
			<div>
				<p>EMAIL : </p>
				<p>{userData.email}</p>
			</div>
		</div>
	)
}
