import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import axios from "axios";
import { baseServerURL } from "../Constants";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CodeBlock(props) {
  const { currentCode, isMentor, currentSolution, currentID } = props;
  const [javascriptCode, setJavascriptCode] = useState("");

  useEffect(() => {
    setJavascriptCode(currentCode);
  }, [currentCode]);

  return (
    <>
      <div className="title" h1>
        CODE BLOCK {isMentor ? "MENTOR" : "STUDENT"}
      </div>
      <div className="pane top-pane">
        <Editor
          language="javascript"
          code={javascriptCode}
          onChange={setJavascriptCode}
          isMentor={isMentor}
        />
      </div>
      <button className="btn btn-primary" disabled={isMentor}>
        submit
      </button>
    </>
  );
}
