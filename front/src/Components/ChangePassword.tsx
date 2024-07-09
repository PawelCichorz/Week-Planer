import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { changePassword, changePasswordWithToken } from "../backend";
import * as S from "./ChangePasswordStyles";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{
    oldPassword: string;
    newPassword: string;
  }>();
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);
  console.log(token);
  const onSubmit = async () => {
    try {
      const { oldPassword, newPassword } = getValues();
      if (token) {
        await changePasswordWithToken(oldPassword, newPassword, token);
        setMessage("Hasło zmienione pomyślnie");

        history("/logowanie");
      } else {
        await changePassword(oldPassword, newPassword);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/logowanie");
        setMessage("Hasło zmienione pomyślnie");
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.error || "Wystąpił błąd podczas zmiany hasła.",
      );
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <S.Label>Stare Hasło:</S.Label>
      <S.Input
        type="password"
        {...register("oldPassword", { required: "To pole jest wymagane" })}
      />
      {errors.oldPassword && <p>{errors.oldPassword.message}</p>}

      <S.Label>Nowe Hasło:</S.Label>
      <S.Input
        type="password"
        {...register("newPassword", { required: "To pole jest wymagane" })}
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}

      <S.Button>Zmień Hasło</S.Button>
      <p>{message}</p>
    </S.Container>
  );
}

export default ChangePassword;
