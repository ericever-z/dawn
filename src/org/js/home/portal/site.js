jQuery(function($) {
	var style = $('#style').val();
    $('#css').attr("href", "/css/" + style +".css");
    
	var leafOpenType = $('#leafOpenType').val();
	if(leafOpenType == 2){
		var leafConfigUrl = $('#leafConfigUrl').val();
		window.open(leafConfigUrl);
	}
	
	var removeCode = $('#leafRemoveCode').val();
	removeHead(removeCode);
	
	adaptiveMenu();
	
	$(window).resize(function() {
	  adaptiveMenu();
	});
	
	function adaptiveMenu(){
		var totalWidth = $('.header').width();
		var logoWidth = $('.logo').width();
		var moreWidth = $('.more').width();
		var infoWidth = $('.info').width();
		//  80
		if(logoWidth < totalWidth){
			var tMenuWidth = parseInt(totalWidth) - parseInt(logoWidth) - parseInt(moreWidth) - parseInt(infoWidth) - 80;
			var menuWidth = $('.menu').width();
			var newWidth = parseInt(tMenuWidth) - parseInt(menuWidth);
		}else{
			var newWidth = 0;
		}
		var _id = $('#siteId').val();
		if(newWidth > 0){
			var num = parseInt(newWidth/152);
			if(num >= 1){
				console.log(num);
				var menuUl = $('.menuNavigation');
				var childrens = $('.moreNavigation').children();
				for(var i = 0; i < num; i++){
					menuUl.append(childrens.get(i));
				}
			}
			
		}else if(newWidth < 0){
			var num = parseInt(newWidth/152) -1;
			var moreUl = $('.moreNavigation');
			var childrens = $('.menuNavigation').children();
			for(var i = 0; i < num; i++){
				moreUl.append(childrens.get(i));
			}
		}
	}
		
	$('#J_SiteConfig').delegate('.e-loadChildMenu','click',function(e){
		var _this=$(this);
		var menuId=_this.attr("data-id"); 
		var pageUrl=_this.attr("page-url");
		//侧栏先全部隐藏，然后显示该节点对应的子节点
		$('.side').hide();
		if($('#twolevel_'+menuId).length > 0){
			$('#twolevel_'+menuId).show();
		}else{
//			$('.main').css("left","22px");
		}
		var openType = _this.attr("open-type");
		if(openType == 2){
			//新窗口打开
			window.open(pageUrl);
		}else{
			//更新iframe的src
    		$('#J_IframeSrc').attr("src",pageUrl);
    		$('#J_SiteConfig ul li.menu').removeClass('on');
    		_this.parent().addClass('on');
		}
		//先初始化再去掉头部
		resetMain();
		var onerc = _this.attr("remove-code");
		removeHead(onerc); 
    	
    });

	//菜单栏收缩
	$('ul li a.menu_head').click(function(){
		var menu_head = $(this);
		menu_head.siblings('ul.menu_body').slideToggle('fast');//触发自身
		//其余收起
		menu_head.parent('li.menu').siblings('li.menu').children('ul.menu_body').slideUp('fast');
		
	})
	
	//二级菜单点击
	$('ul li a.menu_head').click(function(){
		var that = $(this);
		var openType = that.attr("open-type");
		if(openType == 2){
			//新窗口打开
			window.open(that.attr('page-url'));
		}else{
			//更新iframe的src
    		$('#J_IframeSrc').attr('src',that.attr('page-url'));
			//更新class 类
			var parent = that.parent('li.menu');
			$('.side ul li.menu').removeClass('on');
			parent.addClass('on');
		}
		//先初始化再去掉头部
		resetMain();
		var tworc = that.attr("remove-code");
		removeHead(tworc);
	})
	//三级菜单点击
	$('ul li a.lastMenu').click(function(){
		var that = $(this);
		var openType = that.attr("open-type");
		if(openType == 2){
			//新窗口打开
			window.open(that.attr('page-url'));
		}else{
			//更新iframe的src
    		$('#J_IframeSrc').attr('src',that.attr('page-url'));
			//更新class 类
			var parent = that.parent('li.menu');
			$('.side ul li.menu').removeClass('on');
			parent.addClass('on');
		}
		//先初始化再去掉头部
		resetMain();
		var threerc = that.attr("remove-code");
		removeHead(threerc);
	});
	
	function removeHead(removeCode){
		console.log(removeCode);
		if(removeCode.length == 0){
			return;
		}
		//执行去头去尾js
		$('#J_IframeSrc').css('margin-top',removeCode);
		var downSize = removeCode.substring(1,removeCode.length -2);
		var mainHeight = $('#mainSite').height();
		var newHight = parseInt(mainHeight) + parseInt(downSize);
		$('#J_IframeSrc').css('height',newHight+'px');
	};
	
	function resetMain(){
		$('#J_IframeSrc').css('margin-top','0px');
		$('#mainSite').css('height','100%');
	}
});
