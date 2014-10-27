(function ($) {
    $(function () {
    	testBrowser();// 检测浏览器
    	var keyName = 'dtdawn-site-mask';
		console.log(localDataStore.get(keyName));
		if(localDataStore.get(keyName) == null){
			$(function () {
	        	$('#J_VersionOverlayer').show();
	        });
	        localDataStore.set(keyName,'hasExist');
	    }
        $('#maskNext').bind("click",function(){
			$('#oneMask').hide();
			$('#twoMask').show();
		});
		$('#closeMask').bind("click",function(){
			$('#J_VersionOverlayer').hide();
		});
    });
    var style = $('#style').val();
    $('#css').attr("href", "/css/" + style +".css");
	
	$(window).resize(function() {
	  adaptiveMenu();
	});
	adaptiveMenu();
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
	
    //菜单栏收缩
	$('ul li a.menu_head').click(function(){
		var menu_head = $(this);
		menu_head.siblings('ul.menu_body').slideToggle('fast');//触发自身
		//其余收起
		menu_head.parent('li.menu').siblings('li.menu').children('ul.menu_body').slideUp('fast');
		
	})
    
    // 点击菜单事件，点击一级菜单，显示该一级下的二级菜单栏，设置menu_id到主栏编辑url区域，异步请求该菜单关联url，如果有显示，如果无显示新增框
    $('#J_SiteConfig').delegate('.e-loadChildMenu','click',function(e){
    	checkUrlBoxChange();
		
    	var _this=$(this);
		var menuId=_this.attr("data-id"); 
		var pageId=_this.attr("page-id");
		var pageUrl=_this.attr("page-url");
		var pathName = _this.attr("path-name");
		// 侧栏先全部隐藏，然后显示该节点对应的子节点
		$('.side').hide();
		if($('#twolevel_'+menuId).length > 0){
			$('#twolevel_'+menuId).show();
		}else{
 //			$('.main').css("left","22px");
		}
		// 更新编辑区数据
    	$('#pageUrl').attr("page-id",pageId);
    	$('#pageUrl').attr("menu-id",menuId);
    	$('#menuPath').html(pathName);
    	// span的内容
    	if(pageUrl == ""){
    		$('#pageUrl').attr('placeholder','请输入URL链接嵌入到小站中（第三方数据产品页面链接，必须去头去尾）');
    	}
    	$('#pageUrl').attr('value',pageUrl);
		$('#sourceUrl').attr('value',pageUrl);
		$('#J_SiteConfig ul li').removeClass('on');
    	_this.parent().addClass('on');
    	var openType = _this.attr("open-type");
		if(openType == 1){
			$('#open-target').attr('checked',false);
		}else{
			$('#open-target').attr('checked',true);
		}
    });
    // 点击侧栏菜单
    $('.menu_head').click(function(e){
    	//检查url输入框是否有改变，是否需要保存
    	checkUrlBoxChange(false);

    	// 去掉二级菜单下的所有li的class= "on"，再将点击li设置样式class="on"
    	$('.side li').removeClass("on");
    	var _this=$(this);
    	var menuId=_this.attr("data-id"); 
		var pageId=_this.attr("page-id");
		var pageUrl=_this.attr("page-url");
		var pathName = _this.attr("path-name");
    	
    	_this.parent().addClass("on");
    	// 更新编辑区数据
    	$('#pageUrl').attr("page-id",pageId);
    	$('#pageUrl').attr("menu-id",menuId);
    	$('#menuPath').html(pathName);
    	// span的内容
    	if(pageUrl == ""){
    		$('#pageUrl').attr('placeholder','请输入URL链接嵌入到小站中（第三方数据产品页面链接，必须去头去尾）');
    	}
    	$('#pageUrl').attr('value',pageUrl);
    	$('#sourceUrl').attr('value',pageUrl);
    	
		var openType = _this.attr("open-type");
		if(openType == 1){
			$('#open-target').attr('checked',false);
		}else{
			$('#open-target').attr('checked',true);
		}
		
    });
    // 点击三级菜单 lastMenu
    $('.lastMenu').click(function(e){
    	//检查url输入框是否有改变，是否需要保存
    	checkUrlBoxChange(false);

    	var _this=$(this);
    	var menuId=_this.attr("data-id"); 
		var pageId=_this.attr("page-id");
		var pageUrl=_this.attr("page-url");
		var pathName = _this.attr("path-name");
    	$('.side li').removeClass("on");
    	_this.parent().addClass("on");
    	// 更新编辑区数据
    	$('#pageUrl').attr("page-id",pageId);
    	$('#pageUrl').attr("menu-id",menuId);
    	$('#menuPath').html(pathName);
    	// span的内容
    	if(pageUrl == ""){
    		$('#pageUrl').attr('placeholder','请输入URL链接嵌入到小站中（第三方数据产品页面链接，必须去头去尾）');
    	}
    	$('#pageUrl').attr('value',pageUrl);
    	$('#sourceUrl').attr('value',pageUrl);
    	
    	var openType = _this.attr("open-type");
		if(openType == 1){
			$('#open-target').attr('checked',false);
		}else{
			$('#open-target').attr('checked',true);
		}	
    });
    
    // 点击编辑url地址按钮
    $('#urlLocation').click(function(e){
    	$('#pageInfo').hide();
    	$('#urlLocation').hide();
    	$('#editUrl').show();
    });
    // 修改页面按钮
    $('#updateUrl').click(function(){
    	updatePageUrl(true);
    });
    
    // 删除页面按钮
    $('#deleteUrl').click(function(e){
    	var pageId = urlInput.attr("page-id");
    	var menuId = urlInput.attr("menu-id");
    	var sourceUrl = urlInput.attr('placeholder');
    	if(confirm("确定要删除吗？")){
	    	$.post('/pub/ajaxResultPage.htm?action=/PageAction&event_submit_doDeletePage=y&menuId='+menuId+'&pageId='+pageId,function(data){
	    		if(data == "success"){
	    			alert("删除成功");
	    			changeMenuPageUrl(menuId,"");
	    			$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('page-id','');
	    			$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('open-type',1);
	    			
	    		}else{
	    			alert(data);
	    		}
	    	});
	    }
    });
    // 设置样式列表
	$('#setStyle').click(function(e){
		var o = document.getElementsByTagName('html')[0];
		o.className == "" ? o.className = "s_setStyle":o.className = "";
	});
	// 设置样式
	$('#styles').delegate('li a','click',function(e){
		var _this=$(this);
		var color = _this.attr("style-code");
		$('#css').attr("href", "/css/" + color +".css");
		$('#styles li').removeClass();
		_this.parent().addClass();
		//保存code到数据库
		var siteId = $('#siteId').val();
		$.post('/pub/ajaxResultPage.htm?action=/SiteAction&event_submit_doSetStyle=y&siteId='+siteId+'&style='+color,function(data){
    		
    	});
	});
	// 设置样式关闭
	$('#cancleSetStyle').click(function(e){
		var o = document.getElementsByTagName('html')[0].className = '';
	});
	
				   
    function testBrowser (){
    	if ($.browser.msie) {
    		var dialogId = 'extendDialog-' + (new Date()).getTime();
    		var template = '<span style="width:450px" class="e-dialog e-dialog-small" id="' + dialogId + '">' +
            '<header>' +
            '<h2 class="title">提示</h2>' +
            '</header>' +
            '<span class="content" style="padding:30px 15px;line-height:21px;text-align:center">亲，为了更好的体验，请使用chrome,firefox等高级浏览器' +
            '</span>' +
            '<footer>' +
            '<span class="e-btn w80 mr10 e-btn-primary ok">确 定</span>' +
            '</footer>' +
        '</span>';
	    	$.use('ui-dialog', function () {
	            $('body').append(template);
	            var el = $('#' + dialogId);
	            el.dialog({
	                modalCSS: {
	                    background: '#000',
	                    opacity: 0.5
	                },
	                center: true
	            }).delegate('.close', 'click', function () {
	                el.dialog('close');
	                el.remove();
	            }).delegate('.ok', 'click', function () {
	                window.location.href = 'http://dw.taobao.ali.com/index.htm';
	            });
	        });
    	}
    };
    
	//更新地址栏
	function updatePageUrl(showAlert){
    	var pageId = urlInput.attr("page-id");
    	var menuId = urlInput.attr("menu-id");
    	var sourceUrl = urlInput.val();
    	sourceUrl = sourceUrl;
    	var openType = 1;
    	if("checked" == $('#open-target').attr("checked")){
    		
    		openType = 2;
    	}
    	$.ajax({
    		type: 'POST',
		  	url: '/pub/ajaxResultPage.htm?action=/PageAction&event_submit_doSavePage=y&menuId='+menuId+'&pageId='+pageId+'&openType='+openType,
		  	data: {sourceUrl:sourceUrl},
		  	async: false, 
		  	success: function(data){
    		var json = $.parseJSON(data);
	    		if (json['statusCode'] == -1) {
					alert(json['msg']);
				}
				else if (json['statusCode'] == 1) {
					alert(json['msg']);
					changeMenuPageUrl(menuId,sourceUrl);
					pageId = (json['pageId']);
					$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('page-id',pageId);
					urlInput.attr('page-id',pageId);
					$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('open-type',openType);
				}
			}
		});
    	
	}
	
	//是否新窗口打开checkbox点击事件
	$('#open-target').click(function(e){
		var pageId = urlInput.attr("page-id");
    	var menuId = urlInput.attr("menu-id");
    	var sourceUrl = urlInput.val();
    	sourceUrl = sourceUrl;
    	var openType = 1;
    	if("checked" == $('#open-target').attr("checked")){
    		
    		openType = 2;
    	}
    	$.ajax({
    		type: 'POST',
		  	url: '/pub/ajaxResultPage.htm?action=/PageAction&event_submit_doSavePage=y&menuId='+menuId+'&pageId='+pageId+'&openType='+openType,
		  	data: {sourceUrl:sourceUrl},
		  	async: false, 
		  	success: function(data){
    		var json = $.parseJSON(data);
	    		if (json['statusCode'] == -1) {
					alert(json['msg']);
				}
				else if (json['statusCode'] == 1) {
					changeMenuPageUrl(menuId,sourceUrl);
					pageId = (json['pageId']);
					$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('page-id',pageId);
					urlInput.attr('page-id',pageId);
					$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr('open-type',openType);
				}
			}
		});
	});
	
	var isLegalUrl = function(url) {
		var legalPatten = /(https?):\/\/([^\.\/]+)([\.]?)([^\.\/]+)([\.]?)([^\.\/]+)(\/[\w-\.\/\?\%\&\=]*)?/i;
		isLegalUrl = function(url){
			return legalPatten.test(url);
		}
		return isLegalUrl(url);
	}
	
	function checkUrlBoxChange(showAlert) {
		//检查上一个页面是否需要保存
		var sourceUrl = $('#sourceUrl').val();
		var newUrl = urlInput.val();
		var menuId = urlInput.attr('menu-id');
		if(newUrl != "" && newUrl != sourceUrl){
			if(isLegalUrl(newUrl)){
				updatePageUrl(showAlert);
			}
			else{
				alert("不合法url");
			}
		}
		//恢复状态
		unlock.click();
	}
	
	function changeMenuPageUrl(menuId,url){
		$('#J_SiteConfig li a[data-id="'+menuId+'"]').attr("page-url",url);
		$('#sourceUrl').attr('value',url);
		urlInput.attr('value',url);
		//urlInput.val("");
	}
	
	//将页面恢复到原始状态
	function resetUrlPage(){
		
	}
	var urlInput = $('input#pageUrl');
	var lock = $('a#lock_input');
	var unlock = $('a#unlock_input');
	var save = $('a#save_url');
	var readonly = $('#readonly');
	var mainWrapper = $('#main');
	urlInput.bind('input',function(){
		if(save.is(':hidden')){
			show(save);
			unlock.hide();
		}
	})
	
	urlInput.keydown(function(e){
		
		if(e.keyCode==13){
		   save.click();
		   urlInput.blur();
		}
	});
   
	lock.click(function(){
		event.stopPropagation(); 
		
		lock.hide();
		show(unlock);
		
		readonly.hide();
		urlInput.focus();
		//置灰
		//style="color:#999999"
		//var surl = urlInput.attr("placeholder");
		//urlInput.val(surl);
		urlInput.attr("style","");
	})
	
	
	unlock.click(function(){
		event.stopPropagation(); 
		
		unlock.hide();
		save.hide();
		
		show(lock);
		readonly.show();
		//style="color:#999999
		urlInput.attr("style","color:#999999");
	})
	readonly.click(function(){
		event.stopPropagation(); 
	})
	readonly.dblclick(function(){
		lock.click();
		event.stopPropagation(); 
	})
	
	save.click(function(){
		event.stopPropagation();
		
		save.hide();
		show(lock);
		readonly.show();
		
		checkUrlBoxChange(true);
	})
	
	function show(dom){
		dom.css({'display':'block'});
	}
	
	//浏览器 刷新 关闭事件
	/*window.onbeforeunload = function() {
        return "";
    }*/
})(jQuery);