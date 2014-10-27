jQuery(function($) { 
// J_updateMenu
    // 编辑菜单页面
	$('.updateMenu').click(function(e){
		var _this=$(this);
		var  siteId= _this.attr("data-id");
		$.get('/admin/editMenu.htm?siteId='+siteId, function (data) {
	        $("body").append(data);
	        $.use("ui-dialog", function () {
	            var attrDialog = $(".mod-public-attr-menu");
	            attrDialog.dialog({
	                modalCSS: {
	                    background: "#000",
	                    opacity: 0.4
	                },
	                center: true,
	                shim: true
	            });
	            initEditDialogMenu(siteId);
	        });
		});
	});
	
	function initEditDialogMenu(siteId) {
		//显示帮助蒙版
		$('#menuMask').show();
		
		$(".mod-public-attr-menu .dialog-close-btn").click(function () {
        	$(".mod-public-attr-menu").dialog("close");
        	$(".mod-public-attr-menu").remove();
        });
		// 编辑菜单页面js交互
		$('#J_BtnMenuSave').click(function(){
			// 获取菜单数据(获取名称，排序，父菜单id，菜单id)
			// 首先获取所有一级菜单
			var onelevliList =  $('#onelev_ul_1').children();
			var oneMenuList = new Array();
			var checkName = true;
			for(var i=0;i<onelevliList.length;i++){
				var menu = new Menu();
				var oneLiHtm = onelevliList.get(i);
				var oneLi = $(oneLiHtm);
				var oneInput = oneLi.find("input");
				var testname = oneInput.val();
				if ($.trim(testname) == "") {
					alert("名称必须填写！");
					checkName = false;
					break;
				}
		  		if ($.trim(testname).length > 8) {
					alert("名称必须小于等于8个字符！");
					checkName = false;
					break;
				}
				menu.id = oneInput.attr("data-id");
				menu.name = testname;
				menu.sortIndex = i;
				menu.parentId = 0;
				// 判断是否有二级对象
				if(oneLi.has("ul").length > 0){
					var twolevliList = $(oneLi.children().get(1)).children();
					var twoMenuList = new Array();
					
					for(var j=0;j<twolevliList.length;j++){
						var twoMenu = new Menu();
						var twoLiHtm = twolevliList.get(j);
						var twoLi = $(twoLiHtm);
						var twoInput = twoLi.find("input");
						var twoName = twoInput.val();
						if ($.trim(twoName) == "") {
							alert("名称必须填写！");
							checkName = false;
							break;
						}
				  		if ($.trim(twoName).length > 8) {
							alert("名称必须小于等于8个字符！");
							checkName = false;
							break;
						}
						twoMenu.name = twoName;
						twoMenu.sortIndex = j;
						var twoDataId = twoInput.attr("data-id");
						if(twoDataId != ""){
							twoMenu.id =twoDataId;
						};
						var twoParentId = twoInput.attr("parent-id");
						if(twoParentId != ""){
							twoMenu.parentId =twoParentId;
						};
						 
						// 判断是否有三级
						if(twoLi.has("ul").length > 0){
							var threelevliList = $(twoLi.children().get(1)).children();
							var threeMenuList = new Array();
							for(var m=0;m<threelevliList.length;m++){
								var threeMenu = new Menu();
								var threeLiHtm = threelevliList.get(m);
								var threeLi = $(threeLiHtm);
								var threeInput = threeLi.find("input");
								var threeName = threeInput.val();
								if ($.trim(threeName) == "") {
									alert("名称必须填写！");
									checkName = false;
									break;
								}
						  		if ($.trim(threeName).length > 8) {
									alert("名称必须小于等于8个字符！");
									checkName = false;
									break;
								}
								threeMenu.name = threeName;
								threeMenu.sortIndex = m;
								var threeDataId = threeInput.attr("data-id");
								if(threeDataId != ""){
									threeMenu.id =threeDataId;
								};
								var threeParentId = threeInput.attr("parent-id");
								if(threeParentId != ""){
									threeMenu.parentId =threeParentId;
								};
								 
								threeMenuList.push(threeMenu);
							}
							twoMenu.childMenuList = threeMenuList;
						}
						twoMenuList.push(twoMenu);
					}
					menu.childMenuList = twoMenuList;
				}
				oneMenuList.push(menu);
			}
			
			if(!checkName){
				return;
			}
			var menuListJson = JSON.stringify(oneMenuList);
			//alert(menuListJson);
			$('#J_menuListJson').val(menuListJson);
			// 保存
			var url = '/pub/ajaxResultPage.htm';
        	$.ajax({
                url: url,
                type: 'post',
                data: $("#J_SiteMenuForm").serialize() ,
                dataType: 'text',
                cache: false,
                async	:	false,
                success: function (data) {
                	if(data) {
                		alert('设置成功');
                		$(".mod-public-attr-menu").dialog("close");
        				$(".mod-public-attr-menu").remove();
        				window.location.href="/admin/siteConfig.htm?siteId="+siteId;
                	}
                }
            });
            
		});
		
		// 取消
		$('#J_BtnMenuCancle').click(function(){
			$(".mod-public-attr-menu").dialog("close");
        	$(".mod-public-attr-menu").remove();
		});	
    }
    
    function Menu(){
    	
    }
});