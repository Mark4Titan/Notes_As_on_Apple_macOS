import { useEffect, useState } from "react";
import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import WiWidth from "./Hooks/WiWitdth";
import ApiIndexedDB from "./APIs/indexeddb/indexeddb";
import Convertor from "./APIs/quintadb/convertor";
import { deleteRecord } from "./APIs/quintadb/quintadb";

function App() {
  //cards
  const [items, setItems] = useState([]);
  const [itemsCloud, setItemsCloud] = useState([]);

  // ui
  const [openItem, setOpenItem] = useState({});
  const [burger, setBurger] = useState(false);
  const [stateInput, setStateInput] = useState("");

  // //  db
  const [conectdb, setConectdb] = useState(false);
  const [conectClouddb, setClouddb] = useState(false);
  const [error, setError] = useState(null);

  const api = ApiIndexedDB();
  const cloudApi = Convertor();

  useEffect(() => {
    if (items.length - 1 > 0 && itemsCloud.length - 1 > 0) {
      /*
     const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
     { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
];

const itemsCloud = [
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
   
];

const updatedItems = items.map(item => {
  const matches = itemsCloud.filter(cItem => cItem.id === item.id);
  if (matches.length > 0) {
    const mergedItem = matches.reduce((acc, curr) => ({ ...acc, ...curr }), item);
    return { ...mergedItem, quintadb: true };
  } else {
    return item;
  }
});

const remainingItemsCloud = itemsCloud.filter(cItem => {
  return !updatedItems.find(item => item.id === cItem.id);
});

const finalItems = [...updatedItems, ...remainingItemsCloud];

console.log(finalItems);
     */

      const updatedItems = items.map((item) => {
        const matches = itemsCloud.filter((cItem) => cItem.id === item.id);
        if (matches.length > 0) {
          const mergedItem = matches.reduce(
            (acc, curr) => ({ ...acc, ...curr }),
            item
          );
          return { ...mergedItem, quintadb: true };
        } else {
          return item;
        }
      });

      const remainingItemsCloud = itemsCloud.filter((cItem) => {
        return !updatedItems.find((item) => item.id === cItem.id);
      });

      const finalItems = [...updatedItems, ...remainingItemsCloud];

     
      setItems(finalItems);

      setTimeout(() => {
        setItemsCloud([]);
      }, 300);
    }
  }, [items, itemsCloud]);

  useEffect(() => {
    if (conectClouddb === false) {
      cloudApi.getAll().then((result) => {
        result.status === 200
          ? setItemsCloud(result.datd)
          : setError(result.masage);
        setClouddb(true);
      });
    }
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
  }, [api, cloudApi, conectClouddb, conectdb]);

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
  const Test = () => {
    deleteRecord();
  };
  return (
    <DivMain>
      {/* <button onClick={() => Test()}>test</button> */}
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
