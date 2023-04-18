const express = require("express");
const socket = require("socket.io");

import { Player, StateMennager } from "./stateMennager";
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});


// Socket setup
const io = socket(server);

// on connection
io.on('connection', (socket) => {
  console.log('a user connected');
  
  StateMennager.init()

  StateMennager.setPlayer(socket)



  // on move
  socket.on('move', (data) => {
    if(!StateMennager.isValidStart()){
        return false
    }
    const currentPlayer : Player = StateMennager.getPlayerById(socket.id);



    StateMennager.setMove(data.row , data.col ,currentPlayer )

    socket.broadcast.emit('turn', StateMennager.getTurn(currentPlayer.symbole));

    // check if the game is over
    let winner = StateMennager.checkWinner();

    if (winner) {
      socket.broadcast.emit('gameOver', winner);
      socket.emit('gameOver', winner);
      // reset the game
      StateMennager.game.end = true
      StateMennager.init()
    }

    socket.broadcast.emit('move', data);
  });

  // on disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



