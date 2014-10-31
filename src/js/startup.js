require(['./config'],function(){
    require(['jquery','angular','angular-route',//这个里面引入的地址是现对于当前这个js的
             'angular-ui',
             './controllers/MainCtrl',
             './directives/MainDirective',
             './directives/cell',
             './directives/angular.rangeSlider',
             './directives/flipper',
             './filters/utility',
             './services/DialogService'],function($,angular){
        var app = angular.module("app",['ngRoute',
                                        'dt.dawn.controller',
                                        'dt.dawn.directive',
                                         'dt.dawn.service',
                                         'dt.dawn.filter',
                                         'ui.bootstrap']);
        app.config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/default',{// 
                templateUrl:'../../html/partials/choose.html',
                controller:'DefaultCtrl'
            }).
            when('/free',{//自由组织数据
                templateUrl:'../../html/partials/free.html',
                controller:'FreeCtrl'  //上面的itemId 会在这个controller里面使用到，$routeParams.itemId
                /***
                例如：http://127.0.0.1:53791/html/index.html#/details/8
                $routeParams.itemId = 8
                **/
            }). 
            when('/ext',{//外部页面URL
                templateUrl:'../../html/partials/world.html',
                controller:'ExtCtrl'  //上面的itemId 会在这个controller里面使用到，$routeParams.itemId
            }).             
            otherwise({//else
                redirectTo:'/default',
            });
        }]);
        angular.bootstrap(document,["app"]);
    })
});