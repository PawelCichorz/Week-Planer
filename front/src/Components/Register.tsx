import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "./RegisterStyle";
import { emailValidate, passwordValidate } from "./registerValidate";
import { registerBackend } from "../backend";

function Register() {
  const history = useNavigate();

  interface FormData {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await registerBackend(data.email, data.password);
      history("/logowanie");
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    }
  };

  return (
    <S.Container
      className="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <S.EmailDiv className="email">
        <label> Email:</label>
        <S.Input
          type="email"
          {...register("email", {
            required: "Email jest wymagany",
            validate: emailValidate,
          })}
        />
        <p>{errors?.email?.message}</p>
      </S.EmailDiv>

      <S.PasswordDiv className="password">
        <label> Hasło:</label>
        <S.Input
          type="password"
          {...register("password", {
            required: "Hasło jest wymagane",
            validate: passwordValidate,
          })}
        ></S.Input>
        <p>{errors.password && errors.password.message}</p>
      </S.PasswordDiv>

      <S.Button>ZAREJESTRUJ</S.Button>
    </S.Container>
  );
}

export default Register;
