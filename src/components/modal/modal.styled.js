import styled from "@emotion/styled";

export const DivWraper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: grid;
  z-index: 10;
  justify-content: center;
  align-items: center;
  justify-items: center;
  grid-template: 1fr/1fr;
  
  backdrop-filter: blur(9.6px);
  -webkit-backdrop-filter: blur(9.6px);

  animation: slid 0.2s ease-in-out;  

  @keyframes slid {
    from { 
      opacity: 0;
    }
    to { 
      opacity: 1;
    }
  }
  
  
`;
export const DivForm = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 1fr/1fr minmax(250px, 1fr) 1fr;  
  justify-content: center;
  align-items: center;
  justify-items: center;
`;
export const DivCard = styled.div`
position: relative;
  grid-column: 2/3;
  background-color: #f3f3f3;
  width: 100%;
  height: 350px;
  display: grid;
  grid-template: 1fr 1fr 1fr / minmax(250px, 1fr);
  box-shadow: 0px 3px 8px 0px #4f4f4f5e;
  padding: 20px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  border: solid 1px #d6d6d6;
  border-radius: 5px;
`;
export const H2Content = styled.h2`
  color: brown;
  font-size: 42px;
`;
export const ButtonModal = styled.button`
  width: 110px;
  height: 40px;
  display: grid;
  padding: 5px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  color: dimgrey;
  font-size: 17px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  border: solid 1px #d6d6d6;
  border-radius: 5px;
  cursor: pointer; 

  &:hover {
    background-color: #fff;
    box-shadow: 0px 3px 5px 0px #4f4f4f5e;
  }
  &:active {
    background-color: #f3f3f3;
    box-shadow: none;
  }
`;
export const ContentButton = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template: 1fr  / 1fr 1fr;
  grid-gap: 10px;
  padding: 5px;
  justify-items: center;
  align-items: center;
  justify-content: center;

`;
export const DivText = styled.div`
align-items: center;
color: dimgrey;
font-size: 17px;
`;
export const DivExit = styled.button`
position: absolute;
top: 0;
right: 0;
margin: 10px;
width: 30px;
  height: 30px;
// color: dimgrey;
padding: 5px;
display: grid;
  justify-items: center;
  align-items: center;
  justify-content: center;

  border: solid 1px #d6d6d6;
  border-radius: 5px;
  cursor: pointer; 

  &:hover {
    background-color: #fff;
    box-shadow: 0px 3px 5px 0px #4f4f4f5e;
  }
  &:active {
    background-color: #f3f3f3;
    box-shadow: none;
  }

`;
