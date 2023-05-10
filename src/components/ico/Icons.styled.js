import styled from "@emotion/styled";

export const StyBut = styled.div`
  width: 48px;
  height: 26px;
  border: solid 1px #d6d6d6;
  background-color: #ffffff8c;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 1px #4f4f4f5e;
  display: flex;
  align-items: center;
  justify-content: center;
  & :last-child {
    width: 20px;
    height: 20px;
  }
  &:hover{
    background-color: #ffffffeb;
  }
  // &:hover :last-child{
  //   color: #fff;
  // }
`;
