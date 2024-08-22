import { FC } from 'react'

import { Action } from '../types/interfaces';

import styles from '../styles/RecentActionItem.module.css'

const RecentActionItem: FC<Action> = ({ id, link, obfuscated, action_date }) => <li key={id} className={styles.recentActionItem}>
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.recentActionLink}>
        <span className={styles.recentActionText}>r/{obfuscated}</span>{' '}
        <span className={styles.recentActionDate}>{action_date} (UTC)</span>
    </a>
</li>

export default RecentActionItem;