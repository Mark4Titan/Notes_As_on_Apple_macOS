import moment from "moment";
import { useState } from "react";

const ClockBox = () => {

  const [Clock, setClock] = useState(moment().format("HH:mm:ss"));

  setInterval(() => {
    setClock(moment().format("HH:mm:ss"));
  }, 1000);


 

  return (
    <>
      <div>{Clock}</div>
    </>
  );
};
export default ClockBox;
