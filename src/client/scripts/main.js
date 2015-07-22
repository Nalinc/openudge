define([ 
    'app',
    'jquery',   
    'angular',
    'bootstrap',
    'jqueryui',
    'bootstrap',
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
