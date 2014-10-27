(function ($) {
	$(function () {
    	var menuKey = 'dtdawn-menu-mask';
		console.log(localDataStore.get(menuKey));
		if(localDataStore.get(menuKey) == null){
			$(function () {
	        	$('#J_MenuMask').show();
	        });
	        localDataStore.set(menuKey,'hasExist');
	    }
		$('#inMenuPage').bind("click",function(){
			$('#J_MenuMask').hide();
		});
    });
    var dailogHeight = $('.mod-public-attr-menu').height();
    console.log(dailogHeight);
    var maskHeight = parseInt(dailogHeight) + 0.5;
    $('#J_MenuMask').css('height',maskHeight+'px');
    
	$(".content input").blur(function(e){
  		var _this=$(this);
  		var value = _this.val();
  		if ($.trim(value) == "") {
			alert("名称必须填写！");
		}
  		if ($.trim(value).length > 8) {
			alert("名称必须小于等于8个字符！");
		}
  		var parentspan = _this.parent();
  		var prevspan = parentspan.prev();
  		prevspan.find('span').html(value);
	});
	
	$('.menuName').dblclick(function(e){
		var _this=$(this);
		$('.menuName').show();
    	$('.menuNameEdit').hide();
        _this.hide(); 
        _this.next().show();
	})
	
	$('#J_MenuList').delegate('.fn a','click',function(e){
		var _this=$(this);
		var  menuId=_this.attr('data-id');
        var parentId=_this.attr('parent-id');
        var pageId=_this.attr('page-id');
        var mli = _this.closest('.lev-li');
		//编辑
        if(_this.hasClass('edit')){
        	//取出该点击节点的父亲，将其下一个节点 hide,再下一个show
        	$('.menuName').show();
        	$('.menuNameEdit').hide();
        	var parentspan = _this.parent();
            parentspan.next().hide();
            parentspan.next().next().show();
        	
        }
        //添加同级（下方添加菜单）
        if(_this.hasClass('addBrother')){
        	//取出该点击节点所属的li节点，判断其父亲ul节点下li数目，若小于8则添加
        	if(_this.hasClass('dis')){
        		return;
        	}
        	var mul = mli.parent();
        	var strTemp = '';
    		strTemp = strTemp + '<li class="lev-li">';
    		strTemp = strTemp + '<span class="content">';
        	strTemp = strTemp + '<span class="fn">'; 
        	strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon edit" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon addBrother" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon addChild" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon up" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon down" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon left" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon right" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon delete" data-id= "" parent-id="'+parentId+'"></a>';
            strTemp = strTemp + '</span>';
            strTemp = strTemp + '<span style="display: none;" class="title" >';
            strTemp = strTemp + '<span class="text">测试</span>';
            strTemp = strTemp + '</span>';
            strTemp = strTemp + '<span>';   
            strTemp = strTemp + '<input placeholder="菜单名" data-id="0"  name="menu_title" class="menu-title"  parent-id="'+parentId+'" type="text" value="">';
            strTemp = strTemp + '</span>';
            strTemp = strTemp + '</span>';
            strTemp = strTemp + '</li>';
            var newli = $(strTemp);
            newli.insertAfter(mli);
        	//判断控件状态，如果》=8则灰掉
        	changeStatus();
        }
        //添加子级
        if(_this.hasClass('addChild')){
        	if(_this.hasClass('dis')){
        		return;
        	}
        	//取出该节点所在的li,判断该li是否有子节点ul，若有，判断该ul下的子节点是否小于8，若小于新增li到该子节点ul下，
        	//若该li不含有子节点，则新增ul到该子节点下
        	addChildLi(mli,menuId);
        	changeStatus();
        }
        
        //上移
        if(_this.hasClass('up')){
        	if(_this.hasClass('dis')){
        		return;
        	}
        	//判断该li节点是否有上一个节点，若有，移动到上一个节点，
        	//若没有，找出该li的父节点ul，再找到该ul的父节点li ，
        	if(mli.prev().length > 0){
        		var preli = mli.prev();
        		mli.insertBefore(preli);
        	}else{
        		var upul = mli.parent();
        		var upli = upul.parent();
        		var upPrevLi = upli.prev();
        		if(upPrevLi.length <= 0){
        			alert("您需要移动的菜单的父亲没有上一个菜单，不能上移，请先移动该菜单父亲再上移");
        			return;
        		}
        		//如果上一个菜单下没子级，先增加一个ul节点
        		if(!(upPrevLi.has('ul').length > 0)){
        			var strTemp = '';
					strTemp = strTemp + '<ul>';
					strTemp = strTemp + '</ul>';
					upPrevLi.append(strTemp);
        		}
        		$(upPrevLi.children().get(1)).append(mli);
        	}
        	//判断状态
        	changeStatus();        	
        }
        //下移
        if(_this.hasClass('down')){
        	if(_this.hasClass('dis')){
        		return;
        	}
        	if(mli.next().length > 0){
        		var nextli = mli.next();
        		mli.insertAfter(nextli);
        	}else{
        		var downul = mli.parent();
        		var downli = downul.parent();
        		var nextdownli = downli.next();
        		if(nextdownli.length <= 0){
        			alert("您需要下移的菜单的父亲没有下一个菜单，不能下移，请先移动该菜单父亲再下移");
        			return;
        		}
        		//如果下一个菜单下没子级，先增加一个ul节点
        		if(!(nextdownli.has('ul').length > 0)){
        			var strTemp = '';
					strTemp = strTemp + '<ul>';
					strTemp = strTemp + '</ul>';
					nextdownli.append(strTemp);
        		}
        		var nextdownul = $(nextdownli.children().get(1));
        		mli.insertBefore(nextdownul.children().get(0));
        		//nextdownul.append(mli);//插到下一个节点的第一个
        	}
        	//判断状态
        	changeStatus();
        }
        //升级
        if(_this.hasClass('left')){
        	if(_this.hasClass('dis')){
        		return;
        	}
        	var parentUl = mli.parent();
        	var parentLi = parentUl.parent();
    		mli.insertAfter(parentLi);
    		//判断状态
    		changeStatus();
        }
        //降级
        if(_this.hasClass('right')){
        	if(_this.hasClass('dis')){
        		return;
        	}
        	if(mli.prev().length <= 0){
        		alert("该节点没有前一个菜单，不能降级");
        		return;
        	}
        	var prevLi = mli.prev();
        	//如果上一个菜单下没子级，先增加一个ul节点
    		if(!(prevLi.has('ul').length > 0)){
    			var strTemp = '';
				strTemp = strTemp + '<ul>';
				strTemp = strTemp + '</ul>';
				prevLi.append(strTemp);
    		}
        	$(prevLi.children().get(1)).append(mli);
        	//判断状态
        	changeStatus();
        }
        
        //删除
        if(_this.hasClass('delete')){
        	if(pageId > 0){
        		alert("该菜单有关联页面，不能删除");
        		return;
        	}
        	if(mli.find('li').length > 0){
        		alert("该菜单有子菜单不能删除");
        		return;
        	}
        	mli.remove();
        }
        
	});
	
	function addChildLi(mli,menuId){
    	var strTemp = '';
    	if(!(mli.has('ul').length > 0)){
    		strTemp = strTemp + '<ul>';
    		
    	}
    	strTemp = strTemp + '<li class="lev-li">';
		strTemp = strTemp + '<span class="content">';
    	strTemp = strTemp + '<span class="fn">'; 
    	strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon edit" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon addBrother" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon addChild" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon up" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon down" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon left" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon right" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '<a href="javascript:void(0)" class="e_icon delete" data-id= "" parent-id="'+menuId+'"></a>';
        strTemp = strTemp + '</span>';
        strTemp = strTemp + '<span style="display: none;" class="title" >';
        strTemp = strTemp + '<span class="text">测试</span>';
        strTemp = strTemp + '</span>';
        strTemp = strTemp + '<span>';   
        strTemp = strTemp + '<input placeholder="菜单名" data-id="0"  name="menu_title" class="menu-title"  parent-id="'+menuId+'" type="text" value="">';
        strTemp = strTemp + '</span>';
        strTemp = strTemp + '</span>';
        strTemp = strTemp + '</li>';
        if(mli.has('ul').length > 0){
			var newChildLi = $(strTemp);
			var childul = $(mli.children().get(1));
			var length = childul.children().length;
			if(length > 0){
				var childLi = childul.children().get(length - 1);
				newChildLi.insertAfter(childLi);
			}else{
				childul.append(newChildLi);
			}
					
    	}else{
    		strTemp = strTemp + '</ul>';
    		var newChildLi = $(strTemp);
    		mli.append(newChildLi);
    	}
        	
    };
   
    //点击页面操作后，先全亮，再置灰
    function changeStatus(){
    	$('li .up').attr("class","e_icon up");
    	$('li .down').attr("class","e_icon down");
    	$('li .left').attr("class","e_icon left");
    	$('li .right').attr("class","e_icon right");
    	$('li .addChild').attr("class","e_icon addChild");
    	var liList = $('.lev-li');
    	if(liList.length > 0){
    		for(var i=0;i<liList.length;i++){
    			var oli = $(liList.get(i));
    			var ull = oli.parents('ul').length;
    			if(ull == 1){
    				$(oli.children().get(0)).find('.left').attr("class","e_icon left dis");
    			}else if(ull == 3){
    				oli.find('.right').attr("class","e_icon right dis");
    				oli.find('.addChild').attr("class","e_icon addChild dis");
    			}
    		}
    		var oneLi = $(liList.get(0));
    		$(oneLi.children().get(0)).find('.up').attr("class","e_icon up dis");
        	if(oneLi.has('ul').length > 0){
        		var subUl = $(oneLi.children().get(1));
        		var subLi = $(subUl.children().get(0));
        		$(subLi.children().get(0)).find('.up').attr("class","e_icon up dis");
        		if(subLi.has('ul').length > 0){
        			var threeUl = $(subLi.children().get(1));
        			var threeLi = $(threeUl.children().get(0));
        			$(threeLi.children().get(0)).find('.up').attr("class","e_icon up dis");
        		}
        	}
        	var lastLi = $(liList.get(liList.length - 1));
        	$(lastLi.children().get(0)).find('.down').attr("class","e_icon down dis");
            if(lastLi.has('ul').length > 0){
                var subLastUl = $(lastLi.children().get(1));
                var subNum = subLastUl.children().length;
                var subLastLi = $(subLastUl.children().get(subNum - 1));
                $(subLastLi.children().get(0)).find('.down').attr("class","e_icon down dis");
                if(subLastLi.has('ul').length > 0){
                    var threeLastUl = $(subLastLi.children().get(1));
                    var threeNum = threeLastUl.children().length;
                    var threeLastLi = $(threeLastUl.children().get(threeNum -1));
                    $(threeLastLi.children().get(0)).find('.down').attr("class","e_icon down dis");
                }
            }
    	}
    	
    }
        
})(jQuery);