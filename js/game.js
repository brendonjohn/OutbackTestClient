var DIRECTIONS = {
	left:[-5,0],
	right:[5,0],
	up:[0,-5],
	down:[0,5]
};

var context;
var socket;
KeyboardJS.on('up', function() {
	console.log('pressed: Up');
	MoveCharacter(DIRECTIONS['up']);
});

KeyboardJS.on('down', function() {
	console.log('pressed: down');
	MoveCharacter(DIRECTIONS['down']);
});

KeyboardJS.on('left', function() {
	console.log('pressed: left');
	MoveCharacter(DIRECTIONS['left']);
});

KeyboardJS.on('right', function() {
	console.log('pressed: right');
	MoveCharacter(DIRECTIONS['right']);
});

var character = {
	x:10,
	y:10,
	height: 90,
	width: 90
};

$(document).ready(function(){
	context = document.getElementById('arena').getContext('2d');
	DrawCharacter();
	socket = io.connect('http://localhost:8813');
	
	socket.on('connect', function () {
		console.log("connected");
		socket.emit('userdetails', {
		   x:character['x'],
		   y:character['y'] 
	    });
		
	});
	
});

function DrawCharacter(){
    context.fillRect (
    	character['x'],
    	character['y'],
    	character['width'],
    	character['height']
    );
    if (socket){    
	    socket.emit('gameplay', {
		   x:character['x'],
		   y:character['y'] 
	    });	
    }
}

function MoveCharacter(direction){
	context.clearRect(
		character['x'],
    	character['y'],
    	character['width'],
    	character['height']
	);
	
	character['x'] = character['x'] + direction[0];
	character['y'] = character['y'] + direction[1];
	DrawCharacter();
}
