import { selectors } from "./selectors";

export const login = (email, password) => {
  cy.get(selectors.login.emailInput).clear().type(email);
  cy.get(selectors.login.passwordInput).clear().type(password);
  cy.get(selectors.login.loginButton).click();
};

export const verifyNotesCount = (count) => {
  cy.get(selectors.notes.note).should("have.length", count);
};

export const addNote = (title, body) => {
  cy.get(selectors.notes.addNoteButton).click();
  cy.get(selectors.notes.noteTitleInput).type(title);
  cy.get(selectors.notes.noteBodyInput).type(body);
  cy.get(selectors.notes.saveNoteButton).click();
};

export const editNote = (index, newTitle, newBody) => {
  cy.get(selectors.notes.note)
    .eq(index)
    .within(() => {
      cy.get(selectors.notes.editButton).click();
    });
  cy.get(selectors.notes.noteTitleInput).clear().type(newTitle);
  cy.get(selectors.notes.noteBodyInput).clear().type(newBody);
  cy.get(selectors.notes.saveNoteButton).click();
};

export const deleteNote = (index) => {
  cy.get(selectors.notes.note)
    .eq(index)
    .within(() => {
      cy.get(selectors.notes.deleteButton).click();
    });
};
