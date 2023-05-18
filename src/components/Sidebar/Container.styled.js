import styled from "@emotion/styled";

export const DivContainer = styled.div`
  position: relative;

  margin-right: ${(P) => (P.isW ? 10 : 20)}px;

  animation: ${(P) => (P.dop === 1 ? "slideSorUp" : "slideSorDo")} 0.4s
    ease-in-out;

  @keyframes slideSorUp {
    from {
      transform: translateY(50%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideSorDo {
    from {
      transform: translateY(-50%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
