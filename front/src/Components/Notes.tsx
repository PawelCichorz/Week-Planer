import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import * as S from "./NotesStyles";
import { checkAccess } from "../backend";

type NotesProps = {
  day: string;
  dayTitle: string;
};

function Notes({ day, dayTitle }: NotesProps) {
  const history = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("lastActivity", Date.now().toString());

    const handleUserActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    const checkAccessAndClearTokens = async () => {
      const lastActivity = parseInt(
        localStorage.getItem("lastActivity") || "0",
        10,
      );
      const currentTime = Date.now();
      const activityTimeout = 600000;

      if (currentTime - lastActivity > activityTimeout) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/logowanie");
      } else {
        await checkAccess(history);
      }
    };

    const intervalId = setInterval(checkAccessAndClearTokens, 580000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Container>
      <NoteForm
        day={day}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        dayTitle={dayTitle}
      />
      <NotesList
        day={day}
        dayTitle={dayTitle}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
    </S.Container>
  );
}

export default Notes;
