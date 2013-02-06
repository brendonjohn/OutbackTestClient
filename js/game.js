var DIRECTIONS = {
	left:[-5,0],
	right:[5,0],
	up:[0,-5],
	down:[0,5]
};

var context;
var socket;
KeyboardJS.on('up', function() {
	MoveCharacter(DIRECTIONS['up']);
});

KeyboardJS.on('down', function() {
	MoveCharacter(DIRECTIONS['down']);
});

KeyboardJS.on('left', function() {
	MoveCharacter(DIRECTIONS['left']);
});

KeyboardJS.on('right', function() {
	MoveCharacter(DIRECTIONS['right']);
});

var playerList = {};

function Player(){
	this.x = 10;
	this.y = 10;
	this.height = 90;
	this.width = 90;
}

$(document).ready(function(){
	context = document.getElementById('arena').getContext('2d');
	socket = io.connect('http://localhost:8813');
	
	socket.on('connect', function(){
		console.log("connected");
		
		playerList['me'] = new Player();
		
		//submit starting location
		socket.emit('userdetails', {
		   x:playerList.me.x,
		   y:playerList.me.y 
	    });
		
		//Create Character
	    DrawCharacter(playerList['me']);
	});
	
	socket.on('user connect', function (player){
		playerList[player.id] = new Player();
		console.log("user connected, "+player.id);
	});
	
});

function DrawPlayers(){
	for (var id in playerList){
		DrawCharacter(playerList[id]);
	}
}

function DrawCharacter(character){
    context.fillRect (
    	character['x'],
    	character['y'],
    	character['width'],
    	character['height']
    );
}

function MoveCharacter(direction){
	var me = playerList['me'];
	context.clearRect(
		me.x,
    	me.y,
    	me.width,
    	me.height
	);
	
	me.x = me.x + direction[0];
	me.y = me.y + direction[1];
	
	DrawPlayers();
	
	if (socket){    
	    socket.emit('gameplay', {
		   x:me['x'],
		   y:me['y'] 
	    });	
    }
}
