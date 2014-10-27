window.jQuery(document).ready(function() {
	function auto_margin() {
		var $ = jQuery;
		var elements = $(".auto_margin_child");
		elements.each(function() {
			var that = $(this);
			var totalWidth = that.width()
					- that.css('padding-left').replace("px", "")
					- that.css('padding-right').replace("px", "") - 20;

			var childs = that.children();

			var singleWidth = childs.first().width();

			var column = parseInt(totalWidth / singleWidth);
			var margin = parseInt((totalWidth - singleWidth * column)
					/ (column - 1));
			childs.each(function(index) {
				if (index % column == 0) {
					$(this).css({
						'margin-left' : 0,
						'visibility' : 'visible',
					});
				} else {
					var child = $(this);
					child.css({
						'margin-left' : margin,
						'visibility' : 'visible'
					});
				}
			})
		})
	}
	
	auto_margin();

	$(window).resize(auto_margin);
})
