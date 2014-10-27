jQuery(function($) {
	$('#J_update_name').click(function(){
		var siteId = $('#siteId').val();
    	$.get('/admin/editSite.htm?siteId='+siteId, function (data) {
            $("body").append(data);
            $.use("ui-dialog", function () {
                var attrDialog = $(".mod-public-attr-name");
                attrDialog.dialog({
                    modalCSS: {
                        background: "#000",
                        opacity: 0.4
                    },
                    center: true,
                    shim: true
                });
                initEditDialogName(siteId);
            });
		});
	});
	
	function initEditDialogName(siteId) {
		$('#J_SiteId').val(siteId);
		$(".mod-public-attr-name .dialog-close-btn").click(function () {
        	$(".mod-public-attr-name").dialog("close");
        	$(".mod-public-attr-name").remove();
        });
		// 编辑logo页面js交互
		$('#J_BtnNameSave').click(function(){
			
			var siteName = $('#siteName').val();
			if($.trim(siteName) == "" <= 0){
				alert('必须填写名称');
				return false;
			}
			if ($.trim(siteName).length > 8) {
				alert("名称必须小于等于8个字符！");
				return false;
			}
			var _id = $('#J_SiteId').val();
			// 保存
			var url = '/pub/ajaxResultPage.htm';
			$('#J_UpdateSiteForm').ajaxSubmit({
				url: url,
                type: 'post',
                success: function (data) {
                	var json = $.parseJSON(data);
					if (json['statusCode'] == -1) {
						alert(json['msg']);
					}
					else if (json['statusCode'] == 1) {
						alert(json['msg']);
						$(".mod-public-attr-name").dialog("close");
        				$(".mod-public-attr-name").remove();
						window.location.href="/admin/siteConfig.htm?siteId="+_id;
					}
                }
			});
			
		});
		// 取消
		$('#J_BtnNameCancle').click(function(){
			$(".mod-public-attr-name").dialog("close");
        	$(".mod-public-attr-name").remove();
		});	
    }
});