(function($) {
	$.fn.extend({
		paginator : function(options) {
			var pageIndex = options.pageIndex;
			if (isNaN(pageIndex)) {
				pageIndex = 1;
			}
			var rowsPerPage = options.rowsPerPage;
			if (isNaN(rowsPerPage) || rowsPerPage < 0) {
				rowsPerPage = 20;// default rowsPerPage
			}
			var rowsFunc = options.rowsFunc;
			var rows = null;
			if(rowsFunc != null) {
				rows = $(rowsFunc());
			}
			if (rows.length == 0) {
				throw 'paginator init error: rows must be set and available!';
			}
			var container = $(options.container);
			if (container.length == 0) {
				throw 'paginator init error: container must be set and available!';
			}
			var width = options.width;
			if (isNaN(width)) {
				width = 8;
			}
			var afterGoPage = options.afterGoPage;
			var boundRows = options.boundRows;

			var firstHTML = '<a href="javascript:void(0);" class="paginator_btn paginator_first">&lt;&lt;</a>';
			var preHTML = '<a href="javascript:void(0);" class="paginator_btn paginator_pre">&lt;</a>';
			var normalHTML = '<a href="javascript:void(0);" class="paginator_btn paginator_normal">{0}</a>';
			var nextHTML = '<a href="javascript:void(0);" class="paginator_btn paginator_next">&gt;</a>';
			var lastHTML = '<a href="javascript:void(0);" class="paginator_btn paginator_last">&gt;&gt;</a>';
			var currentHTML = '<span class="paginator_btn paginator_now">{0}</span>';

			var pageCount = Math.ceil(rows.length / rowsPerPage);
			if (pageIndex > pageCount) {
				pageIndex = pageCount;
			}
			paint();

			function paint() {
				if(rowsFunc != null) {
					pageCount = Math.ceil($(rowsFunc()).length / rowsPerPage);
					rows = $(rowsFunc());
				}

				var minIndex, maxIndex;
				minIndex = pageIndex - Math.ceil(width / 2);
				if (minIndex < 1) {
					minIndex = 1;
				}
				maxIndex = minIndex + width - 1;
				if (maxIndex > pageCount) {
					maxIndex = pageCount;
				}
				minIndex = maxIndex - width + 1;
				if (minIndex < 1) {
					minIndex = 1;
				}

				var pageNavHTML = firstHTML + preHTML;
				for (i = minIndex; i < pageIndex; i++) {
					pageNavHTML += normalHTML.replace(/\{0\}/, i);
				}
				pageNavHTML += currentHTML.replace(/\{0\}/, pageIndex);
				for (i = pageIndex + 1; i <= maxIndex; i++) {
					pageNavHTML += normalHTML.replace(/\{0\}/, i);
				}
				pageNavHTML += nextHTML + lastHTML;

				$(container).html(pageNavHTML);

				$('.paginator_first').click(function(e) {
					goPage(1);
				});
				$('.paginator_pre').click(function(e) {
					goPage(pageIndex - 1);
				});
				$('.paginator_next').click(function(e) {
					goPage(pageIndex + 1);
				});
				$('.paginator_last').click(function(e) {
					goPage(pageCount);
				});
				$('.paginator_normal').click(function(e) {
					goPage(parseInt($(e.currentTarget).text(), 10));
				});

				paintTable();
			}

			function paintTable() {
				rows.css('display', 'none');
				boundRows().css('display', 'none');
				for (i = (pageIndex - 1) * rowsPerPage + 1; i <= pageIndex * rowsPerPage && i <= rows.length; i++) {
					$(rows.get(i - 1)).css('display', '');
					boundRows($(rows.get(i - 1))).css('display', '');
				}
				if(afterGoPage != null) {
					afterGoPage();
				}
			}

			function goPage(index) {
				if (index < 1) {
					index = 1;
				} else if (index > pageCount) {
					index = pageCount;
				}
				pageIndex = index;
				paint();
			}
		}
	});
})(jQuery);