import { FC } from 'react';

import { RenderLayoutProps } from '../types/interfaces';

import styles from '../styles/RenderLayout.module.css'

const RenderLayout: FC<RenderLayoutProps> = ({ cancelAction }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <div className={styles.analyzingText}>Analyzing...</div>
                <button className={styles.cancelButton} onClick={cancelAction}>Cancel</button>
            </div>
        </div>
    )
}
export default RenderLayout;