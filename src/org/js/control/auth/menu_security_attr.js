var source = 
		 '<ul class="dw_ctrl_menu_security_attr">'
		+	'<li>'
		+		'<label><span class="required_mark">*</span>资源owner：</label>'
		+		'<select class="e-chosen-select menu_owner" name="menuOwner" >'
		+			'<option value="">--请选择--</option>'
		+			'<% for(var i = 0; i < owners.length; i++) { %>'
		+				'<option value="<%=owners[i].code%>" <% if(menu != null && owners[i].code == menu.menuOwner) { %> selected="selected" <% } %>><%=owners[i].name%> [<%=owners[i].department%>]</option>'
		+			'<% } %>'
		+		'</select>'
		+	'</li>'
		+	'<li>'
		+		'<label><span class="required_mark">*</span>资源安全等级：</label>'
		+		'<select class="e-select" name="menuLvl">'
		+			'<option value="1" <% if(menu != null && menu.security == 1) { %> selected="selected" <% } %>>普通</option>'
		+			'<option value="2" <% if(menu != null && menu.security == 2) { %> selected="selected" <% } %>>重要</option>'
		+			'<option value="3" <% if(menu != null && menu.security == 3) { %> selected="selected" <% } %>>隐私</option>'
		+		'</select>'
		+	'</li>'
		+	'<li id="organization">'
		+		'<label><span class="required_mark">*</span>资源所属组织：</label>'
		+		'<% if(depts.length == 0) { %>'
		+		'<span style="color:#FF4100;">没有能够管理的部门，请联系【星魁】设置</span>'
		+		'<% } else { %>'
		+			'<% for(var i = 0; i < depts.length; i++) { %>'
		+				'<label>'
		+					'<% if(depts[i].status == -1) { %><input type="hidden" name="menuDepts" value="<%=depts[i].deptId%>" /><% } %>'
	    +					'<input type="checkbox" name="menuDepts" value="<%=depts[i].deptId%>" <% if(depts[i].status==1) { %> checked="checked" <% } else if(depts[i].status==-1) { %> checked="checked" disabled="true"  class="disabled-element" <% } %>/><%=depts[i].department%>'
		+				'</label>'
		+			'<% } %>'
		+		'<% } %>'
		+	'</li>'
		+'</ul>';
var menuSecurityAttrTemplateEngine = template.compile(source);

function menuSecurityAttr(container, menuObjectId, server,callBack) {
	return jQuery.ajax({
		url : 'http://' + server + '/json/auth/menuSecurityAttr.do',
		data : {
			'menuObjectId' : menuObjectId
		},
		type : 'GET',
		dataType : 'jsonp',
		success : function(data) {
			if (typeof console != 'undefined' && console.debug) {
				console.debug("获取资源安全属性区域成功，当前登录用户：" + data.loginUser);
			}
			jQuery(container).html(menuSecurityAttrTemplateEngine(data));
			if(callBack){
				callBack();
			}
			jQuery.getScript('http://a.tbcdn.cn/apps/tdata/js/lib/beast/widget/ui/chosen-min.js', function() {
				jQuery('.dw_ctrl_menu_security_attr .menu_owner').chosen({
					search_contains : true,
					no_results_text : '无搜索结果-'
				});
			});
		}
	});
}

