if (self.CavalryLogger) { CavalryLogger.start_js(["o+v2a"]); }

__d("ConditionClassOnVisible",["IntersectionObserver"],(function a(b,c,d,e,f,g){"use strict";var h=function h(j,k,l){var m=arguments.length<=3||arguments[3]===undefined?true:arguments[3],n=j[0],o=m?n.intersectionRatio>0:!(n.intersectionRatio>0);n.target.classList.toggle(l,o)},i={track:function j(k,l,m){var n=new(c("IntersectionObserver"))(function(o,n){h(o,n,l,m)},{});n.observe(k)}};f.exports=i}),null);
__d("XGamesReplaceableXOutAsyncController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/games/async/xout/replace/",{unit_type:{type:"String"},fbs:{type:"Int"},app_id:{type:"Int"},extra_data:{type:"String"},query_type:{type:"String"},query_params:{type:"String"},excluded_app_ids:{type:"StringVector",defaultValue:[]},attributes:{type:"String"}})}),null);
__d("GamesReplaceableXOutHelper",["invariant","Parent","XGamesReplaceableXOutAsyncController"],(function a(b,c,d,e,f,g,h){var i="data-games-xout-container",j=0,k={},l={};function m(w){var x=c("Parent").byAttribute(w,i);if(x){var y=parseInt(x.getAttribute(i),10);if(y===0){j+=1;y=j.toString();x.setAttribute(i,y)}return y}}function n(w){var x=m(w);x||h(0);return x}function o(w){var x=k[n(w)];return x?Object.keys(x):[]}function p(w,x){return q(w,[x])}function q(w,x){var y=m(w);if(y){var z=k[y]=k[y]||{};for(var A=0;A<x.length;A+=1)z[x[A]]=true}}function r(w){var x=n(w);if(x){delete k[x];delete l[x]}}function s(w,x){return c("XGamesReplaceableXOutAsyncController").getURIBuilder().setInt("app_id",x.appID).setString("extra_data",x.extraData).setString("attributes",x.attributes).setString("query_type",w.getAttribute("data-games-xout-query-type")).setString("query_params",w.getAttribute("data-games-xout-query-params")).setString("unit_type",x.unitType).setInt("fbs",w.getAttribute("data-games-xout-fbs")).setStringVector("excluded_app_ids",o(w)).getURI()}function t(w,x){var y=m(w);if(!y)return;var z=l[y]=l[y]||[];if(z.length===0)x();z.push(x)}function u(w){var x=n(w),y=l[x];if(y){y.shift();if(y.length>0)y[0]()}}var v={getBoundAppIDs:o,registerAppID:p,registerAppIDs:q,deleteContainer:r,queueRequest:t,processQueuedRequests:u,createURI:s};f.exports=v}),null);
__d("GamesReplaceableXOutListener",["csx","cx","AsyncRequest","CSS","DOM","Event","GamesReplaceableXOutHelper","Parent"],(function a(b,c,d,e,f,g,h,i){var j={};function k(n,o,p){var q=p.payload;if(!q)return;c("GamesReplaceableXOutHelper").registerAppID(n,q.app_id);c("GamesReplaceableXOutHelper").processQueuedRequests(o);j[q.app_id]=q.item_data;c("DOM").replace(o,q.el)}function l(n){return c("Event").listen(n,"click",function(o){var p=o.target;if(!c("CSS").matchesSelector(p,"._1m6e"))return;var q=c("Parent").bySelector(p,"._2b2u"),r=p.getAttribute("data-appid"),s=j[r];c("CSS").addClass(q,"_4ksu");c("GamesReplaceableXOutHelper").queueRequest(q,function(){new(c("AsyncRequest"))(c("GamesReplaceableXOutHelper").createURI(n,s)).setHandler(function(t){return k(n,q,t)}).setMethod("POST").send();delete j[r]})})}var m={registerContainerItems:function n(o,p,q){c("GamesReplaceableXOutHelper").registerAppIDs(o,p);q.forEach(function(r){var s=r.appID;j[s]=r;c("GamesReplaceableXOutHelper").registerAppID(o,s)});l(o,p)}};f.exports=m}),null);
__d("XPymkFunnelLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/pymk/funnel_logging/",{event_ts:{type:"Int",required:true},query_id:{type:"Int"},candidate_id:{type:"Int"},signature:{type:"Int"},loc:{type:"String",required:true},ref:{type:"String"},action:{type:"Enum",required:true,enumType:1}})}),null);
__d("PymkFunnelLogger",["AsyncRequest","DOMQuery","XPymkFunnelLoggingController"],(function a(b,c,d,e,f,g){var h={setupListeners:function i(j,k,l,m,n){this._setupForSingleElement(j,k,l,"add");this._setupForSingleElement(j,k,m,"click");this._setupForSingleElement(j,k,n,"click")},logImpression:function i(j,k,l){this._logEvent(j,"impression",k,l)},logXOut:function i(j,k,l){this._logEvent(j,"hide",k,l)},_logEvent:function i(j,event,k,l){var m=c("XPymkFunnelLoggingController").getURIBuilder().setInt("candidate_id",j).setInt("signature",k).setInt("event_ts",Math.floor(Date.now()/1e3)).setEnum("action",event).setString("loc",l).getURI();new(c("AsyncRequest"))(m).setMethod("POST").send()},_setupForSingleElement:function i(j,k,l,m){Event.listen(l,"click",function(event){var n=j.getAttribute("data-signature"),o=c("DOMQuery").find(j,"input.friendBrowserID"),p=parseInt(o.value,10);this._logEvent(p,m,n,k)}.bind(this))}};f.exports=h}),null);
__d("XFriendRequestIHEventLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/requests/interaction_history_logging/",{target_id:{type:"FBID",required:true},log_event:{type:"String",required:true}})}),null);
__d("FriendRequestIHEventLogger",["Event","AsyncRequest","XFriendRequestIHEventLoggingController"],(function a(b,c,d,e,f,g){var h={setupJewelListeners:function i(j,k,l){this._setupForJewelSingleElement(j,k,"click");if(l)this._setupForJewelSingleElement(j,l,"click")},logImpression:function i(j){this._logEvent(j,"impression")},_logEvent:function i(j,event){if(isNaN(j))return;var k=c("XFriendRequestIHEventLoggingController").getURIBuilder().setFBID("target_id",j).setString("log_event",event).getURI();new(c("AsyncRequest"))(k).setMethod("POST").send()},_setupForJewelSingleElement:function i(j,k,l){c("Event").listen(k,"click",function(event){var m=j.getAttribute("id");if(!m)return;var n=m.substring(0,m.length-6);this._logEvent(n,l)}.bind(this))}};f.exports=h}),null);
__d("AppRequestReminders",["AsyncRequest","CSS","DOM","ge","$"],(function a(b,c,d,e,f,g){var h=0,i={},j=1,k=c("ge")("OtherAppReqReminder"),l=function l(r,s,t){i[s]={node:r,seq:j++,reqCount:t}},m=function m(r){h=r},n=function n(r){return r.id.split("_")[1]},o=function o(r){var s=c("ge")(r),t=s.nextSibling;if(t!==k){c("CSS").show(t);h-=i[n(t)].reqCount}p(h)},p=function p(r){new(c("AsyncRequest"))().setURI("/ajax/reminders/update_count.php").setData({new_count:r}).setMethod("POST").send()},q=function q(r,s){if(k&&s&&r>0)c("DOM").setContent(c("ge")("OtherAppReqLabel"),s);else if(k)c("CSS").hide(k);else c("CSS").hide(c("$")("OtherAppReqReminder"))};g.initNode=l;g.handleRemove=o;g.updateCount=q;g.setTotalOtherCount=m}),null);
__d("TickerController",["invariant","Arbiter","AsyncSignal","Bootloader","CSS","DOM","Parent","UIPagelet","Vector","$","emptyFunction","ge"],(function a(b,c,d,e,f,g,h){var i=1,j=2,k=3,l=4,m=15e3,n=null,o={},p={},q={setActiveInstance:function r(s){n=s},getActiveInstance:function r(){return n},clearRHCplaceholder:function r(){o.pagelet_rhc_ticker=null},registerInstance:function r(s,t){s||h(0);p[s]=t;q.setActiveInstance(t)},getInstance:function r(s){if(!s)return null;var t=c("Parent").byClass(c("$")(s),"fbFeedTicker");return p[t.id]||null},isLoaded:function r(s){var t=o[s.id];return!t||t.status==k},show:function r(s,t){t=t||c("emptyFunction");for(var u in p){var v=c("ge")(u);if(!v||v.parentNode.id==s.id)continue;q.hide(v.parentNode)}q._doPositionChange(s);c("CSS").show(s);var w=o[s.id];if(w&&w.status==i){var x=(c("Vector").getElementDimensions(s).y||0)>0,y=s.id==="pagelet_rhc_ticker"&&!c("CSS").hasClass(s,"hidden_rhc_ticker");if(x||y){var z=c("DOM").scry(s,".tickerPlaceholderSpinner")[0];z&&c("CSS").show(z);q._fetchTickerForPlaceholder(s,t)}else c("Arbiter").subscribe("Ticker/resized",function(){if(w.status==i)q._fetchTickerForPlaceholder(s,t)})}else{var A=c("DOM").scry(s,".fbFeedTicker")[0],B=q.getInstance(A);n=B;B&&B._poll();o[s.id]={status:l,callback:t};t()}c("Arbiter").inform("ticker/show",{node:s,callback:t})},_doPositionChange:function r(s){if(c("CSS").shown(s))return;new(c("AsyncSignal"))("/common/ods_endpoint.php",{k:"ticker.render.switch."+s.id}).send()},hide:function r(s){var t=c("DOM").scry(s,".fbFeedTicker")[0],u=q.getInstance(t);u&&u.hideActiveStory();c("CSS").hide(s)},hideStoriesByClass:function r(s){for(var t in p)c("DOM").scry(c("$")(t),s).forEach(c("CSS").hide)},hideStory:function r(s){var t=q.getInstance(s);t&&t.hideStory(s)},replaceStory:function r(s,t){var u=c("DOM").scry(document.body,"div.fbFeedTickerStory"),v=q.getInstance(u[0]);if(!v)return;var w=v._findStoryById(s);v.handleRemoveStory();c("CSS").hide(w);c("DOM").insertAfter(w,t);t.setAttribute("data-story-id",w.getAttribute("id"));var x=setTimeout(function(){return q.removeMarkup(t,w)},m);t.setAttribute("data-timeout-token",x)},removeMarkup:function r(s,t){c("Bootloader").loadModules(["Animation"],function(u){c("CSS").addClass(s,"removedStoryMarkup");new u(s).to("height",0).duration(500).ondone(function(){c("DOM").remove(s)}).go()},"TickerController")},undoHideStory:function r(s){var t=q.getInstance(s);t&&t.undoHideStory(s)},insertStoriesAtBottom:function r(s){n.insertStoriesAtBottom(s)},_fetchTickerForPlaceholder:function r(s,t){var u={handler:function v(){o[s.id].status=k;t()}};c("UIPagelet").loadFromEndpoint("TickerEntStoryPagelet",s.id,o[s.id].pageletData,u);o[s.id].status=j},registerStoryDialog:function r(s,t){c("Arbiter").subscribe("ticker/init",function(){var u=c("ge")(s),v=q.getInstance(u);v&&v.registerStoryDialog(u,t)},c("Arbiter").SUBSCRIBE_ALL)},registerPlaceholder:function r(s,t){var u=o[s];o[s]={status:i,pageletData:t};if(u&&u.status==l){q.show(c("$")(s));u.callback()}}};f.exports=q}),null);
__d("TickerRightColumnController",["csx","cx","Arbiter","CSS","DOM","Event","NavigationMessage","Parent","Run","Style","SubscriptionsHandler","TickerController","Vector","ge","throttle"],(function a(b,c,d,e,f,g,h,i){var j;function k(){var p=c("ge")("pagelet_rhc_ticker");p&&c("TickerController").show(p,m)}function l(){var p=c("ge")("pagelet_rhc_ticker");p&&c("TickerController").hide(p)}function m(){var p=c("ge")("pagelet_rhc_ticker"),q=c("DOM").scry(p,".ticker_container")[0],r=c("DOM").scry(p,".ticker_stream")[0],s=c("ge")("rightCol");if(!p||!q||!r||!s)return;c("Style").set(q,"height","0");var t=75,u=c("Vector").getViewportDimensions().y,v=c("Vector").getElementDimensions(s).y,w=u-v-t,x=c("Vector").getElementDimensions(r).y,y=Math.max(Math.min(w,x,j.tickerMaxHeight||425),j.tickerMinHeight||225);c("Style").set(q,"height",y+"px")}function n(p){var q=c("ge")("pagelet_rhc_ticker"),r=q&&c("Parent").bySelector(q,"._5zcc");if(r)c("CSS").conditionClass(r,"_5zcb",p);q&&c("CSS").conditionClass(q,"hidden_rhc_ticker",!p);if(p){m();var s=c("ge")("fbTickerClosedEd");s&&c("CSS").hide(s)}}var o={init:function p(q){j=q;var r=new(c("SubscriptionsHandler"))();if(j.enableSidebar)r.addSubscriptions(c("Arbiter").subscribe("sidebar/visibility",function(t,u){if(u)l();else k()}),c("Arbiter").subscribe("minisidebar/show",k),c("Arbiter").subscribe("LitestandClassicRHC/loaded",m),c("Event").listen(window,"scroll",c("throttle")(function(){var t=c("DOM").scry(c("ge")("pagelet_rhc_ticker"),".fbFeedTicker")[0],u=c("TickerController").getInstance(t);u&&u.handleRemoveStory()})));if(!c("CSS").hasClass(document.documentElement,"sidebarMode"))k();else if(j.enableSidebar)l();var s=function s(){r.release()};c("Arbiter").subscribeOnce(c("NavigationMessage").NAVIGATION_BEGIN,s);c("Run").onLeave(s)},initRHCTickerHider:function p(q){c("Event").listen(q,"click",this.hideRHCTicker)},showRHCTicker:function p(){n(true)},hideRHCTicker:function p(){n(false)}};f.exports=o}),null);
__d("QPRenderer",["CSS","XAsyncRequest","XQuickPromotionSimpleLoggingController","$"],(function a(b,c,d,e,f,g){var h=function h(m,event,n){var o=c("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",m).setString("qp_event",event).setStringToStringMap("qp_instance_log_data",n).getURI();new(c("XAsyncRequest"))(o).send()},i=function i(m,n,o){var p=c("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",m).setEnum("qp_action",n).setStringToStringMap("qp_instance_log_data",o).getURI();new(c("XAsyncRequest"))(p).send()},j=function j(m,n,o,p,q,r){l(m,o,c("$")(p),r,function(){if(q)c("CSS").hide(n)})},k=function k(m,n,o){n.show();h(m,"view",{});n.subscribe("cancel",function(){h(m,"dialog_cancel",{})});for(var p=0;p<o.length;p++){var q=o[p],r=c("$")(q.element_id);l(m,q.action,r,q.extra_log_data,q.should_close?function(){n.hide()}:function(){});if(q.action=="primary")r.focus()}},l=function l(m,n,o,p,q){o.addEventListener("click",function(){var r=c("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",m).setEnum("qp_action",n).setStringToStringMap("qp_instance_log_data",p).getURI();new(c("XAsyncRequest"))(r).send();q()})};g.setAction=j;g.setDialogActionsAndShow=k;g.logAction=i;g.logEvent=h}),null);
__d("JewelQPLogging",["QPRenderer"],(function a(b,c,d,e,f,g){var h=false,i=null,j=false;function k(){if(j)return;if(h&&i){j=true;c("QPRenderer").logEvent(i.promotion_id,"view",i.instance_log_data?i.instance_log_data:{})}}var l={onJewelOpened:function m(){h=true;k()},updateQPLogData:function m(n){i=n;k()}};f.exports=l}),null);
__d("RequestsJewelStore",["Arbiter","ArbiterMixin","ChannelConstants"],(function a(b,c,d,e,f,g){var h=babelHelpers["extends"]({},c("ArbiterMixin"),{_initialized:false,_count:0,_requestList:{},addFriendRequests:function i(j){Object.assign(this._requestList,j)},getRequestListKeys:function i(){return Object.keys(this._requestList)},removeRequest:function i(j){delete this._requestList[j]},getRequestCount:function i(j){return this.getRequestListKeys().length},decrementCount:function i(){this.setCount(Math.max(0,this._count-1))},setCount:function i(j){c("Arbiter").inform("jewel/count-updated",{jewel:"requests",count:j},c("Arbiter").BEHAVIOR_STATE)},setupListeners:function i(){if(this._initialized)return;this._initialized=true;c("Arbiter").subscribe("jewel/count-updated",function(j,k){k.jewel==="requests"&&this._updateCount(k.count)}.bind(this));c("Arbiter").subscribe(c("ChannelConstants").getArbiterType("jewel_requests_add"),function(j,k){return this._addRequest(k)}.bind(this));c("Arbiter").subscribe(c("ChannelConstants").getArbiterType("jewel_friending_notifs"),function(j,k){return this._addNotification(k)}.bind(this));c("Arbiter").subscribe(c("ChannelConstants").getArbiterType("jewel_requests_remove_old"),function(j,k){return this._removeOldRequest(k)}.bind(this));c("Arbiter").subscribe(c("ChannelConstants").getArbiterType("friend_requests_seen"),function(j,k){return this.setCount(0)}.bind(this))},_updateCount:function i(j){var k=this._count!==j;this._count=j;if(k)this.inform("countUpdated",j)},_addRequest:function i(j){if(!j)return;var k=j.obj,l=k.from,m=k.suggester,n=this._requestList[l];if(!n)this.setCount(this._count+1);var o=n?n.type:null,p=o===19&&!m;this.inform("addRequest",{shouldReplace:p,previousType:o})},_addNotification:function i(j){if(!j||j.obj.notif_type!=="friend_confirmed")return;this.inform("addNotification")},_removeOldRequest:function i(j){if(!j)return;var k=this._requestList[j.obj.from];if(!k)return;this.inform("removeOldRequest",k)}});f.exports=h}),null);
__d("XWebGigaboxxUpdateSeenTimeAsyncController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ajax/gigaboxx/endpoint/update_last_seen_time/",{folder:{type:"String",required:true}})}),null);
__d("RequestsJewelController",["invariant","Promise","Arbiter","AsyncRequest","AsyncSignal","CSS","DOM","DOMQuery","Event","EventProfiler","FriendRequestIHEventLogger","JewelQPLogging","MarauderLogger","Parent","PymkFunnelLogger","RequestsJewelStore","ScrollableArea","XUIBadge","XWebGigaboxxUpdateSeenTimeAsyncController","ge","getElementPosition","getViewportDimensions","requireWeak","throttle","TimeSlice"],(function a(b,c,d,e,f,g,h){var i=null;c("requireWeak")("FriendBrowserCheckboxController",function(o){return i=o});var j=31,k=600,l=30,m=160;n.getInstance=function(){"use strict";return this.$RequestsJewelController13};n.updateFromDOM=function(){"use strict";var o=this.getInstance();if(o)o.fromDom()};n.setupScroll=function(){"use strict";var o=this.getInstance();if(o)o.setupScroll()};n.setInitialHeight=function(){"use strict";var o=this.getInstance();if(o)o.updateHeight()};n.maybeLoadJewel=function(){"use strict";var o=this.getInstance();if(o)o.maybeLoadJewel()};n.setTitleBadgeCount=function(o){"use strict";if(this.$RequestsJewelController12)this.$RequestsJewelController12.setCount(o)};n.initTitleBadge=function(o,p){"use strict";if(!this.$RequestsJewelController12)c("Arbiter").subscribe(["FriendRequest/delete","FriendRequest/confirm","FriendSuggestion/accepting","FriendSuggestion/ignoring"],function(q,r){return this.decrementTitleBadgeCount(r)}.bind(this));this.$RequestsJewelController12=p};n.decrementTitleBadgeCount=function(o){"use strict";if(this.$RequestsJewelController12)this.$RequestsJewelController12.setCount(this.$RequestsJewelController12.getCount()-1)};n.isOpen=function(){"use strict";var o=this.getInstance();if(o)return o.$RequestsJewelController3();return false};n.create=function(o,p,q){"use strict";!this.$RequestsJewelController13||h(0);return this.$RequestsJewelController13=new n(o,p,q)};function n(o,p,q){"use strict";this.$RequestsJewelController3=p;this.$RequestsJewelController2=q;this.$RequestsJewelController1=o;this.$RequestsJewelController5=-1;this.$RequestsJewelController6=-1;this.$RequestsJewelController11=c("Promise").resolve(true);this.$RequestsJewelController9=c("throttle").acrossTransitionsWithBlocking(function(){return this.$RequestsJewelController14({log_impressions:true})}.bind(this),5e3);c("RequestsJewelStore").subscribe("addRequest",this.$RequestsJewelController15.bind(this));c("RequestsJewelStore").subscribe("addNotification",function(){return this.$RequestsJewelController16()}.bind(this));c("RequestsJewelStore").subscribe("removeOldRequest",this.$RequestsJewelController17.bind(this));c("RequestsJewelStore").setupListeners();this.setupScroll();this.$RequestsJewelController18();this.$RequestsJewelController19();this.$RequestsJewelController20()}n.prototype.fromDom=function(){"use strict";var o={};c("DOMQuery").scry(this.$RequestsJewelController1,"li.objectListItem").forEach(function(p){var q=p.getAttribute("id");if(q){var r=this.$RequestsJewelController21(q);if(r&&r.requester)o[r.requester]=r}}.bind(this));c("RequestsJewelStore").addFriendRequests(o);this.$RequestsJewelController22()};n.prototype.maybeLoadJewel=function(){"use strict";if(this.$RequestsJewelController10){this.$RequestsJewelController10(function(){this.openHandler()}.bind(this));this.$RequestsJewelController10=null}};n.prototype.updateHeight=function(){"use strict";var o=this.$RequestsJewelController23();if(o)o.style.height=this.$RequestsJewelController24()+"px"};n.prototype.markSeen=function(){"use strict";this.$RequestsJewelController11.done(function(){var o=c("DOMQuery").scry(this.$RequestsJewelController1,"li[id]")[0];new(c("AsyncSignal"))(c("XWebGigaboxxUpdateSeenTimeAsyncController").getURIBuilder().setString("folder",this.$RequestsJewelController2).getURI()).send()}.bind(this))};n.prototype.openHandler=function(){"use strict";if(!this.$RequestsJewelController7&&this.$RequestsJewelController3()){this.$RequestsJewelController7=true;c("EventProfiler").tagCurrentActiveInteractionsAs("FirstRequestsJewelOpen")}c("Arbiter").inform("requestsJewel/opened");var o=c("ge")("fbRequestsJewelLoading"),p=this.$RequestsJewelController23();if(!o&&!p)this.$RequestsJewelController10=c("TimeSlice").getGuardedContinuation("RequestsJewelController clickBeforeE2E continuation");else if(o)this.$RequestsJewelController9();else{var q=c("RequestsJewelStore").getRequestListKeys();if(q.length>0)new(c("AsyncRequest"))().setAllowCrossPageTransition(true).setURI("/friends/requests/log_impressions").setData({ids:q.join(","),ref:"jewel"}).send()}p&&c("ScrollableArea").poke(p);c("JewelQPLogging").onJewelOpened()};n.prototype.closeHandler=function(){"use strict";c("Arbiter").inform("requestsJewel/closed");c("DOMQuery").scry(this.$RequestsJewelController1,"li.jewelItemNew").forEach(function(o){c("CSS").removeClass(o,"jewelItemNew")})};n.prototype.setupScroll=function(){"use strict";var o=this.$RequestsJewelController23();if(o){this.$RequestsJewelController8=this.$RequestsJewelController25();this.$RequestsJewelController4=0;c("ScrollableArea").getInstance(o).subscribe("scroll",this.$RequestsJewelController26.bind(this));this.$RequestsJewelController27();this.$RequestsJewelController28()}};n.prototype.$RequestsJewelController18=function(){"use strict";c("Event").listen(this.$RequestsJewelController1,"submit",function(o){var p=c("Parent").byClass(o.getTarget(),"objectListItem");if(p){c("CSS").removeClass(p,"jewelItemNew");c("CSS").addClass(p,"jewelItemResponded")}})};n.prototype.$RequestsJewelController19=function(){"use strict";c("Event").listen(window,"resize",c("throttle").acrossTransitions(function(){this.updateHeight()}.bind(this)))};n.prototype.$RequestsJewelController20=function(){"use strict";c("Arbiter").subscribe("pymk-x-out",function(o,p){var q=p.location;if(q==="pymk_jewel_first_page"||q==="pymk_jewel")this.$RequestsJewelController27()}.bind(this))};n.prototype.$RequestsJewelController29=function(o){"use strict";var p=parseInt(o,10);return!isNaN(p)?p:null};n.prototype.$RequestsJewelController21=function(o){"use strict";var p=o.match(/^(\d+)_(\d+)/);if(!p)return null;return{requester:this.$RequestsJewelController29(p[1]),type:this.$RequestsJewelController29(p[2])}};n.prototype.$RequestsJewelController30=function(o,p){"use strict";if(o==null||p==null)return null;return o+"_"+p};n.prototype.$RequestsJewelController23=function(){"use strict";return c("DOMQuery").scry(this.$RequestsJewelController1,".uiScrollableArea")[0]};n.prototype.$RequestsJewelController25=function(){"use strict";return c("DOMQuery").scry(this.$RequestsJewelController1,".uiScrollableAreaWrap")[0]};n.prototype.$RequestsJewelController26=function(){"use strict";var o=c("DOMQuery").scry(this.$RequestsJewelController8,".uiMorePager").pop();if(o){var p=c("getElementPosition")(o).y,q=this.$RequestsJewelController23();if(p>0&&q)c("CSS").addClass(q,"contentAfter");var r=c("DOMQuery").find(o,"a");if(!r)return;var s=c("getElementPosition")(r).y;if(s===this.$RequestsJewelController4)return;var t=c("getElementPosition")(this.$RequestsJewelController8),u=t.y+t.height;if(s-300<u&&s>0){this.$RequestsJewelController4=s;var v=r.getAttribute("ajaxify");if(v)new(c("AsyncRequest"))(v).setRelativeTo(r).setStatusElement(c("Parent").byClass(r,"stat_elem")).send();else if(i)i.getInstance("jewel").showMore()}}this.$RequestsJewelController27();this.$RequestsJewelController28()};n.prototype.$RequestsJewelController27=function(){"use strict";if(!this.$RequestsJewelController8)return;var o=c("getElementPosition")(this.$RequestsJewelController8),p=o.y+o.height,q=c("DOMQuery").scry(this.$RequestsJewelController1,"li.friendBrowserListUnit"),r=q.length-1;while(r>this.$RequestsJewelController5){var s=c("getElementPosition")(q[r]),t=s.y,u=t+s.height;if(t>0&&u<=p)break;r-=1}var v=r;while(r>this.$RequestsJewelController5){var w=c("DOMQuery").find(q[r],"input.friendBrowserID"),x=parseInt(w.value,10),y=parseInt(q[r].getAttribute("data-signature"),10);c("PymkFunnelLogger").logImpression(x,y,"pymk_jewel");r--}this.$RequestsJewelController5=Math.max(this.$RequestsJewelController5,v)};n.prototype.$RequestsJewelController28=function(){"use strict";if(!this.$RequestsJewelController8)return;var o=c("getElementPosition")(this.$RequestsJewelController8),p=o.y+o.height,q=c("DOMQuery").scry(this.$RequestsJewelController1,"li.objectListItem"),r=q.length-1;while(r>this.$RequestsJewelController6){var s=c("getElementPosition")(q[r]),t=s.y,u=t+s.height;if(t>0&&u<=p)break;r-=1}var v=r;while(r>this.$RequestsJewelController6){var w=q[r].getAttribute("id");w=w.substring(0,w.length-6);c("MarauderLogger").log("request_seen","friend_request_waterfall",{request_id:w,request_location:"requests_jewel"});c("FriendRequestIHEventLogger").logImpression(w);r-=1}this.$RequestsJewelController6=Math.max(this.$RequestsJewelController6,v)};n.prototype.$RequestsJewelController14=function(){var o=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];"use strict";this.$RequestsJewelController11=new(c("Promise"))(function(p,q){var r=!c("ge")("fbRequestsJewelLoading");new(c("AsyncRequest"))().setURI("/ajax/requests/loader/").setData(babelHelpers["extends"]({},o,{reloadcontent:r})).setFinallyHandler(function(s){if(!s.getError())p(true);else q()}).send()})};n.prototype.$RequestsJewelController16=function(){"use strict";if(this.$RequestsJewelController3())return;this.$RequestsJewelController14()};n.prototype.$RequestsJewelController15=function(o,p){var q=p.shouldReplace,r=p.previousType;"use strict";if(!q&&(r||this.$RequestsJewelController3()))return;this.$RequestsJewelController14()};n.prototype.$RequestsJewelController17=function(o,p){var q=p.requester,r=p.type;"use strict";if(this.$RequestsJewelController3()||c("ge")("fbRequestsJewelLoading")!=null)return;var s=this.$RequestsJewelController30(q,r),t=s&&c("ge")(s);if(t){if(c("CSS").hasClass(t,"jewelItemNew"))c("RequestsJewelStore").decrementCount();if(!c("CSS").hasClass(t,"jewelItemResponded")){c("DOM").remove(t);c("RequestsJewelStore").removeRequest(q);this.$RequestsJewelController22()}}};n.prototype.$RequestsJewelController22=function(){"use strict";c("DOMQuery").scry(this.$RequestsJewelController1,"li.empty").forEach(function(o){c("CSS").conditionShow(o,c("RequestsJewelStore").getRequestCount()<=0)})};n.prototype.$RequestsJewelController24=function(){"use strict";return Math.min(Math.max(c("getViewportDimensions")().height-m,l),k)+j};n.$RequestsJewelController13=null;f.exports=n}),null);
__d("legacy:async-signal",["AsyncSignal"],(function a(b,c,d,e,f,g){b.AsyncSignal=c("AsyncSignal")}),3);
__d("EgoUnitSlideInsert",["csx","cx","Animation","CSS","DataStore","DOM","Ease","Event","Parent","TidyArbiterMixin","tidyEvent"],(function a(b,c,d,e,f,g,h,i){var j="sliding",k="EgoSlider/End",l=babelHelpers["extends"]({isSliding:function m(n){return c("DataStore").get(n,j)},runAfterSlide:function m(n,o){var p=c("tidyEvent")(l.subscribe(k,function(q,r){if(r===n){p&&p.unsubscribe();o()}}))},registerSlide:function m(n,o){c("Event").listen(n,"click",function(p){var q=c("Parent").bySelector(p.getTarget(),"._5cl_");if(!q)return;var r=c("Parent").byClass(n,"ego_unit"),s=0,t=c("Parent").byClass(r,"ego_unit_container"),u=c("DOM").scry(t,".ego_unit")[0];if(u===r)if(r.nextSibling){r.nextSibling.style.paddingTop="0px";r.nextSibling.style.borderTop="0px"}c("CSS").addClass(r,"_5cl-");c("DataStore").set(r,j,true);new(c("Animation"))(r).to("height",0).to("padding-top",s).to("padding-bottom",0).to("margin",0).from("opacity",1).to("opacity",0).ease(c("Ease").circOut).duration(300).checkpoint(1,function(){c("DOM").appendContent(t,r);c("DOM").prependContent(r,o);c("DataStore").remove(r,j)}).to("height",12).to("opacity",1).to("margin-bottom",10).duration(0).checkpoint(2,function(){l.inform(k,r)}).go()})}},c("TidyArbiterMixin"));f.exports=l}),null);
__d("NetEgo",["csx","Animation","Arbiter","CSS","DOM","EgoUnitSlideInsert","PageLikeConstants","Parent","URI","ge"],(function a(b,c,d,e,f,g,h){var i={setup:function j(k){c("Arbiter").subscribe([c("PageLikeConstants").LIKED,"FriendRequest/sending"],function(l,m){if(k==m.profile_id&&m.origin=="hovercard"||k==m.uid){var n=c("ge")(document.body,".ego_unit_container");if(n){var o=c("DOM").scry(n,".ego_unit"),p=o.length;for(var q=0;q<p;q++){var r=o[q].getAttribute("data-ego-fbid");if(r==k){var s=c("DOM").scry(o[q],".ego_action a")[0];if(s)s.click();break}}}}})},updateXids:function j(k,l){if(k.length==0&&l.length==0)return;var m=function m(w){return function(x){var o=x.getAttribute(w);if(!o)return false;var p=new(c("URI"))(o).getQueryData();return!!p.xids}},n=c("DOM").scry(document.body,".ego_section a");n=n.filter(m("ajaxify"));if(n.length==0)return;var o=new(c("URI"))(n[0].getAttribute("ajaxify")),p=o.getQueryData();if(!p.xids)return;var q=null;try{q=JSON.parse(p.xids)}catch(r){return}for(var s=0;s<l.length;++s)q[l[s]]=1;var t=JSON.stringify(q),u=function u(w,x){o=new(c("URI"))(w.getAttribute(x));p=o.getQueryData();p.xids=t;o.setQueryData(p);w.setAttribute(x,o.toString())};for(s=0;s<n.length;++s)u(n[s],"ajaxify");var v=c("DOM").scry(document.body,".ego_unit form");v=v.filter(m("action"));for(s=0;s<v.length;++s)u(v[s],"action")},replaceUnit:function j(k,l,m,n){i.replaceUnitCheckParent(k,l,m,n,"")},replaceUnitCheckParent:function j(k,l,m,n,o){var p=c("Parent").byClass(k,"ego_unit_container");if(p&&c("EgoUnitSlideInsert").isSliding(k)){var q=c("DOM").appendContent(p,l);q.forEach(c("CSS").hide);c("EgoUnitSlideInsert").runAfterSlide(k,i._replaceUnitElement.bind(null,k,q,o))}else i._replaceUnit(k,l,m,n,o)},_replaceUnit:function j(k,l,m,n,o){var p=c("DOM").insertAfter(k,l);p.forEach(c("CSS").hide);if(n!==undefined&&n!==null)setTimeout(function(){i._replaceUnitFadeout(k,p,m,o)},n);else i._replaceUnitFadeout(k,p,m,o)},_replaceUnitFadeout:function j(k,l,m,n){if(m)new(c("Animation"))(k).from("opacity",1).to("opacity",0).duration(m).checkpoint(1,function(){i._replaceUnitElement(k,l,n)}).go();else i._replaceUnitElement(k,l,n)},_replaceUnitElement:function j(k,l,m){var n=c("CSS").hasClass(k,"ego_unit")?k.parentNode:null;if(n&&n.tagName==="LI")n=c("DOM").scry(k.parentNode,"^ul")[0];c("DOM").remove(k);if(l.length)l.forEach(c("CSS").show);c("Arbiter").inform("netego_replacedUnit",{serializedData:m,numUnitsRemained:n.childNodes.length});i.clearHeader()},clearHeader:function j(){var k=c("DOM").scry(document.body,".ego_column"),l=[];for(var m=0;m<k.length;++m)l=l.concat(c("DOM").scry(k[m],".uiHeader"));for(m=0;m<l.length;++m){var n=l[m].nextSibling,o=c("DOM").find(n,"._2xq");if(!o)o=n;if(!o||o.childNodes.length===0)c("DOM").remove(l[m]);else if(o.childNodes.length===1){var p=o.childNodes[0];if(c("CSS").hasClass(p,"ego_appended_units")&&p.childNodes.length===0)c("DOM").remove(l[m])}}}};f.exports=i}),null);
__d("Slideshow",["csx","cx","ArbiterMixin","CSS","DOM","Event","Locale","Parent","getActiveElement","mixin","shield"],(function a(b,c,d,e,f,g,h,i){var j,k;j=babelHelpers.inherits(l,c("mixin")(c("ArbiterMixin")));k=j&&j.prototype;function l(m,n){"use strict";k.constructor.call(this);this.informAndResetAutoPlay=function(){this.resetAutoplay();if(this._config.autoplay)this.inform("reset_autoplay")}.bind(this);this.informAndStopAutoplay=function(){this.stopAutoplay();this.inform("stop_autoplay")}.bind(this);this._root=m;this._config=n;this._currentIndex=0;this._animating=false;this._autoplayTimer=null;this._autoplayTimeout=n.autoplayTimeout;this._init()}l.prototype.getNode=function(){"use strict";return this._root};l.prototype.getIndex=function(){"use strict";return this._currentIndex};l.prototype.getNumItems=function(){"use strict";return this._items.length};l.prototype.getNextArrow=function(){"use strict";if(this._config.arrows)return c("DOM").find(this._root,"a._2xw");return null};l.prototype.getPrevArrow=function(){"use strict";if(this._config.arrows)return c("DOM").find(this._root,"a._2xx");return null};l.prototype.page=function(m){"use strict";if(typeof m==="undefined")m="next";if(m==="next"){if(this._config.wrap||this.getIndex()<this.getNumItems()-1)this._animateTo((this.getIndex()+1)%this.getNumItems(),this.getIndex())}else if(m==="prev"){if(this._config.wrap||this.getIndex()>0){var n=(this.getNumItems()+this.getIndex()-1)%this.getNumItems();this._animateTo(n,this.getIndex())}}};l.prototype.pageTo=function(m){"use strict";this._animateTo(m,this.getIndex(),c("shield")(this._setCurrent,this,m))};l.prototype.insert=function(m,n){"use strict";if(m>this._currentIndex)c("DOM").insertAfter(this._items[m-1],n);else{c("DOM").insertBefore(this._items[m],n);this._currentIndex++}this._items.splice(m,0,n);this._updateArrowState();this.inform("items_updated")};l.prototype.push=function(m){"use strict";this.insert(this._items.length,m)};l.prototype.remove=function(m){"use strict";if(m<0||m>=this._items.length)return;c("DOM").remove(this._items[m]);this._items=c("DOM").scry(this._container,"li._2xr");if(m===this._currentIndex&&this._items.length){var n=m%this._items.length;this._conditionFade(this._items[n],true,null);this._setCurrent(n)}this.inform("items_updated")};l.prototype._init=function(){"use strict";this._container=c("DOM").find(this._root,"ul._2xq");this._items=c("DOM").scry(this._container,"li._2xr");if(this._config.arrows){c("Event").listen(this._root,"click",this._clickListener.bind(this));this._arrowNext=c("DOM").find(this._root,"a._2xw");this._arrowPrev=c("DOM").find(this._root,"a._2xx")}if(this._config.autoplay){if(this._config.autoplaycontrol){c("Event").listen(this._root,"mouseenter",this.informAndStopAutoplay);c("Event").listen(this._root,"mouseleave",this.informAndResetAutoPlay)}this.resetAutoplay()}this.subscribe(["page_start","page_end"],function(m,n){c("CSS").conditionClass(this._root,"_2xm",m==="page_start")}.bind(this))};l.prototype._clickListener=function(event){"use strict";var m=event.getTarget(),n=c("Parent").byTag(m,"a");if(n&&!c("CSS").matchesSelector(n,"._2xo"))if(c("CSS").matchesSelector(n,"._2xw")){this.page("next");event.preventDefault()}else if(c("CSS").matchesSelector(n,"._2xx")){this.page("prev");event.preventDefault()}};l.prototype._updateArrowState=function(){"use strict";if(!this._config.arrows)return;c("CSS").conditionClass(this._arrowNext,"_2xo",this._items.length===1);c("CSS").conditionClass(this._arrowPrev,"_2xo",this._items.length===1)};l.prototype._animateTo=function(m){var n=arguments.length<=1||arguments[1]===undefined?null:arguments[1];"use strict"};l.prototype._setCurrent=function(m){"use strict";var n=this._items[this._currentIndex];n&&c("CSS").removeClass(n,"_2xn");c("CSS").addClass(this._items[m],"_2xn");c("CSS").removeClass(this._root,"_2xm");var o=n&&c("DOM").scry(n,"a").some(function(q){return q==c("getActiveElement")()});if(o){var p=c("DOM").scry(this._items[m],"a");if(p[0])p[0].focus()}this._currentIndex=m;this._animating=false;this.inform("page_end",m)};l.prototype.startAutoplay=function(m){"use strict";this._config.autoplay=true;this._autoplayTimeout=m;this.resetAutoplay()};l.prototype.resetAutoplay=function(){"use strict";if(this._config.autoplay){clearTimeout(this._autoplayTimer);this._autoplayTimer=setTimeout(this._autoplay.bind(this),this._autoplayTimeout)}};l.prototype.stopAutoplay=function(){"use strict";clearTimeout(this._autoplayTimer);this._autoplayTimer=null};l.prototype._autoplay=function(){"use strict";this.resetAutoplay();if(this._items.length>1)this.page()};l.prototype.setAutoplayTimeout=function(m){"use strict";this._autoplayTimeout=m};f.exports=l}),null);
__d("VideoPauseWhenBackgrounded",["invariant","Event","SubscriptionsHandler","VideoPlayerReason","VideoPlayerStates","Visibility"],(function a(b,c,d,e,f,g,h){"use strict";function i(){this.$VideoPauseWhenBackgrounded1=new(c("SubscriptionsHandler"))();this.$VideoPauseWhenBackgrounded3=false}i.prototype.enable=function(j){!this.$VideoPauseWhenBackgrounded2||h(0);this.$VideoPauseWhenBackgrounded1.engage();this.$VideoPauseWhenBackgrounded2=j;this.$VideoPauseWhenBackgrounded1.addSubscriptions(c("Event").listen(window,"blur",this.$VideoPauseWhenBackgrounded4.bind(this)),c("Event").listen(window,"focus",this.$VideoPauseWhenBackgrounded5.bind(this)),c("Visibility").addListener(c("Visibility").HIDDEN,this.$VideoPauseWhenBackgrounded4.bind(this)),c("Visibility").addListener(c("Visibility").VISIBLE,this.$VideoPauseWhenBackgrounded5.bind(this)))};i.prototype.disable=function(){this.$VideoPauseWhenBackgrounded1.release();this.$VideoPauseWhenBackgrounded2=null};i.prototype.$VideoPauseWhenBackgrounded4=function(){this.pauseVideo(c("VideoPlayerReason").PAGE_VISIBILITY)};i.prototype.$VideoPauseWhenBackgrounded5=function(){this.playVideo(c("VideoPlayerReason").PAGE_VISIBILITY)};i.prototype.playVideo=function(j){var k=this.$VideoPauseWhenBackgrounded2;k||h(0);if(k.isState(c("VideoPlayerStates").PAUSED)&&this.$VideoPauseWhenBackgrounded3)k.play(j);this.$VideoPauseWhenBackgrounded3=false};i.prototype.pauseVideo=function(j){var k=this.$VideoPauseWhenBackgrounded2;k||h(0);if(k.isState(c("VideoPlayerStates").PLAYING)){k.pause(j);this.$VideoPauseWhenBackgrounded3=true}};f.exports=i}),null);
__d("VideoCTAEndscreen",["cx","Arbiter","AttachmentRelatedShareConstants","CSS","Event","Focus","SubscriptionsHandler","VideoCTALoggingConfig","VideoPlayerReason","VideoPlayerLoggerEvent","logVideosClickTracking"],(function a(b,c,d,e,f,g,h){function i(j,k){"use strict";this.$VideoCTAEndscreen1=j;this.$VideoCTAEndscreen2=k.endscreenElement;this.$VideoCTAEndscreen3=k.replayElement;this.$VideoCTAEndscreen4=k.ctaElement;this.$VideoCTAEndscreen5=k.isPausescreen;this.$VideoCTAEndscreen6=new(c("SubscriptionsHandler"))();this.$VideoCTAEndscreen6.addSubscriptions(c("Event").listen(this.$VideoCTAEndscreen3,"click",function(){return this.$VideoCTAEndscreen7()}.bind(this)),j.addListener("beginPlayback",function(){return this.$VideoCTAEndscreen8()}.bind(this)),j.addListener("VideoChannelController/exitChannel",function(){if(j.isState("finished"))this.$VideoCTAEndscreen9()}.bind(this)));if(this.$VideoCTAEndscreen4)this.$VideoCTAEndscreen6.addSubscriptions(c("Event").listen(this.$VideoCTAEndscreen4,"click",function(){return this.$VideoCTAEndscreen10()}.bind(this)));if(this.$VideoCTAEndscreen5)this.$VideoCTAEndscreen6.addSubscriptions(j.addListener("pausePlayback",function(){return this.$VideoCTAEndscreen11()}.bind(this)));else this.$VideoCTAEndscreen6.addSubscriptions(j.addListener("finishPlayback",function(){return this.$VideoCTAEndscreen9()}.bind(this)))}i.prototype.$VideoCTAEndscreen7=function(){"use strict";var j={reason:c("VideoPlayerReason").USER};this.$VideoCTAEndscreen1.clickVideo();if(this.$VideoCTAEndscreen1.isState("paused")){if(c("VideoCTALoggingConfig").shouldLogUnpausedEvent)this.$VideoCTAEndscreen1.logEvent(c("VideoPlayerLoggerEvent").UNPAUSED,j)}else if(this.$VideoCTAEndscreen1.isState("finished"))this.$VideoCTAEndscreen1.logEvent(c("VideoPlayerLoggerEvent").REPLAYED,j);var k=this.$VideoCTAEndscreen1.getVideoNode();c("logVideosClickTracking")(k);c("Focus").set(k)};i.prototype.$VideoCTAEndscreen10=function(){"use strict";c("Arbiter").inform(c("AttachmentRelatedShareConstants").FBVIDEO_CLICK,{attachment:this.$VideoCTAEndscreen1.getRootNode(),fbvideo_id:this.$VideoCTAEndscreen1.getVideoID()})};i.prototype.$VideoCTAEndscreen9=function(){"use strict";if(!this.$VideoCTAEndscreen1.getIsInChannel())this.$VideoCTAEndscreen11()};i.prototype.$VideoCTAEndscreen11=function(){"use strict";c("CSS").addClass(this.$VideoCTAEndscreen2,"_1qbf")};i.prototype.$VideoCTAEndscreen8=function(){"use strict";c("CSS").removeClass(this.$VideoCTAEndscreen2,"_1qbf")};f.exports=i}),null);
__d("XFeedEgoImpressionLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ego/feed/logging/impression/",{ego_id:{type:"Int",required:true},qid:{type:"Int",required:true},mf_story_key:{type:"Int",required:true},uid:{type:"Int"}})}),null);