(function ($) {
    $(function () {
    	testBrowser();//检测浏览器
        //选中一级菜单加载二级内容
        
    });
    
    //编辑logo页面
	$('#J_updateLogo').click(function(){
    	$.get('/admin/setLogo.htm?', function (data) {
            $("body").append(data);
            $.use("ui-dialog", function () {
                var attrDialog = $(".mod-public-attr");
                attrDialog.dialog({
                    modalCSS: {
                        background: "#000",
                        opacity: 0.4
                    },
                    center: true,
                    shim: true
                });
                initEditDialog(0);
            });
		});
	});
	
	
	function initEditDialog(id) {
		$(".mod-public-attr .dialog-close-btn").click(function () {
        	$(".mod-public-attr").dialog("close");
        	$(".mod-public-attr").remove();
        	window.location.href="/admin/page.htm";
        });
		//编辑logo页面js交互
		$('#J_BtnSave').click(function(){
			alert("提交数据");
        	$(".mod-public-attr").dialog("close");
        	$(".mod-public-attr").remove();
		});
		
		//取消
		$('#J_BtnCancle').click(function(){
			$(".mod-public-attr").dialog("close");
        	$(".mod-public-attr").remove();
		});	
    }
  
})(jQuery);