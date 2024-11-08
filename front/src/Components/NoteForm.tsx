import { useContext, useEffect, useRef } from "react";
import React from "react";

import * as S from "./NoteFormStyles";
import { addNoteBackend, editNoteBackend } from "../backend";
import EditingContext from "../context";

type NotesProps = {
  day: string;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  dayTitle: string;
};

function NoteForm({ day, setModalOpen, modalOpen, dayTitle }: NotesProps) {
  const { state, dispatch } = useContext(EditingContext);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        openModal();
      }
    }

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen, dispatch]);
  const openModal = () => {
    setModalOpen(!modalOpen);
  };
  const addNote = async (day: string) => {
    console.log(day);
    const newNote = await addNoteBackend(
      state.editNote!.title,
      state.editNote!.body,
      day,
    );

    dispatch({ type: "SET_NOTES", payload: newNote });
    openModal();
    dispatch({ type: "SET_EDITNOTE", payload: null });
  };

  const funEditNote = async () => {
    if (state.editNote) {
      const updatedNote = await editNoteBackend(state.editNote);
      dispatch({ type: "UPDATE_NOTE", payload: updatedNote });

      openModal();
      dispatch({ type: "SET_EDITNOTE", payload: null });
    } else {
      console.log("null");
    }
  };

  const saveNote = async () => {
    console.log(day);
    if (state.isEditing) {
      await funEditNote();
    } else {
      await addNote(day);
    }
  };

  useEffect(() => {
    if (state.modalOpen) {
      titleInputRef.current?.focus();
    }
  }, [state.modalOpen]);

  return (
    <S.Container>
      <S.ModalDiv $modalOpen={modalOpen} ref={modalRef}>
        <S.EditNoteDiv>
          <S.Label>Godzina:</S.Label>
          <S.Input
            ref={titleInputRef}
            value={state.editNote?.title || ""}
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EDIT_NOTE",
                payload: { title: e.target.value },
              })
            }
            data-testid={dayTitle + "input"}
          />
          <S.Label>Opis:</S.Label>
          <S.Input
            value={state.editNote?.body || ""}
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EDIT_NOTE",
                payload: { body: e.target.value },
              })
            }
            data-testid={dayTitle + "body"}
          />
        </S.EditNoteDiv>

        <S.Button onClick={() => saveNote()} data-testid={dayTitle + "save"}>
          {state.isEditing ? "Zapisz" : "Dodaj"}
        </S.Button>
        <S.Button
          // onClick={() => dispatch({ type: "SET_MODALOPEN", payload: false })}
          onClick={() => openModal()}
        >
          Anuluj
        </S.Button>
      </S.ModalDiv>
    </S.Container>
  );
}

export default NoteForm;
