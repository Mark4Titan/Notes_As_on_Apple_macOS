import { useEffect, useState } from "react";
import {
  DivContent,
  H2Data,
  DivWork,
  InputTitle,
  TContent,
  H2Wrap,
} from "./Workspace.styled";
import Icons from "../ico/Icons";
// import moment from "moment/moment";

const Workspace = ({
  openItem,
  editNote,
  addNote,
  selectiondb,
  setSelectiondb,
}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [ID, setID] = useState(null);
  // const momSS = () => parseInt(moment().format("ss"));

  useEffect(() => {
    if (openItem.id !== ID) {
      setID(openItem.id);
      setContent("");
      setTitle("");
    }

    if (openItem.id === undefined) {
      setContent("");
      setTitle("");
      setID(null);
    } else {
      openItem.content && setContent(openItem.content);
      openItem.title && setTitle(openItem.title);
    }
  }, [ID, openItem]);

  const texstChange = (E, val, blockChange) => {
    E(val);
    const newOpenItem = { ...openItem, [blockChange]: val };
    if (openItem.id === undefined) addNote(newOpenItem);
    startAutoSave(newOpenItem);
  };

  const startAutoSave = (newOpenItem) => {
    let intervalId;

    intervalId = setInterval(() => {
      editNote(newOpenItem);
      clearInterval(intervalId);
    }, 1500);
  };
  const ControlBD = (db) => {
    const updatedSelectiondb = { ...selectiondb, [db]: !selectiondb[db] };
    if (Object.values(updatedSelectiondb).every((v) => v === false)) {
      return;
    }
    setSelectiondb(updatedSelectiondb);
  };

  return (
    <DivWork>
      <DivContent>
        <H2Wrap>
          <div onClick={() => ControlBD("indexeddb")}>
            <Icons
              ico="Databas"
              C="ButDatabas"
              varColor={ 
                openItem.id === undefined
                  ? selectiondb.indexeddb
                  : openItem.indexeddb !== undefined && openItem.indexeddb
              }
            />
          </div>
          <div onClick={() => ControlBD("quintadb")}>
            <Icons
              ico="cloud"
              C="ButDatabas"
              varColor={
                openItem.id === undefined
                  ? selectiondb.quintadb
                  : openItem.quintadb !== undefined && openItem.quintadb
              }
            />
          </div>
          <H2Data>
            {openItem.created === undefined ? "Quick note" : openItem.created}
          </H2Data>
        </H2Wrap>

        <InputTitle
          value={title}
          onChange={(e) => texstChange(setTitle, e.target.value, "title")}
        />
        <TContent
          value={content}
          onChange={(e) => texstChange(setContent, e.target.value, "content")}
        >
          {openItem.content}
        </TContent>
      </DivContent>
    </DivWork>
  );
};
export default Workspace;
