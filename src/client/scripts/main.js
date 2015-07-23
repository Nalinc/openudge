define([ 
    'app',
    'jquery',   
    'angular',
    'bootstrap',
    'jqueryui',
    'bootstrap',
    'events',
 //   'icheck',
    'leftPanel',
    'headerPane'
], function (app) {

    'use strict';

     angular.element(document).ready(function() {
        angular.bootstrap(document, [app['name'],function(){
            angular.element(document).find('html').addClass('ng-app');
        }]);
    });
});
