define(['./module'],function(module){
    module.directive("cell",function(){
        return {
            restrict:"A",
            link:function(scope,element,attr){
                scope.enter = function(){
                    element.children(".cell_bar").css("top","0");       
                };
                scope.leave = function(){
                    element.children(".cell_bar").css("top","-30px");       
                };
                element.on("click",function(e){
                    e.stopPropagation();
                    if(e.target == $(".cell_kit_trash")[0]){
                        element.remove();
                    }else if(e.target == $(".cell_kit_gear")[0]){
                        
                    }
                });
                scope.$watch("wvalue",function(){
                    var cls = element.attr("class");
//                    var res = cls.match(/col-(xs|sm|md|lg)-\d+/ig)
//                    var s = Array(res).join(" ");
//                    element.removeClass(cls);
//                    element.addClass("col-md-"+ scope.wvalue);
//                    element.addClass("col-lg-"+ scope.wvalue);
//                    element.addClass("col-sm-"+ scope.wvalue);
//                    element.addClass("cell_base");
                });
            },
            controller:"CellCtrl"
        };
    }).controller("CellCtrl",['$scope',function($scope){
//        $scope.active = {in:0};

    }]);
});