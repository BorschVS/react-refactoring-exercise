import axios from "axios";
import { Action, UserFormData } from "../types/interfaces";

axios.defaults.baseURL = "http://localhost:3000/";

export const fetchPreviousActions = async () => {
  try {
    const response = await axios.get<Action[]>("actions", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    data.sort(
      (prev: Action, next: Action) => +new Date(next.actiond_date) - +new Date(prev.actiond_date)
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch recent actions", error);
  }
};

export const postUserAction = async (formData: UserFormData, controller: AbortController) => {
  try {
    const response = await axios.post("usersActions", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    const data = response.data;
    window.open(`http://localhost:3000/usersActions/${data.id}`, "_blank", "noopener, noreferrer");
    window.location.reload();
  } catch (error) {
    console.error("Failed to post user action", error);
  }
};
