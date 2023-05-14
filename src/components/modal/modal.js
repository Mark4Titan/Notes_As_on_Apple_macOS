import { useEffect } from "react";
import {
  ButtonModal,
  ContentButton,
  DivCard,
  DivExit,
  DivForm,
  DivText,
  DivWraper,
  H2Content,
} from "./modal.styled";
import Icons from "../ico/Icons";

const Modal = ({ modal, setModal, openItem, showModal }) => {
  // key controller
  useEffect(() => {
    const handleEscape = (event) => {
      if (
        modal.isModal &&
        (event.key === "Escape" ||
          event.key === "N" ||
          event.key === "n" ||
          event.key === "Т" ||
          event.key === "т")
      ) {
        setModal({ masage: "", isModal: false, version: false });
      }
      if (
        modal.isModal &&
        (event.key === "Enter" ||
          event.key === "Y" ||
          event.key === "y" ||
          event.key === "н" ||
          event.key === "Н")
      ) {
        
        setModal({ masage: "", isModal: false, version: true });
      }     
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modal.isModal, openItem.id, setModal, showModal]);

  const ClicButton = (version) => {
    setModal({ masage: "", isModal: false, version });
  };

  return (
    modal.isModal && (
      <DivWraper>
        <DivForm>
          <DivCard>
            <DivExit onClick={() => ClicButton(false)}>
              <Icons ico="close" C="StyIco" />
            </DivExit>
            <H2Content>Warning!</H2Content>
            <DivText>{modal.masage}</DivText>
            <ContentButton>
              <ButtonModal onClick={() => ClicButton(true)}>Enter</ButtonModal>
              <ButtonModal onClick={() => ClicButton(false)}>
                Cancel
              </ButtonModal>
            </ContentButton>
          </DivCard>
        </DivForm>
      </DivWraper>
    )
  );
};
export default Modal;
