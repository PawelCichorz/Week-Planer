import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as S from "./MainStyles";

type MainProps = {
  session: any;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 45px;
  color: red;
`;

const StyledLinks = styled(Link)`
  text-decoration: none;
  padding-top: 20px;
  font-size: 20px;
  color: red;
`;

function Main({ session }: MainProps) {
  const history = useNavigate();
  console.log(session);
  const goAhead = (): void => {
    history("/notes");
  };

  return (
    <S.Container>
      {session ? (
        <>
          <div> Jesteś Zalogowany</div>
          <S.Button onClick={goAhead}>Przejdz do notatek</S.Button>
        </>
      ) : (
        <>
          <StyledLink to={"/logowanie"}>LOGOWANIE</StyledLink>
          <StyledLink to={"/rejestracja"}>REJESTRACJA</StyledLink>
          <StyledLinks to={"reset-password"}>ZAPOMNIAŁEM HASŁA</StyledLinks>
        </>
      )}
    </S.Container>
  );
}

export default Main;
