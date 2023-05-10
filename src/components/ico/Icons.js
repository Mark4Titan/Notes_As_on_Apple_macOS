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
  edit: RiBallPenLine,
  burgrtClose: RiLayout5Line,
  burgrtOpen: RiLayoutTopLine,
  add: RiFileAddLine,
  del: RiFileForbidLine,

  settings: RiSoundModuleLine,

  cloud: RiSoundcloudLine,
  Databas: HiDatabase,

  rec: RiSave3Fill,
  search: BiSearch,
};

const Icons = ({ ico, C }) => {
  return <C>{ICO[ico]()}</C>;
};

export default Icons;

//
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
`;
export const StyDatabasIn = styled.div`
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
`;
export const StyDatabasOut = styled.div`
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
`;
