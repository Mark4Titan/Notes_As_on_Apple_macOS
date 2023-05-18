import styled from "@emotion/styled";

export const ButtonMenuDop = styled.button`
  height: 12px;
  width: 24px;
  font-size: 9px;
  border-radius: 1px;
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;

  border: solid 1px #fafaf8;
  background-color: #ffffff8c;
  
  // border: none;
  outline: none;
  ${P=>P.bord};
  &:hover {
    background-color: #fff;
    box-shadow: 0px 3px 5px 0px #4f4f4f5e;
  }
  &:active {
    background-color: #f3f3f3;
    box-shadow: none;
  }
`;
export const SpanMenuDop = styled.span`
  display: grid;
  grid-gap: 1px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  border: solid 1px #d6d6d6;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 1px #4f4f4f5e;
`;