import { useEffect, useState } from "react";
import {
  DivContent,
  H2Data,
  DivWork,
  InputTitle,
  TContent,
} from "./Workspace.styled";

const Workspace = ({ openItem }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (openItem.content === undefined) {
      setContent("");
      setTitle("");
    } else {
      setContent(openItem.content);
      setTitle(openItem.title);
    }
  }, [openItem]);

  return (
    <DivWork>
      <DivContent>
        <H2Data>{openItem.data}</H2Data>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
        <TContent value={content} onChange={(e) => setContent(e.target.value)}>
          {openItem.content}
        </TContent>
      </DivContent>
    </DivWork>
  );
};
export default Workspace;
