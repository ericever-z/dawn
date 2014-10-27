define(['./module'], function (module) {
    module.factory("DService",['$modal',function ($modal) {
            this.alert = function (title) {
                var args=arguments;
                title = title || "组件面板";
                var modalInstance = $modal.open({
                  template: '<span class="dia_container" ng-if="active.state==-1">\
            <span class="dia_head" >\
                <span class="dia_head_title">'+ title +'</span>\
                <span class="dia_head_close" ng-click="cancel()"></span>\
            </span>\
                <span class="gallery" tracker-list>\
                    <span class="dia_more moreLeft"></span>\
                    <ul class="tracks">\
                        <li ng-repeat="sc in coms" ng-mouseenter="showPreview($event,sc)">\
                            <img ng-src="{{sc.img}}" width="140" height="110">\
                            <span class="com_title">{{sc.name}}</span>\
                        </li>\
                    </ul>\
                    <span class="dia_more moreRight"></span>\
                </span>\
                <span class="showcase" id="showcase">\
                    <span class="cell_arrow showcase_arrow" id="arrow"></span>\
                    <ul class="dia_sub" ng-repeat="item in coms track by $index" ng-if="active.hover==$index">\
                        <li ng-repeat="sub in item.subs" select-item>\
                            <img ng-src="{{sub.img}}" width="220" height="150">\
                            <span class="type_cover">请选择</span>\
                        </li>\
                    </ul>\
                </span>\
            </span>\
            <span class="state_0" flip-state ng-if="active.state==0">\
                <span class="dia_head" >\
                    <span class="dia_head_title">翻牌器配置面板</span>\
                    <span class="dia_head_close" ng-click="cancel()"></span>\
                    <span class="config_box">\
                        <span class="config_panel">\
                            <p class="tip_style">数据设置</p>\
                            <ul class="config_tab">\
                                <li ng-repeat="item in cofData track by $index" ng-class="{tab_hiLight:cofData.indexOf(item)==tab.active}" ng-click="changeState($index)">{{item.name}}</li>\
                            </ul>\
                            <span class="config_tab_state" ng-switch on="tab.active">\
                                    <div ng-switch-when="0" class="config_data_panel" config-panel>\
                                        <button class="btn_add" ng-if="!config.data.main" id="main_figure">+添加主指标</button>\
                                        <div class="main_figure" ng-if="config.data.main">\
                                            <input type="text" ng-model="config.data.main.name" readonly>\
                                            <span class="main_figure_btn" ng-click="editMain()">编辑</span>\
                                            <span class="main_figure_btn" ng-click="removeMain()">删除</span>\
                                        </div>\
                                        <ul ng-if="config.data.sub.length>0" class="sub_figure">\
                                            <li ng-repeat="f in config.data.sub">\
                                                <input type="text" ng-model="f.name" readonly>\
                                                <span class="main_figure_btn" ng-click="editSub(f)">编辑</span>\
                                                <span class="main_figure_btn" ng-click="removeSub(f)">删除</span>\
                                            </li>\
                                        </ul>\
                                        <button ng-if="config.data.main" class="btn_add sub_figure_btn" id="sub_figure">\
                                        +添加小指标\
                                        </button>\
                                    </div>\
                                    <div ng-switch-when="1">111</div>\
                            </span>\
                        </span>\
                        <div class="iframe_cover" ng-if="tab.iframe!=0" iframe-panel>\
                            <div class="iframe_box" >\
                                <div class="dia_head">\
                                    <span class="dia_head_title">设计您的区块-实时翻牌</span>\
                                    <span class="dia_head_close" ng-click="ifClose()"></span>\
                                </div>\
                                <iframe src="javascript:void(0);" width="100%" height="86%" frameborder="0" name="km" id="km"></iframe>\
                                <div class="iframe_foot"><button ng-click="confirm()">确定</button></div>\
                            </div>\
                        </div>\
                        <span class="com_preview">\
                            <p class="tip_style">图形预览</p>\
                            <span class="preview_box">\
                                <div class="preview_inner_box">\
                                    <span flipper="8888888"></span>\
                                </div>\
                                <button class="pre_btn main_figure_btn" ng-click="cancel()">上一步</button>\
                                <button class="pre_btn main_figure_btn" ng-click="ok()">保存</button>\
                            </span>\
                        </span>\
                    </span>\
                </span>\
            </span>', 
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
            $scope.active = {state:-1,hover:-1};
            $scope.arrow = {default:110,step:150};
            $scope.config={data:{main:null,sub:[]},figure:{}};//数据指标和图形指标
            $scope.coms = [{index:0,name:"翻牌器",img:"../src/img/flip.png",
                            subs:[{id:0,img:"../src/img/flip_lg_1.png"},{id:1,img:"../src/img/flip_lg_2.png"}]},
                           {index:1,name:"饼状图",img:"../src/img/piechart.png"},
                           {index:2,name:"趋势图",img:"../src/img/linechart.png"},
                           {index:3,name:"翻牌器",img:"../src/img/quota.png"},
                          {index:4,name:"文字连接",img:"../src/img/link.png"},
                           {index:5,name:"标签",img:"../src/img/tag.png"}];
            $scope.ok = function () {
                var param = $scope.config;
                $modalInstance.close(param);
              };

              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };  
    }]);
});