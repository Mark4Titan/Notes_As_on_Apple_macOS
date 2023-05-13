import { useEffect, useState } from "react";
import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import WiWidth from "./Hooks/WiWitdth";
import ApiIndexedDB from "./APIs/indexeddb/indexeddb";
import Convertor from "./APIs/quintadb/convertor";

function App() {
  //cards
  const [items, setItems] = useState([]);
  const [itemsCloud, setItemsCloud] = useState([]);

  // base selection db
  const [selectiondb, setSelectiondb] = useState({
    indexeddb: true,
    quintadb: false,
  });
  const [selecTrig, setselecTrig] = useState(false);

  // ui
  const [openItem, setOpenItem] = useState({});
  const [burger, setBurger] = useState(false);
  const [stateInput, setStateInput] = useState("");

  // //  db
  const [conectdb, setConectdb] = useState(false);
  const [conectClouddb, setClouddb] = useState(false);
  const [clouddbTriger, setClouddbTriger] = useState(false);
  const [error, setError] = useState(null);

  const api = ApiIndexedDB();
  const cloudApi = Convertor();

  //  database synchronization
  useEffect(() => {
    if (clouddbTriger) {
      const mergedArray = [];
      if (items.length > 0) {
        items.forEach((item1) => {
          let found;
          itemsCloud.forEach((item2) => {
            if (item1.id === item2.id) {
              found = { ...item2, in: true };
            }
          });
          if (found) {
            mergedArray.push(found);
          } else {
            mergedArray.push(item1);
          }
        });
      }
      itemsCloud.forEach((item) => {
        if (!mergedArray.find((i) => i.id === item.id)) {
          mergedArray.push(item);
        }
      });
      const newArray = [...mergedArray];

      setTimeout(() => {
        setClouddbTriger(false);
        setItems(newArray);
      }, 300);
    }
  }, [clouddbTriger, items, itemsCloud]);

  // connecting to databases and retrieving data
  useEffect(() => {
    if (conectClouddb === false) {
      cloudApi.getAll().then((result) => {
        result.status === 200
          ? setItemsCloud(result.datd)
          : setError(result.masage);
        setClouddb(true);
        setClouddbTriger(true);
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

  // updating databases delete
  useEffect(() => {
    if (selecTrig) {
      // console.log("openItem.indexeddb", openItem.indexeddb);
      if (openItem.indexeddb === false && openItem.quintadb === false) {
        // quintadb

        console.log("openItem", openItem);

        setItems((prevState) =>
          prevState.filter((obj) => obj.id !== openItem.id)
        );

        setOpenItem({});
      }
    }
  }, [openItem, selecTrig]);

  //

  const DelNote = () => {
    if (openItem.id === undefined) return;

    if (openItem.idQuintadb !== undefined && openItem.idQuintadb) {
      cloudApi.delRecord(openItem).then((result) => {
        setOpenItem((prevState) => ({
          ...prevState,
          quintadb: false,
        }));
      });
      setselecTrig(true);
    }

    if (openItem.indexeddb !== undefined && openItem.indexeddb) {
      api.deleteRecord(openItem).then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setOpenItem((prevState) => ({
            ...prevState,
            indexeddb: false,
          }));
        }
      });
      setselecTrig(true);
    }
  };

  const CloneNote = () => {
    if (openItem.id === undefined) return;
// !!!!!!! до писати і синхронізувати
    if (openItem.idQuintadb !== undefined && openItem.idQuintadb) {
      cloudApi.cloneRecord(openItem).then((result) => {
        // setOpenItem((prevState) => ({
        //   ...prevState,
        //   quintadb: false,
        // }));
        console.log("result",result)
      });
      // setselecTrig(true);

    }

    if (openItem.indexeddb !== undefined && openItem.indexeddb) {
      api.cloneRecord(openItem).then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setItems((prevState) => [...prevState, data]);
          setOpenItem(data);
        }
      });
    }
  };

  const editNote = (newOpenItem) => {
    if (openItem.id === undefined) return;

    if (openItem.idQuintadb !== undefined && openItem.idQuintadb) {
      cloudApi.addRecord(openItem).then((result) => {
        setItems((prevState) =>
          prevState.map((item) =>
          item.id === result.id ? { ...item, ...result } : item
          )
          );
        console.log("result",result)
      });
      // setselecTrig(true);

    }



    if (openItem.indexeddb !== undefined && openItem.indexeddb) {
// повернутись для тестування
      if (openItem.idQuintadb !== undefined && openItem.idQuintadb) {
        cloudApi.changeRecord(newOpenItem).then(({ data, error }) => {
          if (error) {
            setError(error);
        } else {
          setItemsCloud((prevState) =>
          prevState.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
          )
          );
        }
        console.log("changeRecord", data);
      });
      setselecTrig(true);
    }
    }

    if (openItem.indexeddb !== undefined && openItem.indexeddb) {
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
    }
  };

  const addNote = () => {
    const newOpenItem = {
      indexeddb: selectiondb.indexeddb,
      quintadb: selectiondb.quintadb,
    };

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
              isOpenItem={openItem.id === undefined ? false : true}
            />
          )}
          {(!burger || !isW) && (
            <Workspace
              items={items}
              openItem={openItem}
              editNote={editNote}
              addNote={addNote}
              selectiondb={selectiondb}
              setSelectiondb={setSelectiondb}
            />
          )}
        </DivWork>
      </DivContent>
    </DivMain>
  );
}

export default App;
