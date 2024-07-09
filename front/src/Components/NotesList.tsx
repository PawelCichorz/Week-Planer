import React, { useContext } from "react";
import * as S from "./NotesListStyles";
import { Note } from "./type";
import { deleteNoteBackend } from "../backend";
import EditingContext from "../context";

type NotesListProps = {
  day: string;
  dayTitle: string;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void; // Poprawiony typ setModalOpen
};

function NotesList({ dayTitle, day, setModalOpen }: NotesListProps) {
  const { state, dispatch } = useContext(EditingContext);

  // async function fetchNotes() {
  //   const notes = await fetchNotesBackend(day);
  //   dispatch({ type: "FETCH_NOTES", payload: notes });
  // }
  // useEffect(() => {
  //   fetchNotes();
  // }, [day]);

  async function deleteNote(id: string) {
    await deleteNoteBackend(id);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  const openModalToEdit = (note: Note) => {
    setModalOpen(true);
    dispatch({ type: "SET_MODALOPEN", payload: true });
    dispatch({ type: "SET_ISEDITING", payload: true });

    dispatch({
      type: "SET_EDITNOTE",
      payload: note,
    });
    console.log(day);
  };

  const openModalToAdd = () => {
    setModalOpen(true);

    dispatch({ type: "SET_ISEDITING", payload: false });

    dispatch({
      type: "SET_EDITNOTE",
      payload: { _id: "", title: "", body: "", day: "" },
    });
    console.log(day);
  };

  const filteredNotes = state.notesDay.filter((note: Note) => note.day === day);

  return (
    <S.Container>
      <S.DayofWeek>{dayTitle}</S.DayofWeek>
      {filteredNotes.map((notatka) => (
        <S.OneFetchNotes key={notatka._id}>
          <S.TimeandDesc>
            <S.Time>Godzina:</S.Time> <div>{notatka.title}</div>
          </S.TimeandDesc>
          <S.TimeandDesc>
            <S.Time>Opis:</S.Time>
            <div>{notatka.body}</div>
          </S.TimeandDesc>
          <S.DivWithButton>
            <S.ButtonEdit onClick={() => openModalToEdit(notatka)}>
              Edytuj
            </S.ButtonEdit>
            <S.ButtonDelete onClick={() => deleteNote(notatka._id)}>
              Usuń
            </S.ButtonDelete>
          </S.DivWithButton>
        </S.OneFetchNotes>
      ))}
      <S.ButtonAddNote onClick={() => openModalToAdd()}>Dodaj</S.ButtonAddNote>
    </S.Container>
  );
}

export default NotesList;
