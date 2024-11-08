import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "./LoginStyles";
import { loginBackend } from "../backend";

type LoginProps = {
  onLoginSuccess: (data: any) => void;
};

function Login({ onLoginSuccess }: LoginProps) {
  const [loginError, setLoginError] = useState<string | null>(null);
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: any) => {
    try {
      const response = await loginBackend(
        getValues("email"),
        getValues("password"),
      );

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      console.log("onLoginSuccess is called with:", response.config.data);

      onLoginSuccess(response.config.data);

      history("/notes");
    } catch (error: any) {
      setLoginError("Nieprawidłowy email lub hasło");
    }
    console.log(value);
  };

  return (
    <S.Container method="POST" onSubmit={handleSubmit(onSubmit)}>
      <S.EmailDiv>
        <label htmlFor="email">Email:</label>
        <S.Input
          id="email"
          type="email"
          {...register("email", { required: "Email jest wymagany" })}
        />
        {errors.email ? (
          <p> {errors.email.message as React.ReactNode} </p>
        ) : null}
      </S.EmailDiv>
      <S.PasswordDiv className="password">
        <label htmlFor="password">Hasło:</label>
        <S.Input
          id="password"
          type="password"
          {...register("password", { required: "Hasło jest wymagane" })}
        />
        {errors.password && <p>{errors.password.message as React.ReactNode}</p>}
      </S.PasswordDiv>
      {loginError && <p>{loginError}</p>}
      <S.Button data-testid="login-button" type="submit">
        ZALOGUJ
      </S.Button>
    </S.Container>
  );
}

export default Login;
