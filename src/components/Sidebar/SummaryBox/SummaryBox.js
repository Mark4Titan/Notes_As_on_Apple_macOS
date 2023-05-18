import styled from "@emotion/styled";

const SummaryBox = () => {
  return (
    <DivSummary >
      <AHref
        href="https://mark4titan.github.io/Summary-react/"
        aria-label="Summary"
        target="_blank"
      >
        Summary
      </AHref>
    </DivSummary>
  );
};
export default SummaryBox;

export const DivSummary = styled.div`
  display: grid;
  justify-content: center;
  grid-template: 1fr/1fr;
  width: 100%;
  height: 100%;
  background-color: #d6d6d6;
  align-items: center;
`;
export const AHref = styled.a`
  padding: 0 15px;
  background-color: #ffffff8c;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 1px #4f4f4f5e;
  font-size: 18px;  
  font-weight: 800;
  color: #00000066;
  width: 135px;
  height: 26px;
  text-decoration: none;

  display: grid;
  align-items: center;
  justify-items: center;

  &:hover {
    background-color: #fafaf8;
  }
  &:focus {
    background-color: #fafaf8;
  }
`;
