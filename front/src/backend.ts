import { AxiosError } from "axios";

import { apiUrl, baseUrl } from "./BackendPaths";
import axios from "./Components/axiosAurotization";
import { Note } from "./Components/type";

axios.defaults.withCredentials = true;

export async function fetchNotesBackend() {
  const res = await axios.get(apiUrl, {});
  return res.data;
}

export async function deleteNoteBackend(id: string) {
  await axios.delete(`${apiUrl}/${id}`);
}

export async function addNoteBackend(title: string, body: string, day: string) {
  const res = await axios.post(
    apiUrl,
    {
      title,
      body,
      day,
    },
    { withCredentials: true },
  );
  return res.data;
}

export async function editNoteBackend(note: Note) {
  const res = await axios.put(`${apiUrl}/${note._id}`, note);
  return res.data;
}

export async function loginBackend(email: string, password: string) {
  const res = await axios.post(`${baseUrl}/logowanie`, {
    email,
    password,
  });
  return res;
}

export async function registerBackend(email: string, password: string) {
  const res = await axios.post(`${baseUrl}/zarejestruj`, {
    email,
    password,
  });
  return res;
}

export async function refreshAccessToken(history: any) {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.log("No refresh token found, redirecting to login...");
    history("/logowanie");
    return null;
  }

  try {
    const response = await axios.post(`${baseUrl}/refresh-token`, {
      refreshToken,
    });
    const newAccessToken = response.data.accessToken;
    console.log(newAccessToken);
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (refreshError) {
    console.log("Refresh token is invalid. Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history("/logowanie");
    return null;
  }
}

export async function checkAccess(history: any) {
  let accessToken = localStorage.getItem("accessToken");
  console.log("Checking access with token:", accessToken);

  if (!accessToken) {
    console.log("No token found, redirecting to login...");
    history("/logowanie");
    return;
  }

  try {
    await axios.get(apiUrl);
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      // Sprawdzenie czy error jest AxiosError
      console.log("Token is invalid or expired. Trying to refresh...");
      accessToken = await refreshAccessToken(history);
      if (accessToken) {
        // Save new token in localStorage
        localStorage.setItem("accessToken", accessToken);
        try {
          await axios.get(apiUrl);
        } catch (secondError) {
          console.log("Second attempt failed. Logging out...");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          history("/logowanie");
        }
      } else {
        console.log("Unable to refresh access token. Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/logowanie");
      }
    } else {
      console.error("Error during access check:", error);
      history("/logowanie");
    }
  }
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const res = await axios.put(`${baseUrl}/change-password`, {
    oldPassword,
    newPassword,
  });
  return res.data;
}

export async function changePasswordWithToken(
  oldPassword: string,
  newPassword: string,
  token: string,
) {
  const res = await axios.put(`${baseUrl}/change-password?token=${token}`, {
    oldPassword,
    newPassword,
  });
  return res.data;
}

export async function sendResetPasswordEmail(email: string) {
  console.log(email);
  const res = await axios.put(`${baseUrl}/reset-password`, { email });
  return res.data;
}
