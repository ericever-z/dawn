jQuery(function($) {
	// 弹出对话框
	$('#J_deliver_sa').click(function(e) {
		var siteId = $('#siteId').val();
		$.get('/part/siteDeliver.htm', function(data) {
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
				initDialog(siteId);
			});
		}, 'html');
	});

	// 初始化对话框
	function initDialog(siteId) {
		$('#J_siteId').val(siteId);
		// 关闭按钮
		$(".mod-public-attr .dialog-close-btn,#J_BtnCancle").click(function() {
			$(".mod-public-attr").dialog("close");
			$(".mod-public-attr").remove();
		});
		// 提交表单
		$('#J_BtnSave').click(function() {
			var workId = $('input[name="receiver"]').val();
			var nick = $('input[name="receiver"]').attr("nick");
			$('#workId').val(workId);
			$('#nick').val(nick);
			//保存
			var url = '/pub/ajaxResultPage.htm';
        	$.ajax({
                url: url,
                type: 'post',
                data: $("#J_SiteDeliverForm").serialize() ,
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
						usr.value = usrs[i].nick + '(' + usrs[i].department + ')';
						usr.label = usrs[i].nick + '(' + usrs[i].department + ')';
						usr.workId = usrs[i].workId;
						usr.nick = usrs[i].nick;
						data.push(usr);
					}
					resp(data);
				});
			},
			select : function(e, ui) {
				$('input[name="receiver"]').val(ui.item.workId);
				$('input[name="receiver"]').attr("nick",ui.item.nick);
			}
		});
	}
});