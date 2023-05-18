import styled from "@emotion/styled";
import Icons from "../../ico/Icons";

const SearchBox = ({ stateSearch, setStateSearch }) => {
  const ValueIn = (value) => {
    const validator = value === " " ? "" : value;
    setStateSearch(validator);
  };
  const Clear = () => {
    setStateSearch("");
  };
  return (
    <>
      <SearchInput
        type="text"
        name="input"
        placeholder="Search"
        onChange={(e) => ValueIn(e.target.value)}
        value={stateSearch}
      />
      {stateSearch.length === 0 && <Icons ico="search" C="StyIco" />}
      {stateSearch.length > 0 && (
        <div onClick={() => Clear()}>
          <Icons ico="clear" C="StyIco" />
        </div>
      )}
    </>
  );
};
export default SearchBox;

const SearchInput = styled.input`
  padding: 0 5px 0 30px;
  background-color: #ffffff8c;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 1px #4f4f4f5e;
  width: 135px;
  height: 26px;
  border: none;
  outline: none;
  border: solid 1px #d6d6d6;
  &:hover {
    background-color: #fafaf8;
  }
  &:focus {
    background-color: #fafaf8;
  }
`;
