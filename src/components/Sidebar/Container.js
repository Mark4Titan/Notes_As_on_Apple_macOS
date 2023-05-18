import { DivContainer } from "./Container.styled";

const Container = ({ isW, dopMenu, children }) => {
  return (
    <DivContainer isW={isW} dop={dopMenu.menuMovement}>
      {children}
    </DivContainer>
  );
};
export default Container;
