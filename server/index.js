const express = require("express");
const cors = require("cors");
const { CodeBlocks } = require("./model/CodeBlocks");
const { Server } = require("socket.io");
const { baseUrl } = require("./constants");
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: `${baseUrl.client}`,
};

const io = new Server({ cors: corsOptions });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ CodeBlocks });
});

app.get("/codeblock/:id", (req, res) => {
  const { id } = req.params;
  const codeBlock = CodeBlocks.find((codeBlock) => codeBlock.id === Number(id));
  res.send({ codeBlock });
});

app.put("/codeblock/:id", (req, res) => {
  const { id } = req.params;
  const { code } = req.body;
  const codeBlock = CodeBlocks.find((codeBlock) => codeBlock.id === Number(id));
  codeBlock.code = code;
  res.status(200).send("OK!");
});

let isMentor = false;
let mentorSockerID = "";

const eventListener = (socket) => {
  socket.on("join-lobby", () => {
    count = io.engine.clientsCount;
    console.log(isMentor);
    if (!isMentor) {
      isMentor = true;
      mentorSockerID = socket.id;
      socket.emit("position", { isMentor: true });
    } else {
      socket.emit("position", { isMentor: false });
    }
  });

  socket.on("code-send", (data) => {
    socket.broadcast.emit("code-recieve", data);
  });

  socket.on("disconnect", () => {
    if (socket.id === mentorSockerID) {
      isMentor = false;
    }
  });
};

const init = () => {
  const server = app.listen(PORT, () => {});
  const ioserver = io.listen(server);

  ioserver.on("connection", (socket) => eventListener(socket));
};

init();
