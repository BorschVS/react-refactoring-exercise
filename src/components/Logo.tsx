import { FC } from 'react';

import logoUrl from '../img/logo.png'

import styles from '../styles/Logo.module.css'

const Logo: FC = () => (
    <div className={styles.thumb}>
        <img
            src={logoUrl}
            alt="Logo"
            width={40}
            height={40}
        />
    </div>)

export default Logo;