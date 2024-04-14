const { eventListener } = require("./socket");
const { Server } = require("socket.io");
const { baseUrl } = require("./constants");

const corsOptions = {
  origin: `${baseUrl.client}`,
};

module.exports.handler = async (event) => {
  const io = new Server({ cors: corsOptions });
  eventListener(io);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Socket server initialized" }),
  };
};
