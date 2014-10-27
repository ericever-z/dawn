require(['./config'],function(){
    require(['angular','angular-route','./controllers/MainCtrl'],function(angular){
        var app = angular.module("app",['ngRoute','dt.dawn.controller']);
        app.config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/hello',{// 
                templateUrl:'../../html/partials/d-part1.vm',
                controller:'DefaultCtrl'//
            }).
            when('/world',{
                templateUrl:'../../html/partials/world.vm',
                controller:'SpecifyCtrl'  //上面的itemId 会在这个controller里面使用到，$routeParams.itemId
                /***
                例如：http://127.0.0.1:53791/html/index.html#/details/8
                $routeParams.itemId = 8
                **/
            }). 
            otherwise({//else
                redirectTo:'',
                templateUrl:'../../html/partials/d-part1.vm',
                controller:'DefaultCtrl'
            });
        }]);
        angular.bootstrap(document,["app"]);
    })
});