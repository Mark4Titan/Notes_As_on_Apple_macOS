import {
  RiBallPenLine,
  RiLayout5Line,
  RiFileAddLine,
  RiFileForbidLine,
  RiSoundcloudLine,
  RiSoundModuleLine,
  RiSave3Fill,
  RiLayoutTopLine,
} from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { HiDatabase } from "react-icons/hi";
import styled from "@emotion/styled";

const ICO = {
  edit: { i: RiBallPenLine, text: "edit" },
  burgrtClose: { i: RiLayout5Line, text: "hide" },
  burgrtOpen: { i: RiLayoutTopLine, text: "show" },
  add: { i: RiFileAddLine, text: "add" },
  del: { i: RiFileForbidLine, text: "remove" },

  settings: { i: RiSoundModuleLine, text: "settings" },

  cloud: { i: RiSoundcloudLine, text: "quintadb" },
  Databas: { i: HiDatabase, text: "indexeddb" },

  rec: { i: RiSave3Fill, text: "record" },
  search: { i: BiSearch, text: "search" },
};

const Icons = ({ ico, C }) => {
  const text = ICO[ico].text;
  const Ico = ICO[ico].i();
  return <C data-text={text}>{Ico}</C>;
};

export default Icons;

//

const StyBefore = `  

  &::before{
    top: -25px;    
    position: absolute;
    border-radius: 5px;
    background-color: #fafaf8;
    
    border-color: #d6d6d6;
    content: " ";
    box-shadow: 0px 3px 8px 0px #4f4f4f5e;
    align-items: center;
    justify-items: center;
    justify-content: center;
    opacity: 0;
    display: grid;
    transition: all 0.1s ease-out;
  }
  &:hover::before{
    top: -45px;
    opacity: 1;
    width: auto;
    padding: 5px;
    height: auto;
    content: attr(data-text);
   
  }
  
`;

export const StyBut = styled.div`
  position: relative;
  width: 48px;
  height: 26px;
  border: solid 1px #d6d6d6;
  background-color: #ffffff8c;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 1px #4f4f4f5e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & :last-child {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #ffffffeb;
  }
  &:active {
    background-color: #ffffff8c;
  }
  ${StyBefore}
`;
export const StyIco = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  left: 5px;
  & :last-child {
    width: 20px;
    height: 20px;
  }
  ${StyBefore}
`;
export const StyDatabasIn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  left: 5px;
  & :last-child {
    width: 20px;
    height: 20px;
    color: darkgreen;
  }
  ${StyBefore}
`;
export const StyDatabasOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  left: 5px;
  & :last-child {
    width: 20px;
    height: 20px;
    color: brown;
  }
  ${StyBefore}
`;
