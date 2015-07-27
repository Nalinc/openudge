define(['app','events'],function(app){
	app.registerController('messageController',function($scope, $rootScope , chat){

     	$rootScope.items=["home","messages"]

		$scope.messages = chat.messages;
		$scope.contacts = chat.contacts;

		$scope.current = 1;


		$scope.loadChat =function(selected){
			$scope.current = selected 
		}					


		$scope.submitMessage =function(){
			var msg = {
				"id":$scope.current,
//				"type":($scope.current==0)?"echo":"normal",
				"name":$rootScope.user.name,
				"incoming":false,
				"text":$scope.messageString,
				"time":new Date().getHours()+":"+new Date().getMinutes()
			}
			$scope.messageString = "";
			chat.messages[$scope.current].push(msg);
			$rootScope.socket.emit("messageOut",msg);
		}	

		$rootScope.socket.on("AddMessage",function(data){
				chat.messages[$scope.current].push(data)
				$scope.$apply();
			});

		$rootScope.socket.on("addUser",function(data){
				console.log("AddUser:  "+data+" joined the chat")
		});

		$rootScope.socket.on("addAllUsers",function(data){
			console.log(data);
		});

		$rootScope.socket.on("addAllMessage",function(data){
				for(var i in data)
				{
					var list = $("<li>");
					if(data[i].name !== null)
					{
						chat.messages[data[i].id].push(data[i])
						$scope.$apply();
					}
					else
					{
//						console.log(data[i]);
					}

///					list.append(chat);
	//				$("#ChatPane").append(list);				
				}
	//			$('.emoticons').emoticonize();	
	//			$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");					
		});	



		$rootScope.socket.on("removeUser",function(Nick){
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



	});
})


	