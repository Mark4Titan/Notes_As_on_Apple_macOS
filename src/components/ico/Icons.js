import {
  RiBallPenLine,
  RiLayout5Line,
  RiFileAddLine,
  RiFileForbidLine,
  RiSoundcloudLine,
  RiSoundModuleLine,
  RiSave3Fill,
  RiLayoutTopLine,
  RiFileCodeLine
} from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { HiDatabase } from "react-icons/hi";
import styled from "@emotion/styled";

const ICO = {
  edit: { i: RiBallPenLine, text: "Edit" },
  burgrtClose: { i: RiLayout5Line, text: "Hide" },
  burgrtOpen: { i: RiLayoutTopLine, text: "Show" },
  add: { i: RiFileAddLine, text: "Add" },
  del: { i: RiFileForbidLine, text: "Remove" },
  clone: { i: RiFileCodeLine, text: "Сlone" },

  settings: { i: RiSoundModuleLine, text: "Settings" },

  cloud: { i: RiSoundcloudLine, text: "Quintadb" },
  Databas: { i: HiDatabase, text: "Indexeddb" },

  rec: { i: RiSave3Fill, text: "Record" },
  search: { i: BiSearch, text: "Search" },
};



const Icons = ({ ico, C, ...props }) => {
  const text = ICO[ico].text;
  const Ico = ICO[ico].i();
  const Component = transforms[C]
  return <Component data-text={text} {...props}>{Ico}</Component>;
};

export default Icons;

//

const StyBefore = `  
  
  &::before{
    top: -25px;    
    position: absolute;
    border-radius: 5px;
    background-color: #fafaf8;
    font-size: 12px;
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
    top: -35px;
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
    ${P=>(P.isOpenItem !== undefined && !P.isOpenItem) ? 'background-color: #d6d6d6' :   'background-color: #ffffffeb'};
   
  }
  &:active {
    
    ${P=>(P.isOpenItem !== undefined && !P.isOpenItem) ? 'background-color: #d6d6d6' :   'background-color: #ffffff8c'};
  }
  ${P=>(P.isOpenItem !== undefined && !P.isOpenItem) && 'background-color: #d6d6d6' };
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
const transforms = {
  StyBut:StyBut,
  StyIco:StyIco,
  StyDatabasIn: StyDatabasIn,
  StyDatabasOut:StyDatabasOut,
}