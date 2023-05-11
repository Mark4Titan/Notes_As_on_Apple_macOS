import Icons from "../ico/Icons";
import SearchBox from "./SearchBox/SearchBox";
import { UlSidebar, SidMain } from "./Sidebar.styled";

const Sidebar = ({
  isOpenItem,
  burger,
  setBurger,
  isW,
  setStateInput,
  stateInput,
  DelNote,
  CloneNote,
  addNote,
}) => {
  return (
    <SidMain>
      <UlSidebar>
        <li onClick={() => setBurger(!burger)}>
          {burger ? (
            <Icons ico="burgrtClose" C="StyBut" />
          ) : (
            <Icons ico="burgrtOpen" C="StyBut" />
          )}
        </li>

        {(!isW || !burger) && (
          <>
            <li onClick={() => addNote()}>
              <Icons ico="add" C="StyBut" />
            </li>

            <li onClick={() => CloneNote()}>
              <Icons ico="clone" C="StyBut" isOpenItem={isOpenItem} />
            </li>
            <li onClick={() => DelNote()}>
              <Icons ico="del" C="StyBut" isOpenItem={isOpenItem} />
            </li>
            <li>
              <Icons ico="edit" C="StyBut" isOpenItem={isOpenItem} />
            </li>
          </>
        )}
      </UlSidebar>
      {(!isW || burger) && (
        <SearchBox setStateInput={setStateInput} stateInput={stateInput} />
      )}
    </SidMain>
  );
};
export default Sidebar;
