import { FC, FormEvent, useEffect, useState } from 'react'

import { Form, RenderLayout, RecentActionsList } from '../components'

import { formatDate } from '../utils/formatDate'
import { Action, UserFormData } from '../types/interfaces'
import { fetchPreviousActions, postUserAction } from '../api/operations'

import styles from '../styles/Actions.module.css'

const Actions: FC = () => {
    const [formData, setFormData] = useState<UserFormData>();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [recentActions, setRecentActions] = useState<Action[] | []>([]);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const data = await fetchPreviousActions();
                setRecentActions(data ?? []);
            } catch (error) {
                console.error("Failed to fetch previous actions:", error);
            }
        };
        fetchActions();
    }, [])

    const callBackendAPI = async (formData: UserFormData) => {
        const controller = new AbortController()
        setAbortController(controller)
        formData.startDate = formatDate(formData.startDate)
        formData.endDate = formatDate(formData.endDate)

        try {
            await postUserAction(formData, controller)
            setShowOverlay(false)
        } catch (error) {
            console.error("Error posting formData", error)
        } finally {
            setShowOverlay(false)
            setIsProcessing(false)
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormValid) return;

        setShowOverlay(true);
        setIsProcessing(true);

        try {
            if (formData) {
                await callBackendAPI(formData);
            } else {
                console.error('Form data is undefined');
            }
        } catch (error) {
            console.error('Error calling backend API:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancelAction = () => {
        if (abortController) {
            abortController.abort()
        }
        setShowOverlay(false)
        setIsProcessing(false)
    }

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <Form
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                setIsFormValid={setIsFormValid}
                isFormValid={isFormValid}
                isProcessing={isProcessing}
                recentActions={recentActions}
            />
            <div id="divider" className={styles.divider}></div>
            <RecentActionsList recentActions={recentActions} />
        </div>
        {showOverlay && <RenderLayout cancelAction={handleCancelAction} />}
    </div>
}

export default Actions;