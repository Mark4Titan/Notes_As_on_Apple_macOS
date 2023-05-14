import Icons from "../ico/Icons";
import SearchBox from "./SearchBox/SearchBox";
import { UlSidebar, SidMain, DivPanel } from "./Sidebar.styled";

const Sidebar = ({
  isOpenItem,
  burger,
  setBurger,
  isW,
  setStateSearch,
  stateSearch,
  addNote,
  showModal,
  setEditItem,
  editItem,
}) => {
  const isEdit = () => {
    isOpenItem && setEditItem((privState) => !privState);
  };
  const isDel = () => {
    isOpenItem && showModal();
  };
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
            <li onClick={() => isDel()}>
              <Icons ico="del" C="StyBut" isOpenItem={isOpenItem} />
            </li>

            <li onClick={() => isEdit()}>
              <Icons
                ico="edit"
                C="StyBut"
                isOpenItem={isOpenItem}
                winEdit={editItem && isOpenItem}
              />
            </li>
          </>
        )}
        {(!isW || burger) && (
          <DivPanel>
            <SearchBox
              setStateSearch={setStateSearch}
              stateSearch={stateSearch}
            />
          </DivPanel>
        )}
      </UlSidebar>
    </SidMain>
  );
};
export default Sidebar;