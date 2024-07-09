import React from "react"; // Dodaj ten import na początku pliku testowego
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Components/Login"; // Upewnij się, że ścieżka do komponentu Login jest poprawna
import { BrowserRouter as Router } from "react-router-dom";

// Mockowanie funkcji loginBackend dla potrzeb testów
jest.mock("./backend", () => ({
  loginBackend: async (email: string, password: string) => {
    if (password === "poprawne-haslo") {
      return {
        data: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          userId: "mock-user-id",
        },
      };
    } else {
      throw new Error("Nieprawidłowy email lub hasło");
    }
  },
}));

describe("Komponent Login", () => {
  it("Wyświetla komunikat błędu dla niepoprawnego hasła", async () => {
    const onLoginSuccess = jest.fn();
    const { getByLabelText, getByText } = render(
      <Router>
        <Login onLoginSuccess={onLoginSuccess} />
      </Router>,
    );

    // Wypełnienie formularza niepoprawnym hasłem
    fireEvent.change(getByLabelText("Email:"), {
      target: { value: "Pawel@o2.pl" },
    });
    fireEvent.change(getByLabelText("Hasło:"), {
      target: { value: "niepoprawne-haslo" },
    });

    fireEvent.click(getByText("ZALOGUJ"));

    // Oczekiwanie na asynchroniczną walidację i wyświetlenie komunikatu błędu
    await waitFor(() => {
      expect(getByText(/Nieprawidłowy email lub hasło/)).toBeInTheDocument();
    });

    // Sprawdzenie, czy callback onLoginSuccess nie został wywołany
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });
});
