ig.module(
	'game.entities.object'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityObject = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(155,50,155,0.6)',
	_wmScalable: true,
	size:{x:8,y:8},
	maxVel: {x: 000, y: 000},
	
	what: false,
	checkAgainst: ig.Entity.TYPE.BOTH,
   
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},
	facePlayer: function() {
		var player = ig.game.getEntityByName("player");

		var pCenPosX = player.pos.x + (player.size.x / 2);
		var pCenPosY = player.pos.y + (player.size.y / 2);

		var myCenterPosX = this.pos.x + (this.size.x / 2);
		var myCenterPosY = this.pos.y + (this.size.y / 2);

		//Calculate differences
		var dx = pCenPosX - myCenterPosX;
		var dy = pCenPosY - myCenterPosY;

		//Determine which axis has a greater difference
		if (Math.abs(dx) > Math.abs(dy)) {
			// Horizontal distance is greater than vertical distance
			if (dx > 0) {
				player.facingDir = "west"; // Player needs to face east
			}
			else{
				player.facingDir = "east"; // Player needs to face west
			}
		}
		else{
			// Vertical distance is greater or they are the same
			if (dy > 0) {
				player.facingDir = "north"; // Player needs to face south
			}
			else{
				player.facingDir = "south"; // Player needs to face north
			}
		}
	},
	handleObjBox: function(prompt, objName, longResp, computer, conditionalResponse){
		if (ig.game.clickDelayTimer.delta() > 0){
			if (prompt && !ig.game.objBoxOpen){
				//Open or Close Prompt Box
				if (!ig.game.promptBoxOpen){
					console.log('opening prompt box')
					ig.game.promptBoxOpen = true;
					if (longResp){
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "inspectPromptLongResp", oName: objName });	
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no", cType: "inspectPromptLongResp", oName: objName  });	
					}
					else if (computer){
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "logOnComputer", oName: objName });	
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no", cType: "logOnComputer", oName: objName  });	
					}
					else if (conditionalResponse){
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "conditionalResponse", oName: objName });	
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no", cType: "conditionalResponse", oName: objName  });	
					}
					else{
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "inspectPrompt", oName: objName });	
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no", cType: "inspectPrompt", oName: objName  });	
					}
						
				}
				
			}
			else{
				//Open or Close Object Dialogue Box
				ig.game.objBoxOpen = ig.game.objBoxOpen ? false : true;
				
				//Open a Door on Close
				if (ig.game.openThisDoor){
					ig.game.openDoor(ig.game.openThisDoor);
					ig.game.openThisDoor = false;
				}
				//Kill this Object so Player Cant Re-Interact With It.
				if(ig.game.killThisObject){
					ig.game.killThisObject = false;
					this.kill();
				}
				
			}
		}
	},
	getObjectKey: function(id) {
		return 'obj' + id.toString().padStart(2, '0');
	},
	check:function(other){
		if( other instanceof EntityPlayer ) {
			
			if (ig.input.released('action') && ig.game.clickDelayTimer.delta() > 0 && !ig.game.computerOn || ig.input.released('click') && ig.game.clickDelayTimer.delta() > 0 && !ig.game.computerOn) {
				
				if (ig.game.longObjTxt){
					ig.game.advanceDialogue();
				}
				else{
					//Set Object Interaction Parameters
					var isComputer = false;
					var hasPrompt = false;
					var longResponse = false;
					var hasConditionalResponse = false;
					
					var objKey = this.getObjectKey(this.what);  // Get the dynamic key based on this.what
					var descKey = 'desc01';  // Assuming you want to always access 'desc01'
					ig.game.inspObjTxt = ig.game.objTxt[objKey][descKey];
					
					//Check if Object Has Prompt
					if (ig.game.objTxt[objKey].conditionalResponse) {
						console.log(objKey + " has a conditionalResponse.");
						hasConditionalResponse = true;
					}
					//Check if Object Has Conditional Response
					if (ig.game.objTxt[objKey].hasPrompt) {
						console.log(objKey + " has a computer.");
						hasPrompt = true;
					}
					
					//Check if Object Has a Long Response
					if (ig.game.objTxt[objKey].longResponse) {
						console.log(objKey + " has a long response.");
						longResponse = true;
					}
					//Check if Object Is a Computer
					if (ig.game.objTxt[objKey].isComputer) {
						console.log(objKey + " is a computer.");
						ig.game.computerDisplay = ig.game.objTxt[objKey].computerDisplay;
						isComputer = true;
					}
					
					this.handleObjBox(hasPrompt, objKey, longResponse, isComputer, hasConditionalResponse);	
				}
				//Face Player to Object
				this.facePlayer();
				//Prevent Reopening Unintentional
				ig.game.clickDelayTimer.set(.33);
			}
			
		}
	}
});
	ig.EntityPool.enableFor( EntityObject );
});