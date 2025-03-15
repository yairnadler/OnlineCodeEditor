import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import axios from "axios";
import useSocket from "../hooks/useSocket";
import { baseServerURL } from "../Constants";

function Editor(props) {
  const { code: currentCode, isMentor } = props;
  const { id } = useParams();
  const [code, setCode] = useState("Start coding here...");
  const socket = useSocket(baseServerURL);
  
  const handleChange = (value) => {
    setCode(value);
    saveCode(value);
  };

  useEffect(() => {
    setCode(currentCode);
  }, [currentCode]);

  const saveCode = (value) => {
    axios.put(`${baseServerURL}/codeblock/${id}`, { code: value });
  };

  useEffect(() => {
    if (socket) {
      if (!isMentor) {
        socket.emit("code-send", { code, id });
      }
      socket.on("code-recieve", (data) => {
        if (data.code !== code && data.id === id) {
          setCode(data.code);
        }
      });
    }
  }, [socket, code]);

  return (
    <div>
      <CodeMirror
        value={code}
        height="85vh"
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
        theme={vscodeDark}
        readOnly={isMentor}
      />
    </div>
  );
}

export default Editor;
