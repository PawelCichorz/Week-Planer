import { render, fireEvent, waitFor, act } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Components/Login";

// Mockowanie funkcji loginBackend dla potrzeb testów
jest.mock("./backend", () => ({
  loginBackend: async (email: string, password: string) => {
    console.log(email, password);
    if (password === "poprawne-haslo") {
      return {
        data: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          userId: "mock-user-id",
        },
        config: {
          data: { email, password },
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
    const { getByLabelText, getByText, getByTestId } = render(
      <Router>
        <Login onLoginSuccess={onLoginSuccess} />
      </Router>,
    );

    // Wypełnienie formularza niepoprawnym hasłem
    await act(async () => {
      fireEvent.change(getByLabelText("Email:"), {
        target: { value: "Pawel@o2.pl" },
      });
      fireEvent.change(getByLabelText("Hasło:"), {
        target: { value: "niepoprawne-haslo" },
      });
      const loginButton = getByTestId("login-button");
      fireEvent.click(loginButton);
    });

    // Oczekiwanie na asynchroniczną walidację i wyświetlenie komunikatu błędu
    await waitFor(() => {
      expect(getByText(/Nieprawidłowy email lub hasło/)).toBeInTheDocument();
    });

    // Sprawdzenie, czy callback onLoginSuccess nie został wywołany
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });

  it("użytkownik podaje właściwe hasło", async () => {
    const onLoginSuccess = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <Router>
        <Login onLoginSuccess={onLoginSuccess} />
      </Router>,
    );

    // Wypełnienie formularza poprawnym hasłem
    await act(async () => {
      fireEvent.change(getByLabelText("Email:"), {
        target: { value: "Pawel@o2.pl" },
      });
      fireEvent.change(getByLabelText("Hasło:"), {
        target: { value: "poprawne-haslo" },
      });
      const loginButton = getByTestId("login-button");
      fireEvent.click(loginButton);
    });

    // Oczekiwanie na asynchroniczną walidację
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalled();
      expect(onLoginSuccess).toHaveBeenCalledWith({
        email: "Pawel@o2.pl",
        password: "poprawne-haslo",
      });
    });
  });
});
