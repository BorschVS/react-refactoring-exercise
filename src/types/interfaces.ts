import { Dispatch, FormEvent, SetStateAction } from "react";

export interface Action {
  id: string;
  link: string;
  obfuscated: string;
  actiond_date: string;
}

export interface UserFormData {
  userPersona: string;
  startDate: string;
  endDate: string;
  numberOfVisits: number;
}

export interface RenderLayoutProps {
  cancelAction: () => void;
}

export interface FormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setFormData: Dispatch<React.SetStateAction<UserFormData | undefined>>;
  setIsFormValid: Dispatch<SetStateAction<boolean>>;
  isFormValid: boolean;
  isProcessing: boolean;
}

export interface RecentsProps {
  recentActions: Action[];
}
