import keyboardListener from "./keyboardListener.js";
import createGame from "./game.js";
import createGameRender from "./gameRender.js"


const game = createGame();
const gameRender = createGameRender(game);

const socket = io();

socket.on('connect', ()=>
{
    const playerId = socket.id;
});

socket.on('disconnect', ()=>
{
    const playerId = socket.id;
    keyboardListener.clear();
});

socket.on('setup', (state)=>
{
    const playerId = socket.id;
    game.setState(state);

    game.current = playerId;
    keyboardListener.registerPlayerId(playerId);
    keyboardListener.subscribe((command) => 
    {
        socket.emit('move-player', command);
    });
});

socket.on('add-player', (command)=>
{
    game.addPlayer(command);
});

socket.on('remove-player', (command)=>
{
    game.removePlayer(command);
});

socket.on('move-player', (command)=>
{
    const playerId = socket.id;
    game.movePlayer(command);
});

socket.on('add-fruit', (command)=>
{
    game.addFruit(command);
});

socket.on('remove-fruit', (command)=>
{
    game.removeFruit(command);
});

socket.on('player-points', (command)=>
{
    game.state.players[command.id].points = command.points;
});
