import styled from "@emotion/styled";

export const DivList = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafaf8;
  border: solid 1px #d6d6d6;
  border-bottom-left-radius: 5px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export const UlListContent = styled.ul`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));

  grid-gap: 5px;
  padding: 5px;
`;
export const LiItems = styled.li`
  cursor: pointer;
  border: solid 1px #d6d6d6;
  background-color: ${(P) => (P.SColor ? "#ffffff8c" : "#d6d6d6")};
  padding: 20px;
  display: grid;
  grid-template: auto / 1fr;
  grid-gap: 5px;
  align-items: center;
  &:hover {
    box-shadow: 0px 3px 5px 1px #4f4f4f5e;
    background-color: #ffffff8c;
  }
  &:active {
    box-shadow: 0px 3px 5px 1px #ded9d9;
  }

  animation: slideOpen 0.4s ease-in-out;  

  @keyframes slideOpen {
    from { transform: translateY(120%); 
      opacity: 0;
    }
    to { transform: translateY(0); 
      opacity: 1;
    }
  }

  
`;
export const DivBasis = styled.div`
  display: grid;
  grid-template: 1fr/1fr minmax(auto, 0.29fr);
  grid-gap: 5px;
  align-items: center;
`;
export const BoxIco = styled.div`
  display: grid;
  grid-template: auto auto/ 1fr 0.3fr;
  grid-gap: 5px;
  justify-items: start;
  align-items: center;
`;
export const DivTitle = styled.h3`
  color: dimgrey;
  grid-column: 1/2;
  display: grid;
`;

