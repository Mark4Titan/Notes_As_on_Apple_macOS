import { useEffect, useRef, useState } from "react";
import {
  DivContent,
  H2Data,
  DivWork,
  InputTitle,
  TContent,
  H2Wrap,
} from "./Workspace.styled";
import Icons from "../ico/Icons";
import moment from "moment/moment";

const Workspace = ({
  openItem,
  editNote,
  addNote,
  selectiondb,
  setSelectiondb,
  editItem,
  conectClouddb,
  conectdb,
}) => {
  // current state
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [ID, setID] = useState(null);
  // auto save
  const [autoTime, setAutoTime] = useState(null);
  const [tic, setTic] = useState(null);
  const [trigerTime, setTrigerTime] = useState(false);
  const inputRef = useRef(null);

  const time = () => Number(moment().format("ss"));

  useEffect(() => {
    if (editItem) {
      inputRef.current.focus();
    }
  }, [content.length, editItem]);

  useEffect(() => {
    let intervalId;
    if (trigerTime) {
      intervalId = setInterval(() => {
        setTic(time());
      }, 200);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [trigerTime]);

  useEffect(() => {
    if (trigerTime && autoTime + 0.5 < tic) {
      editNote({ ...openItem, content, title });
      setTrigerTime(false);
    }
  }, [autoTime, content, editNote, openItem, tic, title, trigerTime]);

  useEffect(() => {
    if (conectdb && conectClouddb) {
      if (selectiondb.availabIndexeddb) {
        setSelectiondb((prevState) => ({
          ...prevState,
          quintadb: false,
          indexeddb: true,
        }));
      } else if (selectiondb.availabQuintadb) {
        setSelectiondb((prevState) => ({
          ...prevState,
          quintadb: true,
          indexeddb: false,
        }));
      }
    }
  }, [
    conectClouddb,
    conectdb,
    selectiondb.availabIndexeddb,
    selectiondb.availabQuintadb,
    setSelectiondb,
  ]);

  useEffect(() => {
    if (openItem.id !== ID) {
      setContent("");
      setTitle("");
      setID(openItem.id === undefined ? null : openItem.id);
    } else {
      openItem.content && setContent(openItem.content);
      openItem.title && setTitle(openItem.title);
      openItem.indexeddb &&
        setSelectiondb((prevState) => ({
          ...prevState,
          quintadb: false,
          indexeddb: true,
        }));
      openItem.quintadb &&
        setSelectiondb((prevState) => ({
          ...prevState,
          quintadb: true,
          indexeddb: false,
        }));
    }
  }, [ID, openItem, setSelectiondb]);

  const texstChange = (setV, e) => {
    setTrigerTime(true);
    setAutoTime(time());
    setV(e);

    if (openItem.id === undefined) addNote({ ...openItem, content, title });
  };

  const managerActivConect = (userClicDb) => {
    if (userClicDb === "indexeddb" && selectiondb.availabIndexeddb)
      setSelectiondb((prevState) => ({
        ...prevState,
        quintadb: false,
        indexeddb: true,
      }));

    if (userClicDb === "quintadb" && selectiondb.availabQuintadb)
      setSelectiondb((prevState) => ({
        ...prevState,
        indexeddb: false,
        quintadb: true,
      }));
  };

  return (
    <DivWork>
      <DivContent>
        <H2Wrap>
          {(ID === null || openItem.indexeddb) && (
            <div onClick={() => managerActivConect("indexeddb")}>
              <Icons
                ico={selectiondb.indexeddb && trigerTime ? "rec" : "Databas"}
                C="ButDatabas"
                activConect={selectiondb.availabIndexeddb}
                varColor={
                  openItem.id === undefined
                    ? selectiondb.indexeddb
                    : openItem.indexeddb
                }
              />
            </div>
          )}
          {(ID === null || openItem.quintadb) && (
            <div onClick={() => managerActivConect("quintadb")}>
              <Icons
                ico={selectiondb.quintadb && trigerTime ? "rec" : "cloud"}
                C="ButDatabas"
                activConect={selectiondb.availabQuintadb}
                varColor={
                  openItem.id === undefined
                    ? selectiondb.quintadb
                    : openItem.quintadb
                }
              />
            </div>
          )}
          <H2Data>
            {openItem.created === undefined ? "Quick note" : openItem.created}
          </H2Data>
        </H2Wrap>

        <InputTitle
          value={title}
          disabled={!editItem}
          onChange={(e) => texstChange(setTitle, e.target.value)}
        />
        <TContent
          ref={inputRef}
          disabled={!editItem}
          value={content}
          onChange={(e) => texstChange(setContent, e.target.value)}
        >
          {openItem.content}
        </TContent>
      </DivContent>
    </DivWork>
  );
};
export default Workspace;
