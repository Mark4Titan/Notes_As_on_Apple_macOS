import { useEffect, useState } from "react";
import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import WiWidth from "./Hucs/WiWitdth";
import controller from "./APIs/controller";

function App() {
  const [items, setItems] = useState(controller);
  const [openItem, setOpenItem] = useState({});
  const [burger, setBurger] = useState(false);
  const [stateInput, setStateInput] = useState("");

  

  let isW = WiWidth(520);

  useEffect(() => {
    isW ? setBurger(false) : setBurger(true);
    openItem.id === undefined && setBurger(true);
  }, [isW, openItem]);

  const closeCart = () => {
    setOpenItem({});
  };
  const openCart = (cart) => {
    setOpenItem(cart);
    if (isW) setBurger(false);
  };

  return (
    <DivMain>
      <DivContent>
        <Sidebar
          burger={burger}
          setBurger={setBurger}
          isW={isW}
          setStateInput={setStateInput}
          stateInput={stateInput}
        />
        <DivWork burger={burger} isW={isW}>
          {burger && (
            <ListItem
              items={items}
              closeCart={closeCart}
              openCart={openCart}
              openItem={openItem}
              isW={isW}
              stateInput={stateInput}
            />
          )}
          {(!burger || !isW) && 
          <Workspace items={items} openItem={openItem} />
          }
        </DivWork>
      </DivContent>
    </DivMain>
  );
}

export default App;
