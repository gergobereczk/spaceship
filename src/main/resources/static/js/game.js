import gameLoop from "./gameLoop.js";

const game = {
    gameLoop: new gameLoop(),

    startGame: function() {
      
        this.gameLoop.start();
    },    
};



export default game;  
