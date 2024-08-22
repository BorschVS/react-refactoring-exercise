import { FC } from 'react';

import { RecentActionItem } from '../components';

import { RecentsProps } from '../types/interfaces';

import styles from '../styles/RecentActionsList.module.css'

const RecentActionsList: FC<RecentsProps> = ({ recentActions }) => (<article className={styles.article}>
    <h3 className={styles.articleTitle}>Recents</h3>
    <div className={styles.recentActionsWrapper}>
        <ul className={styles.recentActionsList}>
            {recentActions.map(({ id, link, obfuscated, action_date }) => (
                <RecentActionItem id={id} link={link} obfuscated={obfuscated} action_date={action_date} />
            ))}
        </ul>
    </div>
</article>)

export default RecentActionsList;