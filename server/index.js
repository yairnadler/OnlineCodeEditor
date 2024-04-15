const express = require("express");
const cors = require("cors");
const { CodeBlocks } = require("./model/CodeBlocks");
const { Server } = require("socket.io");
const { baseUrl } = require("./constants");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

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
    if (!isMentor) {
      isMentor = true;
      mentorSockerID = socket.id;
      socket.emit("position", { isMentor: true });
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
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  const ioserver = io.listen(server);
  ioserver.on("connection", (socket) => eventListener(socket));
};

if (process.env.NODE_ENV !== "production") {
  init();
} else {
  // Production environment
  const https = require("https");
  const fs = require("fs");
  const path = require("path");

  const certPath = path.resolve(process.env.CERT_PATH);
  const certFilePath = path.join(certPath, "fullchain.pem");
  const privateKeyPath = path.join(certPath, "privkey.pem");

  const certificate = fs.readFileSync(certFilePath);
  const privateKey = fs.readFileSync(privateKeyPath);

  const options = {
    key: privateKey,
    cert: certificate,
  };

  const https_Server = https.createServer(options, app);
  const https_socketServer = new Server(https_Server);

  https_Server.listen(PORT, () => {
    console.log("Running...");
  });

  https_socketServer.on("connection", (socket) => eventListener(socket));
}
