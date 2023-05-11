import { useEffect, useState } from "react";
import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import WiWidth from "./Hooks/WiWitdth";
import ApiIndexedDB from "./APIs/indexeddb/indexeddb";

function App() {
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState({});
  const [burger, setBurger] = useState(false);
  const [stateInput, setStateInput] = useState("");

  // //  db
  const [conectdb, setConectdb] = useState(false);
  const [error, setError] = useState(null);

  const api = ApiIndexedDB();
  useEffect(() => {
    if (conectdb === false)
      api
        .connectToDB()
        .then(() => api.getData())
        .then(({ data, error }) => {
          if (error) {
            setError(error);
          } else {
            setItems(data);
            setConectdb(true);
          }
        })
        .catch((error) => api.handleDBError(error));
  }, [api, conectdb]);

  const DelNote = () => {
    if (openItem.id === undefined) return;

    api.deleteRecord(openItem).then(({ data, error }) => {
      if (error) {
        setError(error);
      } else {
        setItems((prevState) => prevState.filter((obj) => obj.id !== data.id));
        setOpenItem({});
      }
    });
  };

  const CloneNote = () => {
    if (openItem.id === undefined) return;

    api.cloneRecord(openItem).then(({ data, error }) => {
      if (error) {
        setError(error);
      } else {
        setItems((prevState) => [...prevState, data]);
        setOpenItem(data);
      }
    });
  };

  const editNote = (newOpenItem) => {
    if (openItem.id === undefined) return;

    api.editRecord(newOpenItem).then(({ data, error }) => {
      if (error) {
        setError(error);
      } else {
        setItems((prevState) =>
          prevState.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          )
        );
      }
    });
  };

  const addNote = () => {
    const newOpenItem = {};

    api.addRecord(newOpenItem).then(({ data, error }) => {
      if (error) {
        setError(error);
      } else {
        setItems((prevState) => [...prevState, data]);
        setOpenItem(data);
      }
    });
  };

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
          DelNote={DelNote}
          CloneNote={CloneNote}
          addNote={addNote}
          isOpenItem={openItem.id === undefined ? false : true}
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
          {(!burger || !isW) && (
            <Workspace
              items={items}
              openItem={openItem}
              editNote={editNote}
              addNote={addNote}
            />
          )}
        </DivWork>
      </DivContent>
    </DivMain>
  );
}

export default App;
