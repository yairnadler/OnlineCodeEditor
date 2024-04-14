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

module.exports = { eventListener };
