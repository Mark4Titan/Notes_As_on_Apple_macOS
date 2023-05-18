import Icons from "../../ico/Icons";
import { ButtonMenuDop, SpanMenuDop } from "./BuutonMenu.styled";

const BuutonMenu = ({ dopMenu, setDopMenu }) => {
  const Menu = ["search", "clock", "summary"];

  const DopMenu = (clickVariant) => {
    let currentIndex;
    Menu.forEach((entry, index) => {
      if (entry === dopMenu.menu) {
        currentIndex = index;
      }
    });

    if (clickVariant === 1) {
      setDopMenu({
        menu: Menu[currentIndex + clickVariant] || Menu[0],
        menuMovement: clickVariant,
      });
    } else if (clickVariant === -1) {
      setDopMenu({
        menu: Menu[currentIndex + clickVariant] || Menu[Menu.length - 1],
        menuMovement: clickVariant,
      });
    }
  };

  return (
    <SpanMenuDop>
      <ButtonMenuDop
        
        onClick={() => DopMenu(1)}
        bord={`border-top-left-radius: 5px;  
          border-top-right-radius: 5px`}
      >
        <Icons ico="up" C="StyDatabas" colorVar="currentcolor" />
      </ButtonMenuDop>
      <ButtonMenuDop
      
        onClick={() => DopMenu(-1)}
        bord={`border-bottom-left-radius: 5px;  
          border-bottom-right-radius: 5px`}
      >
        <Icons ico="down" C="StyDatabas" colorVar="currentcolor" />
      </ButtonMenuDop>
    </SpanMenuDop>
  );
};
export default BuutonMenu;
