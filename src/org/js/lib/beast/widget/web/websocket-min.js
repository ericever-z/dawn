("WebSocket" in FE.ui)||(function(b,c,d){var a=function(e){this._init(e)};if(!b.support.WebSocket){b.extend(a.prototype,{_init:function(e){this.engine=b("<span>",{id:"flash-websocket-"+(e.cid||(b.guid++))}).css({position:"absolute",left:"-1000px",top:"-1000px"}).appendTo("body");this._buildEvent(e)},_buildEvent:function(f){var e=this;this.engine.flash({module:"websocket"}).bind("swfReady.flash",function(){e.engine.flash("open",f)}).bind("open.flash",function(){f.onopen&&f.onopen()}).bind("send.flash",function(){f.onsend&&f.onsend()}).bind("message.flash",function(h,g){f.onmessage&&f.onmessage(g)}).bind("close.flash",function(){f.onclose&&f.onclose()}).bind("stateChange.flash",function(){e.engine.readyState=e.engine.flash("gerReadyState")})},open:function(e){if(this.engine){this.engine.flash("open",e)}},close:function(e){if(this.engine){this.engine.flash("close",e)}},send:function(e){if(this.engine){this.engine.flash("send",e)}}})}else{b.extend(a.prototype,{_init:function(e){this.config=e;this.engine=new window.WebSocket(e.url);b.extend(this.engine,e)},open:function(){this.engine=new window.WebSocket(this.config.url)},send:function(e){this.engine.send(e)},close:function(){this.engine.close()},message:function(){}})}c.WebSocket=a;b.add("web-websocket")})(jQuery,FE.ui);