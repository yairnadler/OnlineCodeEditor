const express = require("express");
const cors = require("cors");
const { CodeBlocks } = require("./model/CodeBlocks");
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

const init = () => {
  app.listen(PORT, () => {});
};

init();
