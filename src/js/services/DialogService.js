define(['./module'], function (module) {
    window.URLRE =/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    module.factory("DService",['$modal',function ($modal) {
            this.alert = function (title) {
                var args=arguments;
                title = title || "组件面板";
                var modalInstance = $modal.open({
                templateUrl:"../../../html/partials/template.html",
                size:"lg",    
                controller:"ConfigCtrl",
                resolve:{
                        source:function(){
                            return args;
                        }
                    }                
                });  
                return modalInstance.result;
            };
            return this;
    }]).controller("ConfigCtrl",['$scope','$modalInstance','source',function($scope,$modalInstance,source){
            $scope.active = {state:-1,hover:-1,name:["支付宝全平台收入"]};
            $scope.testdata = [{title:"2014-10-10平台收支",value:10000},{title:"2014-1-13总收入",value:399999}];
            
            $scope.select = {flip:[{id:0,name:"电子指标"},{id:1,name:"翻牌数字"}],
                             unit:[{id:0,sym:"￥"},{id:1,sym:"$"}],
                             unit_text:"",
                             fre:[1,3,5,8,10,20,30,60],
                             colors:["red","yellow","black","green"],
                             figures:[{id:0,name:"快捷指标模块"},
                                       {id:1,name:"快捷指标列表"},
                                       {id:2,name:"快捷指标趋势"}],
                            choosed:{flip:0,color:2,preunit:null,fre:2,unit:null}};//选择的都是序号
            
            $scope.arrow = {default:110,step:150};
            $scope.linkdata = [{title:"hello world",link:"http://www.hao123.com"},{title:"hello world",link:"http://www.hao123.com"}];
            $scope.extLink = {id:"",link:""};
            $scope.config={data:{main:null,sub:[]},figure:{}};//数据指标和图形指标
            $scope.coms = [{index:0,name:"翻牌器",img:"../src/img/flip.png",
                            subs:[{id:0,img:"../src/img/flip_lg_1.png"},{id:1,img:"../src/img/flip_lg_2.png"}]},
                           {index:1,name:"饼状图",img:"../src/img/piechart.png",subs:[{id:0,img:"../src/img/piechart.png"},{id:1,img:"../src/img/circle.png"}]},
                           {index:2,name:"趋势图",img:"../src/img/linechart.png"},
                           {index:3,name:"快捷指标",img:"../src/img/quota.png",subs:[{id:0,img:"../src/img/quota.png"}]},
                          {index:4,name:"文字连接",img:"../src/img/link.png",subs:[{id:0,img:"../src/img/link.png"}]},
                           {index:5,name:"标签",img:"../src/img/tag.png"},
                           {index:6,name:"嵌入外部模块",img:"../src/img/ext.png",subs:[{id:0,img:"../src/img/ext.png"}]}];
            $scope.ok = function (state) {
                switch(state){
                    case 0://翻牌器
                        var param = $scope.config;
                        break;
                    case 1://饼状图
                        
                        break;
                    case 3://快捷指标
                        
                        break;
                    case 4://
                        if(!$scope.active.name[state] || $scope.active.name[state]=="") {
                             $("input#stateName").focus(); 
                            return;
                        }
                    case 6://外部链接
                        if(!URLRE.test(($scope.extLink.link).trim())){//如果输入的 地址不合法
                            $("#extLink").focus();
                            return;
                        }
                        break;
                }
                $modalInstance.close(param);
              };

              $scope.cancel = function (state) {
                $modalInstance.dismiss('cancel');
              };
        
              $scope.back = function () {//上一步
                $scope.active.state = -1;  
                //$scope.cancel();
              };         
    }]);
});