define(function(){

	var nickname = "ADAM"
	socket = io.connect('http://192.168.1.90:8080');
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
/*
	socket.on("addAllMessage",function(data){
			for(var i in data)
			{
				var list = $("<li>");
			if(data[i].name !== null)
				 chat = $("<span>").html("<b>"+data[i].name+"</b>: "+data[i].text);
			else
			{
				 chat = $("<span>").html(data[i].text);
				list.attr("style","text-align:center");				
			}

				list.append(chat);
				$("#ChatPane").append(list);				
			}
			$('.emoticons').emoticonize();	
			$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");					
	});	
*/

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

	changeNick = function(){
					alert(client.nickname+' really suits you, please please dont change');
				};


	function preSend(){

		var nick = nickname;
		var msg = $("#chatInput").val().replace(/\r\n|\r|\n/g,"<br />");
		alert(nick+": "+msg)
	
            <div class="item in">
                <div class="image">
                    <img src="../assets/images/users/user2.jpg" alt="John Doe">
                </div>
                <div class="text">
                    <div class="heading">
                        <a href="#">John Doe</a>
                        <span class="date">08:33</span>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis suscipit eros vitae iaculis.
                </div>
            </div>

        var ele = $("<div class='item in'><div class='image'></div><div><div></div></div></div>");    

		$("#ChatPane").append(ele);
		$("#chatInput").val("");
	
		socket.emit("messageOut",{name:nick,text:msg});	
//		$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");
	}


	$(document).on("click","#submit",preSend);

	$("#chatInput").on("keydown",function(e){
        if ((e.keyCode == 32) && e.ctrlKey)
        {
            preSend();
        }

	});


	window.changeNick = changeNick;



	 return {
		nickname: nickname,
		clogs: function(){
					console.log("User "+nickname+" joined!");
				}
	};
 
});



