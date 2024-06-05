import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalDeleteCard } from '../components/ModalDeleteCard'
import styles from '../module/Settings.module.scss'

export const Settings: React.FC = () => {
	const [modalWindow, setModalWindow] = useState(false)

	return (
		<div className={styles.settings}>
			<div className={styles.btnDelete}>
				<button
					className={modalWindow ? styles.click : ''}
					onClick={() => setModalWindow(!modalWindow)}
				>
					Видалити карту
				</button>
			</div>
			{modalWindow && (
				<>
					{createPortal(
						<>
							<div className={styles.bgFilter}></div>
							<ModalDeleteCard setModalWindow={setModalWindow} />
						</>,
						document.getElementById('root')
					)}
				</>
			)}
		</div>
	)
}
