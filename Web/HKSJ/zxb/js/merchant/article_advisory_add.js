/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'date97':'plugins/My97DatePicker/WdatePicker',
		'datepick':'widgets/datepick',
		'cookie':'plugins/cookie'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'datepick':{
			deps:['jquery','date97']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','date97','rule','commonfn','validform','cookie','common','datepick'],
function($,undefined,undefined,Rule,CommonFn,undefined,undefined,Common,undefined) {
	$(function() {
		
			
		
			//页面元素获取
			var $article_advisoryform=$('#article_advisoryform'),
					$article_title=$('#article_title'),
					$article_createtime=$('#article_createtime'),
					$article_content=$('#article_content'),
					validobj=null,
					dia=dialog();
			
			//初始化查询
			(function(){
					var curid=Common.getID('article_advisonry');
					if(curid!=''){

								//to do
								//初始化查询是否为更新对象
								$.ajax({
											url:'../../json/merchant/article_advisory.json',
											type:'post',
											dataType:"json",
											data:'id='+curid,
											success: function(res){
													if(res.action){
															var list=res.articleList;
															$article_title.val(list['title']);
															setTimeout(function(){
																$article_createtime.val(list['datetime']);
															},100);
															$article_content.val(list['content']);
													}
											}
								});
					}
			}());
			
		
			//时间日历对象调用
			$.datePick([$article_createtime],true);
		
			
			
			//校验规则
			var ruleobj=[{
						ele:$article_title,
						datatype:"*1-100",
						nullmsg: "文章标题不能为空",
						errormsg: "文章标题不能超过100个字符",
						sucmsg: ""
					},{
							ele:$article_createtime,
							datatype:"*",
							nullmsg: "发布时间不能为空",
							errormsg: "发布时间只能为数字",
							sucmsg: ""
					},{
							ele:$article_content,
							datatype:"*",
							nullmsg: "正文活动不能为空",
							errormsg: "正文活动信息不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					article_title:'',
					article_createtime:'',
					article_content:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$article_advisoryform.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){	
												//to do 
												
																		
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								//window.location.reload();
							}
						},3000);
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			

	});
});
