import { useEffect, useState } from "react";
import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";
import useWiWidth from "./Hooks/WiWitdth";
import ApiIndexedDB from "./APIs/indexeddb/indexeddb";
import Convertor from "./APIs/quintadb/convertor";
import Modal from "./components/modal/modal";
import Notif from "./components/notif/notif";

function App() {
  // ui
  const [selectiondb, setSelectiondb] = useState({
    availabIndexeddb: false,
    indexeddb: false,
    availabQuintadb: false,
    quintadb: false,
  });

  const [editItem, setEditItem] = useState(true);
  const [openItem, setOpenItem] = useState({});
  const [burger, setBurger] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  //  db
  const [conectdb, setConectdb] = useState(false);
  const [conectClouddb, setClouddb] = useState(false);
  const [synchronization, setSynchronization] = useState(false);
  const [error, setError] = useState("");

  // cards
  const [mainState, setMainState] = useState([]);
  const [middleState, setMiddleState] = useState([]);
  const [cloudState, setCloudState] = useState([]);

  // modal
  const [modal, setModal] = useState({
    masage: "",
    isModal: false,
    version: false,
  });

 

  const api = ApiIndexedDB();
  const cloudApi = Convertor();

  let isW = useWiWidth(581);

  //DelNote
  const showModal = () => {
    setModal({ masage: "Delete entry?", isModal: true, version: false });
  };
  // auto Delete
  useEffect(() => {
    if (modal.version) {
      if (openItem.id === undefined) return;

      if (openItem.quintadb) {
        cloudApi.delRecord(openItem).then((result) => {
          if (result.status === 404) {
            setError(result.masage);
          } else {
            setCloudState((prevState) =>
              prevState.filter((obj) => obj.id !== result.data.id)
            );
            setSynchronization(true);
            setOpenItem([]);
          }
        });
      }

      if (openItem.indexeddb) {
        api.deleteRecord(openItem).then(({ data, status, masage }) => {
          if (status === 404) {
            setError(masage);
          } else {
            setMiddleState((prevState) =>
              prevState.filter((obj) => obj.id !== data.id)
            );
            setSynchronization(true);
            setOpenItem([]);
          }
        });
      }
      setModal({ masage: "", isModal: false, version: false });
    }
  }, [api, cloudApi, modal.version, openItem]);

  useEffect(() => {
    isW ? setBurger(false) : setBurger(true);
    openItem.id === undefined && setBurger(true);
  }, [isW, openItem]);

  //  database synchronization
  useEffect(() => {
    if (synchronization && (conectdb || conectClouddb)) {
      const mergedArray = [];
      if (middleState.length > 0) {
        middleState.forEach((item1) => {
          let found;
          cloudState.forEach((item2) => {
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
      cloudState.forEach((item) => {
        if (!mergedArray.find((i) => i.id === item.id)) {
          mergedArray.push(item);
        }
      });

      // setTimeout(() => {
      setSynchronization(false);
      setMainState(mergedArray);
      // }, 300);

      // const mergedArray = [...middleState];
      // cloudState.forEach((item) => {
      //   if (!mergedArray.find((i) => i.id === item.id)) {
      //     mergedArray.push(item);
      //   }
      // });
      // setMainState(mergedArray);
      // setSynchronization(false);
    }
  }, [cloudState, conectClouddb, conectdb, middleState, synchronization]);

  // connecting to databases
  useEffect(() => {
    if (conectClouddb === false) {
      cloudApi.getAll().then((result) => {
        if (result.status === 404) {
          setError(result.masage);
        } else {
          setCloudState(result.datd);
          setSelectiondb((prevState) => ({
            ...prevState,
            availabQuintadb: true,
          }));
          setSynchronization(true);
        }
        setClouddb(true);
      });
    }
    if (conectdb === false)
      api
        .connectToDB()
        .then(() => api.getData())
        .then(({ data, status, masage }) => {
          if (status === 404) {
            setError(masage);
          } else {
            setMiddleState(data);
            setSynchronization(true);
            setSelectiondb((prevState) => ({
              ...prevState,
              availabIndexeddb: true,
            }));
          }
          setConectdb(true);
        })
        .catch((error) => setError(error));
  }, [api, cloudApi, conectClouddb, conectdb]);

  const editNote = (newOpenItem) => {
    if (openItem.id === undefined) return;

    if (newOpenItem.quintadb) {
      cloudApi.changeRecord(newOpenItem).then((result) => {
        if (result.status === 404) {
          setError(result.masage);
        } else {
          setCloudState((prevState) =>
            prevState.map((item) =>
              item.id === result.data.id ? { ...item, ...result.data } : item
            )
          );
          setSynchronization(true);
        }
      });
    }

    if (newOpenItem.indexeddb) {
      api.editRecord(newOpenItem).then(({ data, status, masage }) => {
        if (status === 404) {
          setError(masage);
        } else {
          setMiddleState((prevState) =>
            prevState.map((item) =>
              item.id === data.id ? { ...item, ...newOpenItem } : item
            )
          );

          setSynchronization(true);
        }
      });
    }
  };

  const addNote = (quickCreation) => {
    const newOpenItem = {
      ...quickCreation,
      indexeddb: selectiondb.indexeddb,
      quintadb: selectiondb.quintadb,
    };

    if (newOpenItem.quintadb) {
      cloudApi.addRec(newOpenItem).then((result) => {
        if (result.status === 404) {
          setError(result.masage);
        } else {
          setCloudState((prevState) => [...prevState, result.data]);

          setOpenItem(result.data);
          setSynchronization(true);
          setEditItem(true);
        }
      });
    }

    if (newOpenItem.indexeddb) {
      api.addRecord(newOpenItem).then(({ data, status, masage }) => {
        if (status === 404) {
          setError(masage);
        } else {
          setMiddleState((prevState) => [...prevState, data]);
          setOpenItem(data);
          setSynchronization(true);
          setEditItem(true);
        }
      });
    }
  };

  const closeCart = () => {
    setOpenItem({});
    setEditItem(true);
  };
  const openCart = (cart) => {
    setOpenItem(cart);
    if (isW) setBurger(false);
    setEditItem(false);
  };

  return (
    <DivMain>
      <DivContent>
        <Sidebar
          burger={burger}
          setBurger={setBurger}
          isW={isW}
          setStateSearch={setStateSearch}
          stateSearch={stateSearch}
          addNote={addNote}
          showModal={showModal}
          setEditItem={setEditItem}
          editItem={editItem}
          isOpenItem={openItem.id === undefined ? false : true}
        />
        <DivWork burger={burger} isW={isW}>
          {burger && (
            <ListItem
              items={mainState}
              closeCart={closeCart}
              openCart={openCart}
              openItem={openItem}
              isW={isW}
              stateSearch={stateSearch}
              isOpenItem={openItem.id === undefined ? false : true}
            />
          )}
          {(!burger || !isW) && (
            <Workspace
              items={mainState}
              openItem={openItem}
              editNote={editNote}
              addNote={addNote}
              selectiondb={selectiondb}
              setSelectiondb={setSelectiondb}
              conectdb={conectdb}
              editItem={editItem}
              conectClouddb={conectClouddb}
            />
          )}
        </DivWork>
        <Notif error={error} setError={setError} />
        <Modal
          modal={modal}
          setModal={setModal}
          openItem={openItem}
          showModal={showModal}
        />
      </DivContent>
    </DivMain>
  );
}

export default App;
