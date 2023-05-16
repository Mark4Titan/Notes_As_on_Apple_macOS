
import { DivSearch, SearchInput } from "./SearchBox.styled";
import Icons from "../../ico/Icons";

const SearchBox = ({ stateSearch, setStateSearch, isW}) => {
 
  const ValueIn = (value) => {
    const validator = value === " " ? "" : value;
    setStateSearch(validator);
  };
  return (
    <DivSearch isW={isW}>
      <SearchInput
        type="text"
        name="input"
        placeholder="Search"        
        onChange={(e) => ValueIn(e.target.value)}
        value={stateSearch}
      />
      <Icons ico="search" C='StyIco' />
    </DivSearch>
  );
};
export default SearchBox;
