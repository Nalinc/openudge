define(['app'],function(app){
	app.registerController('messageController',function($scope, $rootScope){

		var nickname = "John Doe"
		var socket = io.connect('http://192.168.1.90:8080');
		socket.emit('join',nickname);

		socket.on("AddMessage",function(data){
				console.log("AddMessage: data.name= "+data.name+" data.msg= "+data.text)
			});

		socket.on("addUser",function(data){
				console.log("AddUser:  "+data+" joined the chat")
		});

		socket.on("addAllUsers",function(data){
			console.log(data);
		});


		socket.on("removeUser",function(Nick){
				var listItems = $("#UserPane li");
				listItems.each(function(data) {
				    if($(this).html() == Nick)
				    	$(this).remove();
				    console.log(Nick);
				});		

				var msg = $("<span>").html("<span style='color:red;'>"+Nick+" Left the chat </span>");
				var removalMsg = $("<li>").append(msg);
				removalMsg.attr("style","text-align:center");
				$("#ChatPane").append(removalMsg);
				// socket.emit("messageOut",{name:null,text:removalMsg});
		});	

		
		$rootScope.user = {
							"name":"John Doe",
							"image":"../assets/images/users/avatar.jpg",
							}

		$scope.current = 1;


		$scope.contacts = {
							"0":{
								"id":"0",
								"name": "Echo Test",
								"image":"../assets/images/users/no-image.jpg",
								"description":"what goes around, comes around"	
							},
							"1":{
								"id":"1",
								"name": "Matt Hardy",
								"image":"../assets/images/users/user.jpg",
								"description":"This project is awesome"	
							}};

		$scope.messages = {
							"0":[],
							"1":[
									{
										"incoming":false,
										"text":"Hello, how may I help you ?",
										"time":"08:33",		
									},
									{
										"incoming":true,
										"text":"Hi, I need to know about products in kids category",
										"time":"08:39",
									}
							]
						}
		$scope.loadChat =function(selected){
			$scope.current = selected 
		}					


		$scope.submitMessage =function(){
			var msg = {
				"name":nickname,
				"incoming":false,
				"text":$scope.messageString,
				"time":new Date().getHours()+":"+new Date().getMinutes()
			}
			$scope.messageString = "";
			$scope.messages[$scope.current].push(msg);
			socket.emit("messageOut",msg);

		}	

	});
})


	