import { useState } from "react";
import Icons from "../ico/Icons";
import SearchBox from "./SearchBox/SearchBox";
import {
  UlSidebar,
  SidMain,
  DivPanel,
  DivPanelTol,
  DivPan,
  LiSidebar,
  DivMenuDop,
} from "./Sidebar.styled";
import Container from "./Container";
import BuutonMenu from "./BuutonMenu/BuutonMenu";
import SummaryBox from "./SummaryBox/SummaryBox";
import ClockBox from "./Clock/Clock";
import ThemeBox from "./ThemeBox/ThemeBox";

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
  const [dopMenu, setDopMenu] = useState({menu:"search", menuMovement: 1});

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
            <DivMenuDop>

              <BuutonMenu dopMenu={dopMenu} setDopMenu={setDopMenu}/>

              {dopMenu.menu === "search" && (
                <Container isW={isW} dopMenu={dopMenu}>
                  <SearchBox
                    setStateSearch={setStateSearch}
                    stateSearch={stateSearch}                    
                  />
                </Container>
              )}
              {dopMenu.menu === "summary" && (
                <Container isW={isW} dopMenu={dopMenu}>
                  <SummaryBox/>
                </Container>
              )}
              {dopMenu.menu === "clock" && (
                <Container isW={isW} dopMenu={dopMenu}>
                  <ClockBox/>
                </Container>
              )}
              {dopMenu.menu === "theme" && (
                <Container isW={isW} dopMenu={dopMenu}>
                  <ThemeBox/>
                </Container>
              )}
            </DivMenuDop>
          </DivPanel>
        )}
      </DivPanelTol>
    </SidMain>
  );
};
export default Sidebar;
