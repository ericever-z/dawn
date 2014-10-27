define([
	'./module',
	'easing'
], function(module) {
	module.directive('flipper', ['numberFormatFilter', function(numberFormatFilter) {
		var Flipper = function(scope, element, attrs) {
			var me = this;
			
			me.scope = scope;
			me.$el = element;
			me.attrs = attrs;
			
			me.init();
		};
		
		angular.extend(Flipper.prototype, {
			init : function() {
				var me = this;
				
				me.initWatch();
			},
			
			initWatch : function() {
				var me = this;
				
				me.scope.$watch('flipper', function(newValue, oldValue) {
					if(!newValue || newValue == undefined) {
						return;
					}
					if(!oldValue || newValue == oldValue) {
						oldValue = 0;
					}
					$({fliperValue: oldValue}).animate({fliperValue: newValue}, {
					      duration: 4000,
					      easing:'swing',
					      progress: function(promise, progress, remain) {
					      	if(remain%4 == 0) {
					          me.$el.text(numberFormatFilter(Math.round(this.fliperValue)));
					      	}
					      }
					  });
				});
			}
		});
		
		return {
			restrict : 'A',
			scope : {
				flipper : '=flipper'
			},
			link : function(scope, element, attrs) {
				new Flipper(scope, element, attrs);
			}
		}
	}]);
});