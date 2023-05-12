import { useEffect, useState } from "react";
import {
  DivContent,
  H2Data,
  DivWork,
  InputTitle,
  TContent,
} from "./Workspace.styled";
// import moment from "moment/moment";

const Workspace = ({ openItem, editNote, addNote }) => {
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

  return (
    <DivWork>
      <DivContent>
        <H2Data>
          {openItem.created === undefined ? "Quick note" : openItem.created}
        </H2Data>

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
