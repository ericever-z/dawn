("colorpicker" in jQuery.fn)||(function(d,e){var b=d.util.ua.ie6;d.widget("ui.colorpicker",d.ui.mouse,{options:{popup:true,radius:84,square:100,width:194,update:false,triggerType:"click"},_create:function(){var h=this,j=h.options,i=this.element;if(j.popup){h.activator=i}else{h.render();h.setColor(j.color||"#000000")}h._buildEvent()},render:function(){var h=this,k=h.options,j=this.element;if(k.popup){h.con=d("<span>",{"class":"ui-colorpicker",css:{position:"absolute",background:"#FFF",display:"none"}}).appendTo("body")}else{h.con=j.addClass("ui-colorpicker")}h.con.html('<span class="wrap">				<span class="board"></span>				<span class="wheel"></span>				<span class="overlay"></span>				<span class="h-marker marker"></span>				<span class="sl-marker marker">			</span></span>');h.element=h.wrap=d(">span.wrap",h.con);var i=h.wrap.children();h.board=d(i[0]);h.wheel=d(i[1]);h.hMarker=d(i[3]);h.slMarker=d(i[4]);if(b){i.each(function(){if(this.currentStyle.backgroundImage!="none"){var l=this.currentStyle.backgroundImage;l=this.currentStyle.backgroundImage.substring(5,l.length-2);d(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+l+"')"})}})}h._mouseInit()},_destroy:function(){this._mouseDestroy();this.hide(true)},_buildEvent:function(){var h=this,i=h.options;if(!i.popup){return this}h.activator.bind(i.triggerType,function(j){j.preventDefault();h.show()});if(i.update){h.activator.bind("keyup.ui-colorpicker",function(){h.setColor(this.value)})}return h},toggle:function(){var h=this;if(h.con){h.hide()}else{h.show()}},show:function(){var j=this;if(j.con){return}j.render();var m=j.options,l=j.activator.offset(),k=l.left,h=j.activator.outerHeight(),i=l.top+h;j.con.css({left:k,top:i}).fadeIn(150,function(){if(m.popup){d(document).unbind("click.ui-colorpicker").bind("click.ui-colorpicker",function(n){if(d(n.target)[0]===j.activator[0]){return}j.hide()});j.con.bind("click.ui-colorpicker",function(n){n.stopPropagation()})}});j.setColor((m.update?j.activator.val():m.color)||"#000000",true);return j},hide:function(i){var h=this;if(!h.con){return}var k=h.options;function j(){h.con.remove();d.extend(h,{con:null,wrap:null,board:null,wheel:null,hMarker:null,slMarker:null})}if(i){j()}else{h.con.fadeOut(150,j)}if(k.popup){d(document).unbind("click.ui-colorpicker")}return h},setColor:function(j,k){var i=this,h=g(j);if(k||(i.color!=j&&h)){i.color=j;i.rgb=h;i.hsl=c(i.rgb);i._updateDisplay()}return this},setHSL:function(i){var h=this;h.hsl=i;h.rgb=f(i);h.color=h._pack(h.rgb);h._updateDisplay();return this},_updateDisplay:function(){var h=this,j=h.options,i=h.hsl[0]*6.28;h.hMarker.css({left:Math.round(Math.sin(i)*j.radius+j.width/2),top:Math.round(-Math.cos(i)*j.radius+j.width/2)});h.slMarker.css({left:Math.round(j.square*(0.5-h.hsl[1])+j.width/2),top:Math.round(j.square*(0.5-h.hsl[2])+j.width/2)});h.board.css("backgroundColor",h._pack(f([h.hsl[0],1,0.5])));if(j.update){h.activator.css({backgroundColor:h.color,color:h.hsl[2]>0.5?"#000":"#fff"}).val(h.color)}h._trigger("change",null,{color:h.color})},_pack:function(i){var k=Math.round(i[0]*255),j=Math.round(i[1]*255),h=Math.round(i[2]*255);return"#"+(k<16?"0":"")+k.toString(16)+(j<16?"0":"")+j.toString(16)+(h<16?"0":"")+h.toString(16)},_widgetCoords:function(j){var i=this,k=i.options,h,m,l=i.wheel.offset();h=(j.pageX||0*(j.clientX+d("html").scrollLeft()))-l.left;m=(j.pageY||0*(j.clientY+d("html").scrollTop()))-l.top;return{x:h-k.width/2,y:m-k.width/2}},_mouseCapture:function(i){var h=this,j=h.options;if(h.options.disabled){return false}var k=h._widgetCoords(i);h.circleDrag=Math.max(Math.abs(k.x),Math.abs(k.y))*2>j.square;h._mouseDrag(i);return true},_mouseDrag:function(l){var k=this,m=k.options,n=k._widgetCoords(l);if(k.circleDrag){var j=Math.atan2(n.x,-n.y)/6.28;if(j<0){j++}k.setHSL([j,k.hsl[1],k.hsl[2]])}else{var i=Math.max(0,Math.min(1,0.5-(n.x/m.square))),h=Math.max(0,Math.min(1,0.5-(n.y/m.square)));k.setHSL([k.hsl[0],i,h])}return false}});function g(h){if(h.length==7){return[parseInt(h.substring(1,3),16)/255,parseInt(h.substring(3,5),16)/255,parseInt(h.substring(5,7),16)/255]}else{if(h.length==4){return[parseInt(h.substring(1,2),16)/15,parseInt(h.substring(2,3),16)/15,parseInt(h.substring(3,4),16)/15]}}}function f(o){var q,p,i,m,n;var k=o[0],t=o[1],j=o[2];p=(j<=0.5)?j*(t+1):j+t-j*t;q=j*2-p;return[a(q,p,k+0.33333),a(q,p,k),a(q,p,k-0.33333)]}function a(j,i,k){k=(k<0)?k+1:((k>1)?k-1:k);if(k*6<1){return j+(i-j)*k*6}if(k*2<1){return i}if(k*3<2){return j+(i-j)*(0.66666-k)*6}return j}function c(o){var k,q,t,m,u,j;var i=o[0],n=o[1],p=o[2];k=Math.min(i,Math.min(n,p));q=Math.max(i,Math.max(n,p));t=q-k;j=(k+q)/2;u=0;if(j>0&&j<1){u=t/(j<0.5?(2*j):(2-2*j))}m=0;if(t>0){if(q==i&&q!=n){m+=(n-p)/t}if(q==n&&q!=p){m+=(2+(p-i)/t)}if(q==p&&q!=i){m+=(4+(i-n)/t)}m/=6}return[m,u,j]}d.add("ui-colorpicker")})(jQuery);