import Icons from "../ico/Icons";
import SearchBox from "./SearchBox/SearchBox";
import {
  UlSidebar,
  SidMain,
  DivPanel,
  DivPanelTol,
  DivPan,
  LiSidebar,
} from "./Sidebar.styled";

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
      <DivPanelTol>
        <DivPan>
          <UlSidebar>
            <LiSidebar onClick={() => setBurger(!burger)}>
              {burger ? (
                <Icons ico="burgrtClose" C="StyBut" />
              ) : (
                <Icons ico="burgrtOpen" C="StyBut" />
              )}
            </LiSidebar>

            {(!isW || !burger) && (
              <>
                <LiSidebar onClick={() => addNote()}>
                  <Icons ico="add" C="StyBut" />
                </LiSidebar>
                <LiSidebar onClick={() => isDel()}>
                  <Icons ico="del" C="StyBut" isOpenItem={isOpenItem} />
                </LiSidebar>

                <LiSidebar onClick={() => isEdit()}>
                  <Icons
                    ico="edit"
                    C="StyBut"
                    isOpenItem={isOpenItem}
                    winEdit={editItem && isOpenItem}
                  />
                </LiSidebar>
              </>
            )}
          </UlSidebar>
        </DivPan>
        {(!isW || burger) && (
          <DivPanel>
            <SearchBox
              setStateSearch={setStateSearch}
              stateSearch={stateSearch}
              isW={isW}
            />
          </DivPanel>
        )}
      </DivPanelTol>
    </SidMain>
  );
};
export default Sidebar;
