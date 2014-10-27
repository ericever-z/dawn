define(['./module'],function(module){
module.directive("cellBar",function(){//可以resize的方格块
    return {
            restrict:"A",
            link:function(scope,element,attrs){
                element.on("click",function(e){
                    if(e.originalEvent.target.className.indexOf("bar_gear")!=-1){
                        var axiX = (e.originalEvent.target).getBoundingClientRect().left - 380;
                        var axiY = e.pageY -60;
                        $("#cellPoper").css({"left":axiX + "px","top":axiY+"px"});
                    }
                });
            }
        };
    }).directive("trackerList",function(){//可以resize的方格块
      function isView(len,index){//true可见，false不可见
        return (index<(len+5) && index>(len-1));
      };
    return {
            restrict:"A",
            link:function(scope,element,attrs){
                element.on("click",function(e){
                    var lf = parseFloat($("ul.tracks li").css("left")) || 0;
                    if(e.originalEvent.target.className.indexOf("moreLeft")!=-1){
                        //左边的箭头  ul.tracks li  -160
                        if(lf<0){
                            $(e.target).unbind("click");
                            var nlf = lf + 160;
                            $("ul.tracks li").css({"left":nlf+"px"});    
                            setTimeout(function(){
                                $(e.target).bind("click"); 
                                $("span.showcase").css({visibility:"visible"});
                                if(isView(Math.abs(nlf)/160,scope.active.hover)==true){//当前视窗内可见
                                    $("span#arrow").css({"left":scope.arrow.default+(scope.arrow.step)*(scope.active.hover)+nlf+"px"});                                
                                }else{
                                    $("span.showcase").css({visibility:"hidden"});
                                }                                
                            },500);                      
                        }
                    }else if(e.originalEvent.target.className.indexOf("moreRight")!=-1){
                        //右边的箭头   +160  
                        var len = Math.floor(Math.abs(lf)/160) + 5;
                        if(len <scope.coms.length){
                            $(e.target).unbind("click");
                            var nlf = lf - 160;
                            $("ul.tracks li").css({"left":nlf+"px"});
                            setTimeout(function(){
                                $(e.target).bind("click"); 
                                $("span.showcase").css({visibility:"visible"});
                                if(isView(Math.abs(nlf)/160,scope.active.hover)==true){//当前视窗内可见
                                    $("span#arrow").css({"left":scope.arrow.default+(scope.arrow.step)*(scope.active.hover)+nlf+"px"});                                
                                }else{
                                    $("span.showcase").css({visibility:"hidden"});
                                }                                 
                            },400);
                        }
                    }                   
                });
                 scope.showPreview = function(e,o){//mouse enter
                     var index = o.index;
                     $("span.showcase").css({visibility:"visible"});
                     scope.active.hover = index;
                     $("span.com_title").css({bottom:"-25px"});
                     var lf = parseFloat($("ul.tracks li").css("left")) || 0;
                     $($("span.com_title")[index]).css({bottom:0});
                     $("span#arrow").css({"left":scope.arrow.default+(scope.arrow.step)*(index)+ lf+"px"});      
                 };
                scope.$watch("active.state",function(){
                    if(scope.active.state!=-1){
                    
                    }else{
                        
                    }
                });                
            }
        };
    }).directive("selectItem",function(){
            return {
                restrict:"A",
                link:function(scope,element,attrs){
                    element.on("click",function(){
                        scope.active.state = scope.item.index;
                    });
                }
            };
    }).directive("flipState",function(){
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                scope.changeState = function(indx){
                    scope.tab.active = indx;
                };
            },
            controller:"flipCtrl"
        }
    }).controller("flipCtrl",['$scope',function($scope){
        $scope.tab={active:0,iframe:0};
        $scope.cofData = [{name:"数据指标"},{name:"图形指标"}];//给tab 可视化时用的
    }]).directive("configPanel",function(){//配置面板的数据保存 和 更新 全在这里处理
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                element.on("click",function(e){
                    e.stopPropagation();
                    if(e.target == $("#main_figure").get(0)){
                        scope.$apply(function(){
                            scope.tab.iframe = 1;//显示iframe 1表示主指标，2表示小指标0，不显示
                        });
                        $("#km").attr("src","http://www.baidu.com");//显示iframe里卖弄的内容
                    }else if(e.target == $("#sub_figure").get(0)){
                        scope.$apply(function(){
                            scope.tab.iframe = 2;//显示iframe 1表示主指标，2表示小指标0，不显示
                        });
                        $("#km").attr("src","http://www.baidu.com");//显示iframe里卖弄的内容
                    }
                });
                scope.editMain = function(){
                    scope.tab.iframe = 1;//显示iframe 1表示主指标，2表示小指标0，不显示
                    $("#km").attr("src","http://www.baidu.com");//显示iframe里卖弄的内容
                };
                scope.removeMain = function(){
                    scope.config.data.sub = [];
                    scope.config.data.main = null;
                };
                scope.editSub = function(f){
                    scope.tab.iframe = 2;//显示iframe 1表示主指标，2表示小指标0，不显示
                    $("#km").attr("src","http://www.baidu.com");//显示iframe里卖弄的内容
                };
                scope.removeSub = function(f){
                    var i = scope.config.data.sub.indexOf(f);
                    scope.config.data.sub.splice(i,1);
                }; 
            }
        }        
    }).directive("iframePanel",function(){
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                scope.ifClose = function(){
                    scope.tab.iframe = 0;//关闭iframe的窗口           
                };
                scope.confirm = function(){
                    if(scope.tab.iframe == 1){
                        scope.config.data.main = {name:"主指标1"};
                    }else if(scope.tab.iframe == 2){
                        scope.config.data.sub.push({name:"子指标1"});
                    }
                    scope.ifClose();//关闭窗口
                };
                element.on("click",function(e){
                    e.stopPropagation();
                });
            }
        }        
    });
});