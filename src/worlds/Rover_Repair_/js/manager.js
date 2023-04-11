//sockets component for the world
AFRAME.registerComponent('multi-interactions', {
    init: function(){
        
        //setting up socket.io connections
        CONTEXT_AF              = this;
        CONTEXT_AF.socket       = null;
        CONTEXT_AF.connected    = false;

        CONTEXT_AF.parts = document.querySelectorAll("[id*='part']");
        CONTEXT_AF.rovers = document.querySelectorAll("[id*='rover']");

        CONTEXT_AF.el.sceneEl.addEventListener(CIRCLES.EVENTS.WS_CONNECTED, function (data) {
            CONTEXT_AF.socket    = CIRCLES.getCirclesWebsocket();
            CONTEXT_AF.connected = true;

            //updates part location when another player picks up a part
            CONTEXT_AF.socket.on("partHoldEvent", function(data){
                
                console.log("emit called");

                let posibPlayers = document.querySelectorAll('[networked]');    //select all nodes that contain the networked attribute (expected that players will only have this)
                let otherPlayer = findOtherPlayer(posibPlayers, data.pnID);

                //if there has been another player found then have the part be a child of their avatar
                if(otherPlayer){
                    //console.log("calling adoption");
                    //adoptPart(otherPlayer.querySelector(".avatar"), data.partIdx, false);
                    pickup(otherPlayer.querySelector(".avatar"), data.partId);

                    console.log("updating other player");
                }
                
            });

            //updates rover with part that has been placed by other player
            CONTEXT_AF.socket.on("roverPartEvent", function(data){
                
                let posibPlayers = document.querySelectorAll('[networked]');    //select all nodes that contain the networked attribute (expected that players will only have this)
                let otherPlayer = findOtherPlayer(posibPlayers, data.pnID);

                //if another player is found and matches data.pnID then do the following
                if(otherPlayer){
                    let part = otherPlayer.querySelector(".avatar").querySelector("[id*='part']");
                    let partIdx = Number(part.id.slice(-2));
                    let rover = document.getElementById(data.roverID);

                    adoptPart(rover, partIdx, true);
                }
            });

            //looping through all possible rovers
            for(let i=0; i < CONTEXT_AF.rovers.length; i++){
                
                let rover = CONTEXT_AF.rovers[i];
                
                //add event liseners for rovers
                rover.addEventListener('partPlaced', function(){
                    
                    //find the player who place the object and call the socket function
                    let playerNetId = document.getElementById("Player1").getAttribute("networked").networkId;
                    CONTEXT_AF.socket.emit("roverPartEvent", {pnID:playerNetId, roverID:this.id, room:CIRCLES.getCirclesGroupName(), world:CIRCLES.getCirclesWorldName()});
                });
            }

        });

    }
});

//function that finds the potential players
function findOtherPlayer(posibPlayers, pnID){

    //loop through all players in posibPlayers variable
    for(let i = 0; i < posibPlayers.length; i++){
                    
        //get the current possible player's networked id
        let curNetId = posibPlayers[i].getAttribute("networked").networkId;
        
        //when a match is found this means we found the player who's holding the part
        if(curNetId == pnID){
            return posibPlayers[i];
        }
    }

    return null; //when nothing is found return null
}

