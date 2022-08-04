
export default function createGameRender (game)
{
    const screen = document.getElementById("screen");
    const context = screen.getContext('2d');
    requestAnimationFrame(renderScreen); //executa a função renderScreen() que chama ela mesma a cada frame

    // imagens renderizadas 
    const playerImg = new Image();        
    const outerPlayerImg = new Image();
    const itemImg = new Image();
    playerImg.src = "img/nave.png";
    outerPlayerImg.src = "img/nave-parceira.png";
    itemImg.src = "img/item.png";

    
    const highScore = document.getElementById("highScore");; //HUD

    function renderScreen () 
    {
       
        context.clearRect(0, 0, screen.width, screen.height); //variaveis no index.html

        const pixelSize = screen.width / game.state.size;

        function drawRect (rect)
        {
            context.fillStyle = rect.color;
            context.fillRect(rect.x*pixelSize, rect.y*pixelSize, pixelSize, pixelSize);                    
        }

        function drawImg (img){            
            context.drawImage(img.myImage, img.x*pixelSize, img.y*pixelSize, pixelSize, pixelSize);
        }
       
        //--- Renderizar players e fruits ----//
        for(const pid in game.state.players){
            const player = game.state.players[pid];
           // drawRect({...player, color:pid===game.current?'yellow':'black'})
            //let img  = document.getElementById("playerImage");
            //let img2 = document.getElementById("outerPlayerImage");            
            drawImg ({...player, myImage : pid===game.current?playerImg:outerPlayerImg}  );
            if (player.points > highScore.innerHTML) { highScore.innerText = player.points};//HUD
        }

        for(const fid in game.state.fruits){
            const player = game.state.fruits[fid];
            //drawRect({...player, color:'green'}) 
           /* let img = document.getElementById("itemImage");*/
            drawImg ({...player, myImage : itemImg}  );
        }

        //HUD
        const playerPoints = document.getElementById("points");
        const currentPlayer = game.state.players[game.current];
        if(currentPlayer) playerPoints.innerText = currentPlayer.points;

        requestAnimationFrame(renderScreen); //cria o loop de atualização de tela
        
    }
}