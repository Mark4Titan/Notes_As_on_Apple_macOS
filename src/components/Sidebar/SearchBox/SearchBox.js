import { useState } from "react";
import Icons, { StyIco } from "../../ico/Icons";
import { DivSearch, SearchInput } from "./SearchBox.styled";

const SearchBox = ({ stateInput, setStateInput}) => {
 
  const ValueIn = (value) => {
    const validator = value === " " ? "" : value;
    setStateInput(validator);
  };
  return (
    <DivSearch>
      <SearchInput
        type="text"
        name="input"
        placeholder="Search"
        onChange={(e) => ValueIn(e.target.value)}
        value={stateInput}
      />
      <Icons ico="search" C={StyIco} />
    </DivSearch>
  );
};
export default SearchBox;
