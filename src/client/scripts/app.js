define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
	], function(angular, couchPotato) {

		var app = angular.module('app', ['scs.couch-potato', 'ui.router']);

		app.config(function($stateProvider, $urlRouterProvider, $couchPotatoProvider){

			$urlRouterProvider.otherwise('/');

			$stateProvider
	        	.state('home', {
		            url: '/',
	        		template:"<div>HOME</div>"
	        	})
	        	.state('messages',{
	        		url: '/messages',
	        		templateUrl:"views/messages.tpl.html",
	        		controller:"messageController",
	        		resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            '../controllers/messages'
                        ])
                    }
	        	})
	        	.state("otherwise", { url : '/'})

		});

		couchPotato.configureApp(app);

		app.run(function($couchPotato) {
			//Enable run-time-register components instead of config-time-registering them.
			app.lazy = $couchPotato;
		}); 

		return app;

	}
);