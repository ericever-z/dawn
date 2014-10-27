jQuery(function($) {
// 编辑logo页面
	$('#J_updateLogo').click(function(){
		var siteId = $('#siteId').val();
    	$.get('/admin/setLogo.htm?siteId='+siteId, function (data) {
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
                initEditDialog(siteId);
            });
		});
	});
	
	function initEditDialog(siteId) {
		$('#J_SiteId').val(siteId);
		
		$('.updateTitle').keydown(function(e){
			if(e.keyCode == 13){
				e.preventDefault();
			}
		});
		
		function saveLogo(){
			var isLogo = $("input[name='type']:checked").val(); 
			if(isLogo == "img"){
				var lf = $('#J_logo_file').val();
				var lu = $('#J_SiteLogoUrl').val();
				if(lf == "" && lu.length <= 0){
					alert('选择logo则必须上传logo图片');
					return false;
				}
			}else if(isLogo == "txt"){
				var logoTitle = $('#J_logo_title').val();
				if($.trim(logoTitle) == "" <= 0){
					alert('选择title则必须填写title');
					return false;
				}
				if ($.trim(logoTitle).length > 8) {
					alert("title必须小于等于8个字符！");
					return false;
				}
			}
			var _id = $('#J_SiteId').val();
			$('#logoType').val(isLogo);
			// 保存
			var url = '/pub/ajaxResultPage.htm';
			$('#J_SiteLogoForm').ajaxSubmit({
				url: url,
                type: 'post',
                success: function (data) {
                	var json = $.parseJSON(data);
					if (json['statusCode'] == -1) {
						alert(json['msg']);
					}
					else if (json['statusCode'] == 1) {
						alert(json['msg']);
						$(".mod-public-attr").dialog("close");
        				$(".mod-public-attr").remove();
						//redirectUrl('/admin/siteConfig.htm?siteId='+_id);
						window.location.href="/admin/siteConfig.htm?siteId="+_id;
					}
                }
			});
		}
		
		$(".mod-public-attr .dialog-close-btn").click(function () {
        	$(".mod-public-attr").dialog("close");
        	$(".mod-public-attr").remove();
        });
		// 编辑logo页面js交互
		$('#J_BtnSave').click(function(){
			saveLogo();
		});
		
		// 取消
		$('#J_BtnCancle').click(function(){
			$(".mod-public-attr").dialog("close");
        	$(".mod-public-attr").remove();
		});	
    }
    
    // 设置LOGO对话框单选框点击切换
	$('#J_SiteLogoForm .c_checkList input[type="radio"]').live('click', function(e) {
		$('#J_SiteLogoForm .c_checkList li').each(function(i, el) {
			if (!$(e.currentTarget).parents('li').is(el)) {
				$(el).addClass('inactive');
				$(el).find('input').each(function(i, el) {
					if (!$(el).is('input[type="radio"]')) {
						$(el).attr('disabled', true);
						$(el).attr('readonly',true);
					}
				});
			} else {
				$(el).removeClass('inactive');
				$(el).find('input').attr('disabled', false);
				$(el).find('input').removeAttr('readonly',false);
			}
		});

	});
});