import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseServerURL } from "../Constants";

function Lobby({ codeblocks, titles, heading, setCurrentCode, setCurrentSolution }) {
  const nav = useNavigate();

  const onSelectedItem = (id) => {
    axios.get(`${baseServerURL}/codeblock/${id}`).then((res) => {
      setCurrentCode(res.data.codeBlock.code);
      setCurrentSolution(res.data.codeBlock.solution);
    });
    nav(`/codeblock/${id}`);
  };

  return (
    <>
      <h1>{heading}</h1>
      {titles.length === 0 && <p>No items to display</p>}
      <ul className="list-group">
        {titles.map((title, index) => (
          <li
            className={"list-group-item"}
            key={title}
            onClick={() => {
              onSelectedItem(codeblocks[index].id);
            }}
          >
            {title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Lobby;
