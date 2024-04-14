const { eventListener } = require("./socket");

module.exports.handler = async (event) => {
  const io = new Server();
  eventListener(io);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Socket server initialized" }),
  };
};