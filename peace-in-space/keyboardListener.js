function createKeyboardListener() 
{
    function notifyAll (command)
    {
        console.log(command);        
    }     
   
   
    document.addEventListener('keydown', handleKeydown);
    function handleKeydown (event)
    {
        const command = {
            type:'move-player',
            id:'state.playerId',
            keyPressed:event.key
        }

        notifyAll(command);
    }

    return notifyAll;
}

export default createKeyboardListener();