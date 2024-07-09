import React, { useEffect, useReducer } from "react";
import Notes from "./Notes";
import { fetchNotesBackend } from "../backend";
import reducer, { initialState } from "./reducerNotes";
import EditingContext from "../context";

// import { checkAccess } from "../backend";

function NotesFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchNotes() {
    const notes = await fetchNotesBackend();
    dispatch({ type: "FETCH_NOTES", payload: notes });
  }
  useEffect(() => {
    fetchNotes();
  }, [history]);
  return (
    <>
      <EditingContext.Provider value={{ state, dispatch }}>
        <Notes day={"m"} dayTitle={"Poniedziałek"} />
        <Notes day={"t"} dayTitle={"Wtorek"} />
        <Notes day={"w"} dayTitle={"Środa"} />
        <Notes day={"th"} dayTitle={"Czwartek"} />
        <Notes day={"f"} dayTitle={"Piątek"} />
        <Notes day={"s"} dayTitle={"Sobota"} />
        <Notes day={"su"} dayTitle={"Niedziela"} />
      </EditingContext.Provider>
    </>
  );
}

export default NotesFetch;
