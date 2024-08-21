import { FC } from "react";
import { RecentsProps } from "../types/interfaces";

import styles from '../styles/Recents.module.css'

const Recents: FC<RecentsProps> = ({ recentActions }) => (<article className={styles.article}>
    <h3 className={styles.articleTitle}>Recents</h3>
    <div className={styles.recentActionsWrapper}>
        <ul className={styles.recentActionsList}>
            {recentActions.map(({ id, link, obfuscated, actiond_date }) => (
                <li key={id} className={styles.recentActionItem}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.recentActionLink}>
                        <span className={styles.recentActionText}>r/{obfuscated}</span>{' '}
                        <span className={styles.recentActionDate}>{actiond_date} (UTC)</span>
                    </a>
                </li>
            ))}
        </ul>
    </div>
</article>)

export default Recents;