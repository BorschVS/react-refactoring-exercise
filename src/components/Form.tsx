import { FC, useEffect, useState } from 'react';

import { Logo } from '../components';

import { FormProps } from '../types/interfaces';
import { fetchPreviousActions } from '../api/operations';

import styles from '../styles/Form.module.css'

const Form: FC<FormProps> = ({ handleSubmit, setFormData, setIsFormValid, recentActions, isFormValid, isProcessing }) => {
    const [userPersona, setUserPersona] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [numberOfVisits, setNumberOfVisits] = useState<number>(0);
    const [companyNumber, setCompanyNumber] = useState<string>('');
    const [numberIncorrect, setNumberIncorrect] = useState<boolean>(false);

    useEffect(() => {
        if (!recentActions) {
            fetchPreviousActions()
        }
        setIsFormValid(!!startDate && !!endDate && numberOfVisits >= 0 && new Date(endDate) > new Date(startDate))
    }, [setIsFormValid, numberOfVisits, startDate, endDate, recentActions]);

    useEffect(() => {
        setFormData({
            userPersona, startDate, endDate, numberOfVisits
        })
    }, [setFormData, userPersona, startDate, endDate, numberOfVisits])

    const handleSubmitCompanyNumber = (companyNumber: string) => {
        setCompanyNumber(companyNumber)
        if (companyNumber.length < 9) {
            setNumberIncorrect(true);
        } else {
            setNumberIncorrect(false);
        }
    }

    return numberIncorrect ? (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <div className={styles.formWrapper}>
                <div className={styles.title}>Tool</div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="company_number" className={styles.label}>
                        Enter your credentials
                    </label>
                    <input
                        type="text"
                        name="company_number"
                        id="company_number"
                        placeholder="Company Number"
                        value={companyNumber}
                        onChange={(e) => setCompanyNumber(e.target.value)}
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        onClick={() => handleSubmitCompanyNumber(companyNumber)}
                        className={styles.submitButton}
                    >
                        <span>Login</span>
                        <span>&gt;</span>
                    </button>
                    {numberIncorrect && (
                        <span className={styles.errorMessage}>
                            The number you entered is incorrect
                        </span>
                    )}
                </form>
            </div>
        </div>
    ) : (
        <div className={styles.container}>
            <div className={styles.title}>New action</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label className={styles.label}>
                        Visits
                        <span className={styles.optionalText}>(optional)</span>
                    </label>
                    <input
                        type="number"
                        value={numberOfVisits}
                        onChange={(e) => setNumberOfVisits(parseInt(e.target.value))}
                        className={styles.input}
                    />
                    <label className={`${styles.label} form-label`}>
                        Define a user persona{' '}
                        <span className={styles.optionalText}>(optional)</span>
                    </label>
                    <input
                        type="text"
                        id="posts-input"
                        value={userPersona}
                        onChange={(e) => setUserPersona(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <label className={`${styles.label}`}>
                    Time period{' '}
                    <span className={styles.optionalText}>(available for dates before June 2024)</span>
                </label>

                <div id="time-input" className={styles.timeInput}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.dateInput}
                    />
                    <span className={styles.toText}>to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>
                <button
                    type="submit"
                    className={`${styles.nextButton} ${isFormValid ? styles.active : ''}`}
                    disabled={!isFormValid || isProcessing}
                >
                    <span>Begin</span>
                    <span>→</span>
                </button>
            </form>
        </div >)
}

export default Form;