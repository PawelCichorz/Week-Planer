import React from "react";
import { State, initialState, Action } from "./Components/reducerNotes";

const EditingContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export default EditingContext;
