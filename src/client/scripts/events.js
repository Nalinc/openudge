define(['app'],function(app){
	app.registerService('chat',function($rootScope){


		this.contacts = {
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

		this.messages = {
							"0":[],
							"1":[
									{
										"id":"1",
										"incoming":false,
										"text":"Hello, how may I help you ?",
										"time":"08:33",		
									},
									{
										"id":"1",
										"incoming":true,
										"text":"Hi, I need to know about products in kids category",
										"time":"08:39",
									}
							]
						}

		
		$rootScope.user = {
							"name":"John Doe",
							"image":"../assets/images/users/avatar.jpg",
							}

		var nickname = $rootScope.user.name;

		this.socket = io.connect('http://localhost:8080');
		this.socket.emit('join',nickname);

		$rootScope.socket = this.socket;
	});
})


	 