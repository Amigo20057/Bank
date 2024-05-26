import {
	CircleDollarSign,
	CreditCard,
	HandCoins,
	Headphones,
	Landmark,
	LogOut,
	Settings,
} from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../module/SideBar.module.scss'

export const SideBar: React.FC = () => {
	const [active, setActive] = useState(1)

	return (
		<div className={styles.sideBar}>
			<div className={styles.profile}>
				<div className={styles.avatar}></div>
				<h3>Full Name</h3>
			</div>
			<div className={styles.menu}>
				<ul>
					<li className={active === 1 ? styles.active : ''}>
						<CreditCard size={36} />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(1)}
							to='/'
						>
							Карти
						</Link>
					</li>
					<li className={active === 2 ? styles.active : ''}>
						<HandCoins />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(2)}
							to='/attachment'
						>
							Вкладення
						</Link>
					</li>
					<li className={active === 3 ? styles.active : ''}>
						<Landmark />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(3)}
							to='/credits'
						>
							Кредити
						</Link>
					</li>
					<li className={active === 4 ? styles.active : ''}>
						<CircleDollarSign />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(4)}
							to='/valuta'
						>
							Валюта
						</Link>
					</li>
				</ul>
			</div>
			<div className={styles.settings}>
				<ul>
					<li className={active === 6 ? styles.active : ''}>
						<Settings />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(6)}
							to='/settings'
						>
							Налаштування
						</Link>
					</li>
					<li className={active === 7 ? styles.active : ''}>
						<Headphones />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(7)}
							to='/supports'
						>
							Допомога
						</Link>
					</li>
					<li className={active === 8 ? styles.active : ''}>
						<LogOut />
						<Link
							style={{ marginLeft: '15px' }}
							onClick={() => setActive(8)}
							to='/logout'
						>
							Вийти
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
