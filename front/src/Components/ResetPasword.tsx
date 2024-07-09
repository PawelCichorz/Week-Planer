import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendResetPasswordEmail } from "../backend";
import * as S from "./ResetPaswordStyles";

interface IFormInput {
  email: string;
}

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    const { email } = getValues(); // Używamy getValues do pobrania wartości email

    try {
      await sendResetPasswordEmail(email);

      setMessage("Email z linkiem resetującym hasło został wysłany.");
    } catch (error: any) {
      console.log(error);
      setMessage("Wystąpił błąd podczas wysyłania emaila.");
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <S.Label>Email:</S.Label>
      <S.Input
        type="email"
        {...register("email", { required: "To pole jest wymagane" })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <S.Button>Wyślij Email</S.Button>
      <p>{message}</p>
    </S.Container>
  );
}

export default ResetPassword;
