var http = require('http'),
    port = process.env.PORT || 8080,
    app = require('./app'),
    server = require('http').createServer(app()),
    io = require('socket.io')(server); 


var messages = [];
var users = [];

var storeMessage = function(data){
	messages.push(data);
	if(messages.length > 10){
		messages.shift();
	}
};

var storeUsers = function(name){
	users.push(name);
};

io.on('connection',function(client){
//	console.log('client connected');
//	client.emit('chat',{hello:'world'});

	client.on('join',function(data){

		client.name = data; //add a new property to client to identify it during deletion

		console.log(messages);
		storeMessage({'name':null,'status':'joined'});

		storeUsers(data);
		console.log('user ' +data+' joined!');
//		console.log(users);
		client.broadcast.emit("addUser",data);
		client.emit("addAllUsers",users);
		client.emit("addAllMessage",messages);

	});

	client.on('messageOut',function(data){
		console.log(data)
		storeMessage(data);
		if(data.id=="0")  //echo message
		{
			var obj = JSON.parse(JSON.stringify(data));
			obj.incoming=true;

			storeMessage(obj);			
			client.emit("AddMessage",obj);
		}	
		//else..normal chat broadcast
	});

	client.on("disconnect",function(){
		console.log("user "+client.name+" left..");
	    var i = users.indexOf(client.name);
	    users.splice(i, 1);
		storeMessage({'name':null,'status':'left'});


	    client.broadcast.emit("removeUser",client.name);
});
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});





