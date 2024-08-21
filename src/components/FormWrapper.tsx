import { FormEvent, useState } from "react"
import RenderLayout from "./RenderLayout"
import { formatDate } from "../utils/formatDate"
import { UserFormData } from "../types/interfaces"
import { postUserAction } from "../api/operations"
import Form from "./Form"

import styles from '../styles/FormWrapper.module.css'

const FormWrapper = () => {
    const [formData, setFormData] = useState<UserFormData>();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

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
            />
            <div id="divider" className={styles.divider}></div>
        </div>
        {showOverlay && <RenderLayout cancelAction={handleCancelAction} />}
    </div>
}

export default FormWrapper