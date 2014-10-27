(function($) {
	// 分页
	window.renderPage = function(toPage) {
		document.getElementById("J_PAGEID").value = toPage;
		document.getElementById("searchForm").submit();
	};
	$('#tabSite a').click(function (e) {
	  e.preventDefault();
	  var tabName = $(this).attr("tab-name");
	  $('#tabName').attr("value",tabName);
	  submitForm();
	  //$(this).tab('show');切换的时候重新刷新页面加载数据，此方法不用了。
	});
	// 查询按钮
	$('#J_QueryBtn').click(function() {
		submitForm();
	});
	//排序，1降序，2升序
	$('#gmt-up').click(function() {
		$('#gmtOrder').attr('value',2);
		$('#accessOrder').attr('value',0);
		submitForm();
	});
	$('#gmt-down').click(function() {
		$('#gmtOrder').attr('value',1);
		$('#accessOrder').attr('value',0);
		submitForm();
	});
	$('#access-up').click(function() {
		$('#gmtOrder').attr('value',0);
		$('#accessOrder').attr('value',2);
		submitForm();
	});
	$('#access-down').click(function() {
		$('#gmtOrder').attr('value',0);
		$('#accessOrder').attr('value',1);
		submitForm();
	});
	function submitForm() {
		$("#J_PAGEID").val("1");
		$("#searchForm").submit();
	}

	$('#J_Result').delegate('.e-delete','click',function(e) {
		var siteId = $(e.currentTarget).attr("data-id");
		if (confirm("确定要删除吗？")) {
			$.post('/pub/ajaxResultPage.htm?action=/SiteAction&event_submit_doUpdateStatus=y&siteId=' + siteId + '&status=-1',
			function(data) {
				if (data == "success") {
					alert("删除成功");
					window.location.reload();
				} else {
					alert(data);
				}
			});
		}
	});
	// e-update
	$('#J_Result').delegate('.e-update', 'click', function(e) {
		var siteId = $(e.currentTarget).attr("data-id");
		$.get('/admin/addSite.htm?siteId=' + siteId, function(data) {
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
				initEditDialog(siteId);
			});
		});
	});

	// 开发新数据
	$('#J_AddData').click(function() {
		$.get('/admin/addSite.htm?', function(data) {
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
				initEditDialog(0);
			});
		});

	});

	function initEditDialog(id) {
		$(".mod-public-attr .dialog-close-btn").click(function() {
			$(".mod-public-attr").dialog("close");
			$(".mod-public-attr").remove();
//			window.location.href = "/admin/siteList.htm";
		});
		$('#J_BtnSave').click(function() {
			var ret = [];
			var sName = $('#siteName').val();
			var sCode = $('#code').val();
			if ($.trim(sName) == "") {
				ret.push("名称必须填写！");
			}
			if ($.trim(sCode) == "") {
				ret.push("域名编码必须填写！");
			}
			if ($.trim(sName).length > 8) {
				ret.push("名称必须小于等于8个字符！");
			}
			var reg = /^[a-z]+$/;
			if(!reg.test(sCode)){
				ret.push("域名编码必须是a-z的小写字母！");
			}
			if (ret.length > 0) {
				alert(ret.join('\n'));
				return false;
			}
			var url = '/pub/ajaxResultPage.htm';
			$.ajax({
				url : url,
				type : 'post',
				data : $("#J_AddSiteForm").serialize(),
				dataType : 'text',
				cache : false,
				async : false,
				success : function(data) {
					console.log(data);
					var json = $.parseJSON(data);
					
					if (json['statusCode'] == -1) {
						alert(json['msg']);
					}
					else if (json['statusCode'] == 1) {
						//alert(json['msg']);
						redirectUrl('/admin/siteConfig.htm?siteId='+json['siteId']);
					}
				}
			});
			
		});

		$('#J_BtnCancle').click(function() {
			// 连接到各数据开发页面
			$(".mod-public-attr").dialog("close");
			$(".mod-public-attr").remove();
		});
	}
	
	function redirectUrl(url){
		window.location.href=url;
	}

})(window.jQuery);