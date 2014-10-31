define(['./module'],function(module){
    module.controller('DefaultCtrl',['$scope',function($scope){
        $scope.specify = function(name){
              window.location.replace("#"+name);
           
        };
    }]).controller('FreeCtrl',['$scope','DService',function($scope,DService){//自由组织数据
        DService.alert().then(function(result){//确定和提交的后续在这里处理
            //alert(result);
        },function(err){//关闭和cancel的后续处理在这里
            
        });
    }]).controller('ExtCtrl',['$scope',function($scope){//外部页面嵌入
        
    }]);
});