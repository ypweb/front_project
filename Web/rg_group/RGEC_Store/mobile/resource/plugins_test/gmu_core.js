/*core
gmu module*/
var gmu=gmu||{version:'@version',$:window.Zepto,staticCall:(function($){var proto=$.fn,slice=[].slice,instance=$();instance.length=1;return function(item,fn){instance[0]=item;return proto[fn].apply(instance,slice.call(arguments,2))}})(Zepto)};
/*core
event module*/
(function(gmu,$){var slice=[].slice,separator=/\s+/,returnFalse=function(){return false},returnTrue=function(){return true};function eachEvent(events,callback,iterator){(events||'').split(separator).forEach(function(type){iterator(type,callback)})}function matcherFor(ns){return new RegExp('(?:^| )'+ns.replace(' ',' .* ?')+'(?: |$)')}function parse(name){var parts=(''+name).split('.');return{e:parts[0],ns:parts.slice(1).sort().join(' ')}}function findHandlers(arr,name,callback,context){var matcher,obj;obj=parse(name);obj.ns&&(matcher=matcherFor(obj.ns));return arr.filter(function(handler){return handler&&(!obj.e||handler.e===obj.e)&&(!obj.ns||matcher.test(handler.ns))&&(!callback||handler.cb===callback||handler.cb._cb===callback)&&(!context||handler.ctx===context)})}function Event(type,props){if(!(this instanceof Event)){return new Event(type,props)}props&&$.extend(this,props);this.type=type;return this}Event.prototype={isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,preventDefault:function(){this.isDefaultPrevented=returnTrue},stopPropagation:function(){this.isPropagationStopped=returnTrue}};gmu.event={on:function(name,callback,context){var me=this,set;if(!callback){return this}set=this._events||(this._events=[]);eachEvent(name,callback,function(name,callback){var handler=parse(name);handler.cb=callback;handler.ctx=context;handler.ctx2=context||me;handler.id=set.length;set.push(handler)});return this},one:function(name,callback,context){var me=this;if(!callback){return this}eachEvent(name,callback,function(name,callback){var once=function(){me.off(name,once);return callback.apply(context||me,arguments)};once._cb=callback;me.on(name,once,context)});return this},off:function(name,callback,context){var events=this._events;if(!events){return this}if(!name&&!callback&&!context){this._events=[];return this}eachEvent(name,callback,function(name,callback){findHandlers(events,name,callback,context).forEach(function(handler){delete events[handler.id]})});return this},trigger:function(evt){var i=-1,args,events,stoped,len,ev;if(!this._events||!evt){return this}typeof evt==='string'&&(evt=new Event(evt));args=slice.call(arguments,1);evt.args=args;args.unshift(evt);events=findHandlers(this._events,evt.type);if(events){len=events.length;while(++i<len){if((stoped=evt.isPropagationStopped())||false===(ev=events[i]).cb.apply(ev.ctx2,args)){stoped||(evt.stopPropagation(),evt.preventDefault());break}}}return this}};gmu.Event=Event})(gmu,gmu.$);
/*core
widget module*/
(function(gmu,$,undefined){var slice=[].slice,toString=Object.prototype.toString,blankFn=function(){},staticlist=['options','template','tpl2html'],record=(function(){var data={},id=0,ikey='_gid';return function(obj,key,val){var dkey=obj[ikey]||(obj[ikey]=++id),store=data[dkey]||(data[dkey]={});val!==undefined&&(store[key]=val);val===null&&delete store[key];return store[key]}})(),event=gmu.event;function isPlainObject(obj){return toString.call(obj)==='[object Object]'}function eachObject(obj,iterator){obj&&Object.keys(obj).forEach(function(key){iterator(key,obj[key])})}function parseData(data){try{data=data==='true'?true:data==='false'?false:data==='null'?null:+data+''===data?+data:/(?:\{[\s\S]*\}|\[[\s\S]*\])$/.test(data)?JSON.parse(data):data}catch(ex){data=undefined}return data}function getDomOptions(el){var ret={},attrs=el&&el.attributes,len=attrs&&attrs.length,key,data;while(len--){data=attrs[len];key=data.name;if(key.substring(0,5)!=='data-'){continue}key=key.substring(5);data=parseData(data.value);data===undefined||(ret[key]=data)}return ret}function zeptolize(name){var key=name.substring(0,1).toLowerCase()+name.substring(1),old=$.fn[key];$.fn[key]=function(opts){var args=slice.call(arguments,1),method=typeof opts==='string'&&opts,ret,obj;$.each(this,function(i,el){obj=record(el,name)||new gmu[name](el,isPlainObject(opts)?opts:undefined);if(method==='this'){ret=obj;return false}else if(method){if(!$.isFunction(obj[method])){throw new Error('组件没有此方法：'+method);}ret=obj[method].apply(obj,args);if(ret!==undefined&&ret!==obj){return false}ret=undefined}});return ret!==undefined?ret:this};$.fn[key].noConflict=function(){$.fn[key]=old;return this}}function loadOption(klass,opts){var me=this;if(klass.superClass){loadOption.call(me,klass.superClass,opts)}eachObject(record(klass,'options'),function(key,option){option.forEach(function(item){var condition=item[0],fn=item[1];if(condition==='*'||($.isFunction(condition)&&condition.call(me,opts[key]))||condition===opts[key]){fn.call(me)}})})}function loadPlugins(klass,opts){var me=this;if(klass.superClass){loadPlugins.call(me,klass.superClass,opts)}eachObject(record(klass,'plugins'),function(opt,plugin){if(opts[opt]===false){return}eachObject(plugin,function(key,val){var oringFn;if($.isFunction(val)&&(oringFn=me[key])){me[key]=function(){var origin=me.origin,ret;me.origin=oringFn;ret=val.apply(me,arguments);origin===undefined?delete me.origin:(me.origin=origin);return ret}}else{me[key]=val}});plugin._init.call(me)})}function mergeObj(){var args=slice.call(arguments),i=args.length,last;while(i--){last=last||args[i];isPlainObject(args[i])||args.splice(i,1)}return args.length?$.extend.apply(null,[true,{}].concat(args)):last}function bootstrap(name,klass,uid,el,options){var me=this,opts;if(isPlainObject(el)){options=el;el=undefined}options&&options.el&&(el=$(options.el));el&&(me.$el=$(el),el=me.$el[0]);opts=me._options=mergeObj(klass.options,getDomOptions(el),options);me.template=mergeObj(klass.template,opts.template);me.tpl2html=mergeObj(klass.tpl2html,opts.tpl2html);me.widgetName=name.toLowerCase();me.eventNs='.'+me.widgetName+uid;me._init(opts);me._options.setup=(me.$el&&me.$el.parent()[0])?true:false;loadOption.call(me,klass,opts);loadPlugins.call(me,klass,opts);me._create();me.trigger('ready');el&&record(el,name,me)&&me.on('destroy',function(){record(el,name,null)});return me}function createClass(name,object,superClass){if(typeof superClass!=='function'){superClass=gmu.Base}var uuid=1,suid=1;function klass(el,options){if(name==='Base'){throw new Error('Base类不能直接实例化');}if(!(this instanceof klass)){return new klass(el,options)}return bootstrap.call(this,name,klass,uuid++,el,options)}$.extend(klass,{register:function(name,obj){var plugins=record(klass,'plugins')||record(klass,'plugins',{});obj._init=obj._init||blankFn;plugins[name]=obj;return klass},option:function(option,value,method){var options=record(klass,'options')||record(klass,'options',{});options[option]||(options[option]=[]);options[option].push([value,method]);return klass},inherits:function(obj){return createClass(name+'Sub'+suid++,obj,klass)},extend:function(obj){var proto=klass.prototype,superProto=superClass.prototype;staticlist.forEach(function(item){obj[item]=mergeObj(superClass[item],obj[item]);obj[item]&&(klass[item]=obj[item]);delete obj[item]});eachObject(obj,function(key,val){if(typeof val==='function'&&superProto[key]){proto[key]=function(){var $super=this.$super,ret;this.$super=function(){var args=slice.call(arguments,1);return superProto[key].apply(this,args)};ret=val.apply(this,arguments);$super===undefined?(delete this.$super):(this.$super=$super);return ret}}else{proto[key]=val}})}});klass.superClass=superClass;klass.prototype=Object.create(superClass.prototype);klass.extend(object);return klass}gmu.define=function(name,object,superClass){gmu[name]=createClass(name,object,superClass);zeptolize(name)};gmu.isWidget=function(obj,klass){klass=typeof klass==='string'?gmu[klass]||blankFn:klass;klass=klass||gmu.Base;return obj instanceof klass};gmu.Base=createClass('Base',{_init:blankFn,_create:blankFn,getEl:function(){return this.$el},on:event.on,one:event.one,off:event.off,trigger:function(name){var evt=typeof name==='string'?new gmu.Event(name):name,args=[evt].concat(slice.call(arguments,1)),opEvent=this._options[evt.type],$el=this.getEl();if(opEvent&&$.isFunction(opEvent)){false===opEvent.apply(this,args)&&(evt.stopPropagation(),evt.preventDefault())}event.trigger.apply(this,args);$el&&$el.triggerHandler(evt,(args.shift(),args));return this},tpl2html:function(subpart,data){var tpl=this.template;tpl=typeof subpart==='string'?tpl[subpart]:((data=subpart),tpl);return data||~tpl.indexOf('<%')?$.parseTpl(tpl,data):tpl},destroy:function(){this.$el&&this.$el.off(this.eventNs);this.trigger('destroy');this.off();this.destroyed=true}},Object);$.ui=gmu})(gmu,gmu.$);