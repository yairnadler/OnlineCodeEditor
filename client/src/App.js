import axios from "axios";
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { baseServerURL } from "./Constants";

function App() {
  const [allCodeblocks, setAllCodeblocks] = useState([]); // [ { id: 1, title: "Codeblock 1", code: "console.log('Hello World!')" }
  const [codeblocksTitles, setCodeblocksTitles] = useState([]);
  const [codes, setCodes] = useState("");
  const [solutions, setSolutions] = useState([""]);
  const [currentCode, setCurrentCode] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const socket = useSocket(baseServerURL);

  useEffect(() => {
    axios.get(`${baseServerURL}`).then((res) => {
      setAllCodeblocks([...res.data.CodeBlocks]);
      setCodeblocksTitles(
        res.data.CodeBlocks.map((codeblock) => codeblock.title)
      );
      setCodes(res.data.CodeBlocks.map((codeblock) => codeblock.code));
      setSolutions(res.data.CodeBlocks.map((codeblock) => codeblock.solution));
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join-lobby");
      socket.on("position", (data) => {
        setIsMentor(data.isMentor);
      });
    }
  }, [socket]);

  return (
    <div>
      <BrowserRouter basename="/CodeEditorFront">
        <Routes>
          <Route
            index
            element={
              <Lobby
                codeblocks={allCodeblocks}
                titles={codeblocksTitles}
                setCurrentCode={setCurrentCode}
                setCurrentSolution={setCurrentSolution}
                heading="CHOOSE CODE BLOCK"
              />
            }
          />
          <Route
            path="/codeblock/:id"
            element={
              <CodeBlock
                currentCode={currentCode}
                currentSolution={currentSolution}
                isMentor={isMentor}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
