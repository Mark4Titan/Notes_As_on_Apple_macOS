import { DivContent, DivMain, DivWork } from "./app.styled";
import ListItem from "./components/ListItem/ListItem";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";

function App() {
  return (
    <DivMain>
      <DivContent>
        <Sidebar />
        <DivWork>
          <ListItem />
          <Workspace />
        </DivWork>
      </DivContent>
    </DivMain>
  );
}

export default App;
