describe("Login and Notes functionality", () => {
  it("should display error message on invalid login and redirect on valid login, then show 3 notes", () => {
    // Intercept the login request
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

    // Intercept the notes request and respond with 3 notes
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

    cy.intercept("DELETE", "/notes/note1", {
      statusCode: 200,
      body: {},
    }).as("deleteNoteRequest");
    // Odwiedź stronę logowania
    cy.visit("http://localhost:3000/logowanie");

    // Wprowadź błędne dane logowania
    cy.get("input#email").type("Palacz@o2.pl");
    cy.get("input#password").type("Palacz1");
    cy.get('button[data-testid="login-button"]').click();

    // Oczekuj komunikatu błędu
    cy.contains("Nieprawidłowy email lub hasło").should("be.visible");

    // Wprowadź poprawne dane logowania
    cy.get("input#email").clear().type("Pawel@o2.pl");
    cy.get("input#password").clear().type("Pawel2");
    cy.get('button[data-testid="login-button"]').click();
    cy.wait("@notesRequest");
    // Oczekuj przekierowania do /notes
    cy.url().should("include", "/notes");

    // Poczekaj na załadowanie notatek

    // Sprawdź, czy są trzy notatki na stronie
    cy.get('[data-testid="note"]').should("have.length", 3);

    // Kliknij przycisk "Usuń" dla pierwszej notatki
    cy.get('[data-testid="note"]')
      .first()
      .within(() => {
        cy.get('button[data-testid="delete-button"]').click();
      });

    // Poczekaj na wykonanie DELETE requestu
    cy.wait("@deleteNoteRequest");

    // Sprawdź, czy są dwie notatki na stronie
    cy.get('[data-testid="note"]').should("have.length", 2);
  });
});
