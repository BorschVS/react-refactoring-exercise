import { Action, UserFormData } from "../types/interfaces";

export const fetchPreviousActions = async () => {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    data.sort(
      (prev: Action, next: Action) => +new Date(next.actiond_date) - +new Date(prev.actiond_date)
    );
  } catch (error) {
    console.error("Failed to fetch recent actions", error);
  }
};

export const postUserAction = async (formData: UserFormData, controller: AbortController) => {
  const response = await fetch("http://localhost:3000/usersPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    signal: controller.signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  window.open("http://localhost:3000/actions/" + data.id, "_blank", "noopener, noreferrer");
  window.location.reload();
};
