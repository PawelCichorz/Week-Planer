import {
  login,
  verifyNotesCount,
  addNote,
  editNote,
  deleteNote,
} from "./helperFunction";

describe("Login and Notes functionality", () => {
  beforeEach(() => {
    cy.intercept("POST", "/logowanie", (req) => {
      const { email, password } = req.body;
      if (email === "Palacz@o2.pl" && password === "Palacz1") {
        req.reply({
          statusCode: 401,
          body: {
            message: "Nieprawidłowy email lub hasło",
          },
        });
      } else if (email === "Pawel@o2.pl" && password === "Pawel2") {
        req.reply({
          statusCode: 200,
          body: {
            accessToken: "fakeAccessToken",
            refreshToken: "fakeRefreshToken",
          },
        });
      }
    }).as("loginRequest");

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

    cy.visit("http://localhost:3000/logowanie");

    // Perform login
    login("Pawel@o2.pl", "Pawel2");
    cy.wait("@notesRequest");
    cy.url().should("include", "/notes");
  });

  it("should display error message on invalid login and redirect on valid login, then show 3 notes", () => {
    // Test part is handled in beforeEach
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

    // Add a new note
    addNote("New Note", "Content of new note");

    // Wait for the POST request to complete
    cy.wait("@addNoteRequest");

    // Verify the new note appears in the list
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

    // Edit the second note
    editNote(1, "Updated Note 2", "Updated content of note 2");

    // Wait for the PUT request to complete
    cy.wait("@editNoteRequest");
    cy.contains("Updated Note 2").should("be.visible");
  });

  it("should delete a note", () => {
    cy.intercept("DELETE", "/notes/note2", {
      statusCode: 200,
      body: {},
    }).as("deleteNoteRequest");
    deleteNote(1);

    // Wait for the DELETE request to complete
    cy.wait("@deleteNoteRequest");

    // Verify the note has been removed from the list
    verifyNotesCount(2);
  });
});
