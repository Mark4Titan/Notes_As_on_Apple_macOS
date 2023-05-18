import styled from "@emotion/styled";
import moment from "moment";
import { useState } from "react";

const ClockBox = () => {
  const [Clock, setClock] = useState({
    HH: moment().format("HH"),
    mm: moment().format("mm"),
    ss: moment().format("ss"),
  });

  setInterval(() => {
    let HH = moment().format("HH");
    let mm = moment().format("mm");
    let ss = moment().format("ss");
    setClock({ HH, mm, ss });
  }, 1000);

  return (
    <DivClock>
      <DivTic>
        <DivTicHH>{Clock.HH}</DivTicHH>
        <DivTicmm>{Clock.mm}</DivTicmm>
        <DivTicss>{Clock.ss}</DivTicss>
      </DivTic>
    </DivClock>
  );
};
export default ClockBox;

const DivClock = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  grid-template: 1fr/1fr;

  width: 100%;
  height: 100%;
  background-color: #d6d6d6;
  align-items: center;
`;
const DivTic = styled.div`
  position: absolute;
  left: 0px;
  top: 10px;
  display: grid;
  font-size: 40px;
  justify-content: center;
  color: #fafaf8;

  background-color: #d6d6d6;
  align-items: center;
`;
const DivTicHH = styled.div`
  position: absolute;
  left: -110px;
  font-size: 61px;
`;

const DivTicmm = styled.div`
  position: absolute;
  left: 0px;
  font-size: 61px;
`;

const DivTicss = styled.div`
  position: absolute;
  left: 70px;
  top: -27px;
  font-size: 30px;
`;
