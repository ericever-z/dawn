jQuery(function($) {
	// 弹出对话框
	$('#J_mng_admin').click(function(e) {
		var siteId = $('#siteId').val();
		$.get('/part/siteAdminMng.htm?siteId='+siteId, function(data) {
			$("body").append(data);
			$.use("ui-dialog", function() {
				var attrDialog = $(".mod-public-attr");
				attrDialog.dialog({
					modalCSS : {
						background : "#000",
						opacity : 0.4
					},
					center : true,
					shim : true
				});
				initDialog();
			});
		}, 'html');
	});

	// 初始化对话框
	function initDialog() {
		// 关闭按钮
		$(".mod-public-attr .dialog-close-btn,#J_BtnCancle").click(function() {
			$(".mod-public-attr").dialog("close");
			$(".mod-public-attr").remove();
		});
		// 提交表单
		$('#J_BtnSave').click(function() {
			var workIds = '';
			$('.admin_list .list-wrapper').each(function(i, el) {
				if(workIds.length > 0){
					workIds = workIds + "-" + $(el).attr('data-id');
				}else{
					workIds = $(el).attr('data-id');
				}
			});
			
			$('#workIds').attr("value",workIds);
			//保存
			var url = '/pub/ajaxResultPage.htm';
        	$.ajax({
                url: url,
                type: 'post',
                data: $("#J_SiteAdminForm").serialize() ,
                dataType: 'text',
                cache: false,
                async	:	false,
                success: function (data) {
                	if(data) {
                		alert('设置成功');
                		$(".mod-public-attr").dialog("close");
						$(".mod-public-attr").remove();
                	}
                }
            });
		});
		
		$('.user_auto').keydown(function(e){
			if(e.keyCode == 13){
				e.preventDefault();
			}
		});
		
		// 员工自动提示
		$('.user_auto').autocomplete({
			delay : 500,// 延迟500ms后进行查询（如果500ms内有输入，则再等500ms）
			minLength : 2,// 最少输入2个字符才开始查询
			source : function(req, resp) {
				var term = req.term;
				$.post('/admin/userInfo/getUser.jsn', {
					'term' : term
				}, function(usrs) {
					var data = [];
					for (i = 0; i < usrs.length; i++) {
						var usr = {};
						usr.value = usrs[i].nick;
						usr.label = usrs[i].nick + '(' + usrs[i].department + ')';
						usr.workId = usrs[i].workId;
						data.push(usr);
					}
					resp(data);
				});
			},
			select : function(e, ui) {
				var selectedAdmin = ui.item;
				// 检查是否已经被加入，如果已经加入，则不处理
				var isExisted = false;
				$('.admin_list .list-wrapper').each(function(i, el) {
					if ($(el).attr('data-id') == selectedAdmin.workId) {
						isExisted = true;
					}
				});
				if (isExisted) {
					return;
				}

				var admin = $('.admin_list .dummy').clone();
				admin.removeClass('dummy');
				admin.attr('data-id', selectedAdmin.workId);
				admin.find('.name-label').text(selectedAdmin.value);
				admin.show();

				$('.admin_list').append(admin);
			}
		});
	}

	// 删除已选的管理员
	$('body').delegate('.admin_list .del', 'click', function(e) {
		$(e.currentTarget).parents('.list-wrapper').remove();
	});
});