define(['app'],function(app){
	app.registerDirective('headerPane',function(){
		return{
			restrict:'E',
			templateUrl: "views/header.tpl.html",
			link: function(){
				require(['mCustomScrollbar','plugins','actions'],function(){

				})
			},
			controller: function(){

			}

		}
	});
})
