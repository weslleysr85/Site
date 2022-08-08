
export default function createGameRender (game)
{
    const screen = document.getElementById("screen");
    const context = screen.getContext('2d');
    requestAnimationFrame(renderScreen); //executa a função renderScreen() que chama ela mesma a cada frame

    // imagens renderizadas 
    const playerImg = new Image();        
    playerImg.src = "img/player.png";
       
    const outerPlayerImg = new Image();
    outerPlayerImg.src = "img/outer-player.png";
    
    const itemImg = new Image();
    itemImg.src = "img/item.png";
    
    //HUD inferior
    const highScore = document.getElementById("highScore"); 
    const playersOn = document.getElementById("playersOn");
    

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
        function drawImgCACADO(img){
            function DegToRad(d)  
            {  
                // Converts degrees to radians  
                return d * 0.01745;  
            }
            // Save the current context  
            context.save();  
            // Translate to the center point of our image  
            context.translate(img.myImage.width * 0.5, img.myImage.height * 0.5);  
            // Perform the rotation  
            context.rotate(DegToRad(270));  
            // Translate back to the top left of our image  
            context.translate(-img.myImage.width * 0.5, -img.myImage.height * 0.5);  
            // Finally we draw the image  
            context.drawImage(img.myImage, 0,0, pixelSize, pixelSize); 
            // And restore the context ready for the next loop  
            context.restore();
        }



       
        //--- Renderizar players e fruits ----//
        for(const fid in game.state.fruits){
            const player = game.state.fruits[fid];            
            drawImg ({...player, myImage : itemImg}  );
        }
        
        for(const pid in game.state.players){
            const player = game.state.players[pid];                      
            drawImg ({...player, myImage : pid===game.current?playerImg:outerPlayerImg});
            if (player.points > highScore.innerHTML) { highScore.innerText = player.points};//HUD                       
        }        

        //HUD
        const playerPoints = document.getElementById("points");
        const currentPlayer = game.state.players[game.current];
        if(currentPlayer) playerPoints.innerText = currentPlayer.points;
        
        playersOn.innerText = Object.keys(game.state.players).length;        

        requestAnimationFrame(renderScreen); //cria o loop de atualização de tela
        
    }
}