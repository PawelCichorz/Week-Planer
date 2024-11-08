import {
  login,
  verifyNotesCount,
  addNote,
  editNote,
  deleteNote,
} from "./helperFunction";

describe("Login and Notes functionality", () => {
  before(() => {
    cy.intercept("POST", "/logowanie").as("loginRequest");

    // Odwiedź stronę logowania
    cy.visit("http://localhost:3000/logowanie");

    // Zaloguj się
    login("Pawel@o2.pl", "Pawel2");
    cy.setLocalStorage("accessToken", "fakeAccessToken");
    cy.setLocalStorage("refreshToken", "fakeRefreshToken");
  });
  beforeEach(() => {
    // Interceptowanie żądań
    cy.visit("http://localhost:3000/notes");
    cy.intercept("GET", "/notes", {
      statusCode: 200,
      body: [
        {
          _id: "note1",
          title: "Note 1",
          body: "Content of note 1",
          userId: "user1",
          day: "m",
        },
        {
          _id: "note2",
          title: "Note 2",
          body: "Content of note 2",
          userId: "user1",
          day: "m",
        },
        {
          _id: "note3",
          title: "Note 3",
          body: "Content of note 3",
          userId: "user1",
          day: "m",
        },
      ],
    }).as("notesRequest");
  });

  it("should display 3 notes", () => {
    verifyNotesCount(3);
  });

  it("should add a new note", () => {
    cy.intercept("POST", "/notes", {
      statusCode: 201,
      body: {
        _id: "note4",
        title: "New Note",
        body: "Content of new note",
        userId: "user1",
        day: "m",
      },
    }).as("addNoteRequest");

    addNote("New Note", "Content of new note");
    cy.wait("@addNoteRequest");
    verifyNotesCount(4);
    cy.contains("New Note").should("be.visible");
  });

  it("should edit an existing note", () => {
    cy.intercept("PUT", "/notes/note2", {
      statusCode: 200,
      body: {
        _id: "note2",
        title: "Updated Note 2",
        body: "Updated content of note 2",
        userId: "user1",
        day: "m",
      },
    }).as("editNoteRequest");

    editNote(1, "Updated Note 2", "Updated content of note 2");
    cy.wait("@editNoteRequest");
    cy.contains("Updated Note 2").should("be.visible");
  });

  it("should delete a note", () => {
    cy.intercept("DELETE", "/notes/note2", {
      statusCode: 200,
      body: {},
    }).as("deleteNoteRequest");

    deleteNote(1);
    cy.wait("@deleteNoteRequest");
    verifyNotesCount(2);
  });
});
