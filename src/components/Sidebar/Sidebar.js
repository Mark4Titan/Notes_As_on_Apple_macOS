import Icons, { StyBut } from "../ico/Icons";
import SearchBox from "./SearchBox/SearchBox";
import { UlSidebar, SidMain } from "./Sidebar.styled";

const Sidebar = ({ burger, setBurger, isW, setStateInput, stateInput }) => {
  return (
    <SidMain>
      <UlSidebar>
        <li onClick={() => setBurger(!burger)}>
          {burger ? (
            <Icons ico="burgrtClose" C={StyBut} />
          ) : (
            <Icons ico="burgrtOpen" C={StyBut} />
          )}
        </li>

        {(!isW || burger) && (
          <>
            <li>
              <Icons ico="add" C={StyBut} />
            </li>
            <li>
              <Icons ico="del" C={StyBut} />
            </li>
            <li>
              <Icons ico="edit" C={StyBut} />
            </li>
            <li>
              <Icons ico="settings" C={StyBut} />
            </li>
          </>
        )}
      </UlSidebar>
      {(!isW || !burger) && (
        <SearchBox setStateInput={setStateInput} stateInput={stateInput} />
      )}
    </SidMain>
  );
};
export default Sidebar;
