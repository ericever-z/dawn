/**
* 浮动条
* @author : yu.yuy
* @createTime : 2011-07-10
*/
(function($,doc,win){
var documentWidth = 960,
containers = $('.fd-float-module'),
num = containers.length,
defaultConfig = {
location : 'left',
top : 220,
isAlwaysShow : false
},
isIE6 = $.util.ua.ie6,
throttle = function(method,context){
clearTimeout(method.tId);
method.tId = setTimeout(function(){
method.call(context);
},100);
},
//自定义配置信息初始化，将单引号转化为双引号
parseConfig = function(s){
var ret = {},
temp;
if(s){
temp = s.replace(/'/g,'\"');
ret = $.parseJSON(temp);
}
return ret;
},
LocationObject = function(){
var _a = [];
return {
setOpsition : function(el,position,width,getValue,isAlwaysShow,docWidth){
var boundaryPoints = documentWidth+2*width,
value = getValue.call(null,width,docWidth);
if(isAlwaysShow || docWidth>boundaryPoints){
el.css(position, value);
}
else{
el.css(position, -width);
}
},
append : function(){
var o = [];
o = Array.prototype.slice.call(arguments);
_a.push(o);
},
run : function(){
var docWidth = $('body').width(),
a;
for(var i=0,l=_a.length;i<l;i++){
a = _a[i].concat();
a.push(docWidth);
LocationObject.setOpsition.apply(LocationObject,a);
a = null;
}
}
}
}(),
ScrollObject = function(){
var _a = [];
return {
append : function(el,defaultTop){
var o = {};
o['el'] = el;
o['defaultTop'] = defaultTop;
_a.push(o);
},
run : function(){
var scrollTop = $(doc).scrollTop(),
o;
for(var i=0,l=_a.length;i<l;i++){
o = _a[i];
o['el'].css('top', scrollTop+o['defaultTop']);
}
}
}
}(),
init = function(){
var current,
config,
location,
top,
isAlwaysShow,
getValueFun = function(){},
position,
docWidth = $('body').width(),
width;
if(num === 0){
return;
}
while(num--){
current = $(containers[num]);
current.css('display','block');
config = parseConfig(current.attr('data-config'));
location = config['location'] || defaultConfig['location'],
top = config['top'] || defaultConfig['top'];
isAlwaysShow = config['isAlwaysShow'] || defaultConfig['isAlwaysShow'];
width = current.width();
switch(location){
case 'leftmost' : {
getValueFun = function(){
return 0;
};
position = 'left';
break;
}
case 'left' : {
getValueFun = function(w,docW){
return Math.max((docW - documentWidth)/2 - w,0);
};
position = 'left';
break;
}
case 'right' : {
getValueFun = function(w,docW){
return Math.max((docW - documentWidth)/2 - w,0);
};
position = 'right';
break;
}
case 'rightmost' : {
getValueFun = function(){
return 0;
};
position = 'right';
break;
}
default :
break;
}
LocationObject.setOpsition(current,position,width,getValueFun,isAlwaysShow,docWidth);
LocationObject.append(current,position,width,getValueFun,isAlwaysShow);
current.css('top',top);
if(isIE6){
ScrollObject.append(current, parseInt(top));
}
}
$(win).resize(function(){
throttle(LocationObject.run);
});
if(isIE6){
$(win).scroll(function(){
throttle(ScrollObject.run);
});
}
}();
})(jQuery, document, window);
