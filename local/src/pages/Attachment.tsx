import { useState } from "react";
import styles from "../module/Attachment.module.scss";

export const Attachment: React.FC = () => {
	const [state, setState] = useState(0);

	return (
		<div className={styles.attachment}>
			<h1>Вкладення</h1>
			<div className={styles.container}></div>
		</div>
	);
};
