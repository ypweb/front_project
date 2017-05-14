(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.226:8082/mall-buzhubms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				detail_power=public_tool.getKeyPower('bzw-goods-details',powermap),
				audit_power=public_tool.getKeyPower('bzw-audit-goods',powermap);



			/*dom引用和相关变量定义*/
			var $admin_list_wrap=$('#admin_list_wrap')/*表格*/,
				$admin_batchlist_wrap=$('#admin_batchlist_wrap'),
				module_id='bzw-goods-audit'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					zIndex:2000,
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				$admin_page_wrap=$('#admin_page_wrap'),
				goods_params={
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				$show_audit_wrap=$('#show_audit_wrap'),
				$show_audit_header=$('#show_audit_header'),
				admin_audit_form=document.getElementById('admin_audit_form'),
				$audit_radio_tip=$('#audit_radio_tip'),
				$audit_radio_wrap=$('#audit_radio_wrap'),
				$admin_id=$('#admin_id'),
				$audit_action=$('#audit_action'),
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();

			/*查询对象*/
			var $search_name=$('#search_name'),
				$search_auditStatus=$('#search_auditStatus'),
				$search_providerName=$('#search_providerName'),
				$search_gtione=$('#search_gtione'),
				$search_gtitwo=$('#search_gtitwo'),
				$search_gtithree=$('#search_gtithree'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear'),
				goodstypeid='';


			/*查看详情*/
			var $goods_detail_wrap=$('#goods_detail_wrap'),
				$admin_wholesale_price_thead=$('#admin_wholesale_price_thead'),
				$admin_wholesale_price_list=$('#admin_wholesale_price_list'),
				$admin_wholesale_price_tip=$('#admin_wholesale_price_tip'),
				wholesale_price_theadstr='<tr>\
					<th>颜色</th>\
					<th>规格</th>\
					<th>库存</th>\
					<th>批发价</th>\
					<th>建议零售价</th>\
					<th>供应商价</th>\
					<th>价格显示在首页</th>\
					<th>操作</th>\
				</tr>',
				attr_map={},
				history_data={},
				listone={},
				listtwo={},
				$admin_oldprice_btn=$('#admin_oldprice_btn'),
				$admin_oldprice_show=$('#admin_oldprice_show');


			/*轮播图引用*/
			var $admin_slide_image=$('#admin_slide_image'),
				$admin_slide_btnl=$('#admin_slide_btnl'),
				$admin_slide_btnr=$('#admin_slide_btnr'),
				$admin_slide_tool=$('#admin_slide_tool'),
				slide_config={
					$slide_tool:$admin_slide_tool,
					$image:$admin_slide_image,
					$btnl:$admin_slide_btnl,
					$btnr:$admin_slide_btnr,
					active:'admin-slide-active',
					len:5
				};


			/*批量配置参数*/
			var $admin_batchitem_btn=$('#admin_batchitem_btn'),
				$admin_batchitem_show=$('#admin_batchitem_show'),
				$admin_batchitem_check=$('#admin_batchitem_check'),
				$admin_batchitem_action=$('#admin_batchitem_action'),
				batchItem=new public_tool.BatchItem();

			/*批量初始化*/
			batchItem.init({
				$batchtoggle:$admin_batchitem_btn,
				$batchshow:$admin_batchitem_show,
				$checkall:$admin_batchitem_check,
				$action:$admin_batchitem_action,
				$listwrap:$admin_batchlist_wrap,
				setSure:setSure,
				powerobj:{
					'audit':audit_power
				},
				fn:function (type) {
					/*批量操作*/
					batchGoods({
						action:type
					});
				}
			});


			/*列表请求配置*/
			var goods_page={
					page:1,
					pageSize:10,
					total:0
				},
				goods_config={
					$admin_list_wrap:$admin_list_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"http://10.0.5.226:8082/mall-buzhubms-api/goods/list",
							dataType:'JSON',
							method:'post',
							dataSrc:function ( json ) {
								var code=parseInt(json.code,10);
								if(code!==0){
									if(code===999){
										/*清空缓存*/
										public_tool.loginTips(function () {
											public_tool.clear();
											public_tool.clearCacheData();
										});
									}
									console.log(json.message);
									return [];
								}
								var result=json.result;
								if(typeof result==='undefined'){
									return [];
								}
								/*设置分页*/
								goods_page.page=result.page;
								goods_page.pageSize=result.pageSize;
								goods_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:goods_page.pageSize,
									total:goods_page.total,
									pageNumber:goods_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=goods_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										goods_config.config.ajax.data=param;
										getColumnData(goods_page,goods_config);
									}
								});
								return result?result.list||[]:[];
							},
							data:{
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								grade:decodeURIComponent(logininfo.param.grade),
								token:decodeURIComponent(logininfo.param.token),
								auditStatus:$search_auditStatus.val(),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[4, "desc" ]],
						columns: [
							{
								"data":"id",
								"orderable" :false,
								"searchable" :false,
								"render":function(data, type, full, meta ){
									return '<input value="'+data+'" data-auditstatus="'+full.auditStatus+'" name="goodsID" type="checkbox" />';
								}
							},
							{
								"data":"gcode"
							},
							{
								"data":"name"
							},
							{
								"data":"providerName"
							},
							{
								"data":"goodsTypeName"
							},
							{
								"data":"sort"
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"仓库",
											1:"上架",
											2:"下架",
											3:"删除",
											4:"待审核"
										},
										str='';

									if(stauts===3){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}else if(stauts===0){
										str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
									}else if(stauts===4){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='',
										temp_audit=parseInt(full.auditStatus,10);

									if(temp_audit===0||temp_audit===2){
										/*待审核，审核失败*/
										if(audit_power){
											btns+='<span  data-action="audit" data-id="'+id+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
												<i class="fa-hand-o-up"></i>\
												<span>审核</span>\
											</span>';
										}
										if(detail_power){
											btns+='<span data-action="edit" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-edit"></i>\
													<span>编辑</span>\
												</span>';
										}
									}
									return btns;
								}
							}
						]
					}
				};


			/*查询分类并绑定分类查询*/
			$.each([$search_gtione,$search_gtitwo,$search_gtithree],function(){
				var selector=this.selector;
				/*初始化查询一级分类*/
				if(selector.indexOf('one')!==-1){
					getGoodsTypes('','one',true);
				}
				this.on('change',function(){
					var $option=$(this).find(':selected'),
						value=this.value,
						hasub=false;
					if(selector.indexOf('one')!==-1){
						if(value===''){
							$search_gtitwo.html('');
							$search_gtithree.html('');
							goodstypeid='';
							return false;
						}
						hasub=$option.attr('data-hassub');
						goodstypeid=value;
						if(hasub==='true'){
							getGoodsTypes(value,'two');
							$search_gtithree.html('');
						}else{
							$search_gtitwo.html('');
							$search_gtithree.html('');
						}
					}else if(selector.indexOf('two')!==-1){
						if(value===''){
							$search_gtithree.html('');
							goodstypeid=$search_gtione.find(':selected').val();
							return false;
						}
						hasub=$option.attr('data-hassub');
						goodstypeid=value;
						if(hasub==='true'){
							getGoodsTypes(value,'three');
						}else{
							$search_gtithree.html('');
						}
					}else if(selector.indexOf('three')!==-1){
						if(value===''){
							goodstypeid=$search_gtitwo.find(':selected').val();
							return false;
						}
						goodstypeid=value;
					}
				});
			});
			

			/*初始化请求*/
			getColumnData(goods_page,goods_config);


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_name,$search_providerName,$search_auditStatus,$search_gtione,$search_gtitwo,$search_gtithree],function(){
					var selector=this.selector;
					if(selector.indexOf('auditStatus')!==-1){
						/*状态非空*/
						this.find('option:first').prop({
							"selected":true
						});
					}else{
						this.val('');
					}
				});
				/*清空分类值*/
				goodstypeid='';
			});
			$admin_search_clear.trigger('click');



			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},goods_config.config.ajax.data);

				$.each([$search_name,$search_providerName,$search_auditStatus],function(){
					var text=this.val(),
						selector=this.selector.slice(1),
						key=selector.split('_');

					if(text===""){
						if(typeof data[key[1]]!=='undefined'){
							delete data[key[1]];
						}
					}else{
						data[key[1]]=text;
					}
				});
				/*分类处理*/
				if(goodstypeid===''){
					delete data['goodsTypeId'];
				}else{
					data['goodsTypeId']=goodstypeid;
				}
				goods_config.config.ajax.data= $.extend(true,{},data);
				getColumnData(goods_page,goods_config);
			});



			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$admin_list_wrap.delegate('span','click',function(e){
				e.stopPropagation();
				e.preventDefault();

				var target= e.target,
					$this,
					id,
					action,
					$tr;

				//适配对象
				if(target.className.indexOf('btn')!==-1){
					$this=$(target);
				}else{
					$this=$(target).parent();
				}
				$tr=$this.closest('tr');
				id=$this.attr('data-id');
				action=$this.attr('data-action');

				/*修改,编辑操作*/
				if(action==='audit'){
					/*清除批量选中*/
					batchItem.filterData(id);
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					showAudit({
						id:id,
						type:'base'
					},$tr);
				}else if(action==='edit'){
					/*查看并编辑*/
					showDetail(id,$tr);
				}
			});


			/*绑定关闭详情*/
			$.each([$show_audit_wrap,$goods_detail_wrap],function () {
				var selector=this.selector,
					isaudit=selector.indexOf('audit')!==-1?true:false;
				this.on('hide.bs.modal',function(){
					if(operate_item){
						setTimeout(function(){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						},1000);
					}
					if(isaudit){
						resetShowData('audit');
					}else{
						resetShowData('edit');
					}
				});
			});



			/*绑定确定审核*/
			$audit_action.on('click',function () {
				executeAudit();
			});


			/*绑定表格输入限制*/
			$admin_wholesale_price_list.delegate('input[type="text"]','keyup focusout',function(e){
				var $this=$(this),
					etype= e.type,
					name=$this.attr('name'),
					value=$this.val(),
					result,
					self=this;

				if(etype==='keyup'){
					if(name==="setwholesalePrice"){
						/*错误状态下禁止输入*/
						result=value.replace(/[^0-9\.]/g,'');
						result=result.replace(/\.{2,}/g,'.');
						$this.val(result);
					}else if(name==="setretailPrice"){
						result=value.replace(/[^0-9\.]/g,'');
						result=result.replace(/\.{2,}/g,'.');
						$this.val(result);
					}
				}else if(etype==='focusout'){
					if(name==="setwholesalePrice"){
						/*错误状态下禁止输入*/
						$this.val(public_tool.moneyCorrect(value,12,false)[0]);
					}else if(name==="setretailPrice"){
						/*错误状态下禁止输入*/
						$this.val(public_tool.moneyCorrect(value,12,false)[0]);
					}
				}

			});

			/*绑定表格修改*/
			$admin_wholesale_price_list.delegate('span','click',function () {
				var $this=$(this),
					id=$this.attr('data-id'),
					$tr=$this.closest('tr');
				updatePrice(id,$tr);
			});


			/*绑定查看原来的数据*/
			$admin_oldprice_btn.on('click',function(){
				$admin_oldprice_show.toggleClass('g-d-hidei');
			});



		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$admin_list_wrap.DataTable(opt.config);
			}else{
				/*清除批量数据*/
				batchItem.clear();
				table.ajax.config(opt.config.ajax).load();
			}
		}

		/*获取审核数据*/
		function showAudit(config,$tr) {
			var id=config.id;
			if(typeof id==='undefined'){
				return false;
			}
			admin_audit_form.reset();
			var state='',
				statekey='',
				str='',
				type=config.type,
				data,
				statusmap={
					0:"仓库",
					1:"上架",
					2:"下架",
					3:"删除",
					4:"待审核"
				};



			/*设置值*/
			if(type==='batch'){
				/*批量*/
				id=id.join(',');
				$admin_id.val(id).attr({'data-type':'batch'});
				var len=$tr.length,
					i=0;

				if(len!==0){
					for(i;i<len;i++){
						data=table.row($tr[i].closest("tr")).data();
						if(!$.isEmptyObject(data)){
							state=parseInt(data['status'],10);
							if(state===3){
								statekey='<div class="g-c-red1">'+statusmap[state]+'</div>';
							}else if(state===0){
								statekey='<div class="g-c-warn">'+statusmap[state]+'</div>';
							}else if(state===1){
								statekey='<div class="g-c-gray6">'+statusmap[state]+'</div>';
							}else if(state===2){
								statekey='<div class="g-c-gray9">'+statusmap[state]+'</div>';
							}else if(state===4){
								statekey='<div class="g-c-info">'+statusmap[state]+'</div>';
							}else{
								statekey='<div class="g-c-red1">状态异常</div>';
							}
							str+='<tr><td>'+parseInt(i+1,10)+'</td><td>'+data["gcode"]+'</td><td>'+data["name"]+'</td><td>'+data["providerName"]+'</td><td>'+data["goodsTypeName"]+'</td><td>'+statekey+'</td></tr>';
						}
					}
					$(str).appendTo($show_audit_header.html(''));
					$show_audit_wrap.modal('show',{backdrop:'static'});
				}
			}else if(type==='base'){
				/*单个*/
				$admin_id.val(id).attr({'data-type':'base'});
				data=table.row($tr).data();
				if(!$.isEmptyObject(data)){
					state=parseInt(data['status'],10);
					if(state===3){
						statekey='<div class="g-c-red1">'+statusmap[state]+'</div>';
					}else if(state===0){
						statekey='<div class="g-c-warn">'+statusmap[state]+'</div>';
					}else if(state===1){
						statekey='<div class="g-c-gray6">'+statusmap[state]+'</div>';
					}else if(state===2){
						statekey='<div class="g-c-gray9">'+statusmap[state]+'</div>';
					}else if(state===4){
						statekey='<div class="g-c-info">'+statusmap[state]+'</div>';
					}else{
						statekey='<div class="g-c-red1">状态异常</div>';
					}
					str='<tr><td>1</td><td>'+data["gcode"]+'</td><td>'+data["name"]+'</td><td>'+data["providerName"]+'</td><td>'+data["goodsTypeName"]+'</td><td>'+statekey+'</td></tr>';
					$(str).appendTo($show_audit_header.html(''));
					$show_audit_wrap.modal('show',{backdrop:'static'});
				}
			}
		}


		/*重置数据项*/
		function resetShowData(type) {
			if(type==='audit'){
				admin_audit_form.reset();
				$show_audit_header.html('');
				$admin_id.attr({
					'data-type':''
				});
			}else if(type==='edit'){
				$admin_wholesale_price_list.attr({
					'data-id':''
				});
				attr_map={};
				history_data={};
				listone={};
				listtwo={};
			}
		}


		/*级联类型查询*/
		function getGoodsTypes(value,type,flag){
			var typemap={
					'one':'一级',
					'two':'二级',
					'three':'三级'
				};
			var temp_config=$.extend(true,{},goods_params);
			temp_config['parentId']=value;
			$.ajax({
				url:"http://10.0.5.226:8082/mall-buzhubms-api/goodstype/list",
				dataType:'JSON',
				async:false,
				method:'post',
				data:temp_config
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function () {
							public_tool.clear();
							public_tool.clearCacheData();
						});
					}
					console.log(resp.message);
					return false;
				}



				var result=resp.result;

				if(result){
					var list=result.list;
					if(!list){
						return false;
					}
				}else{
					return false;
				}

				var len=list.length,
					i= 0,
					str='';

				if(len!==0){
					for(i;i<len;i++){
						var item=list[i];
						if(i===0){
							str+='<option value="" selected >请选择'+typemap[type]+'分类</option><option  data-hasSub="'+item["hasSub"]+'" value="'+item["id"]+'" >'+item["name"]+'</option>';
						}else{
							str+='<option data-hasSub="'+item["hasSub"]+'" value="'+item["id"]+'" >'+item["name"]+'</option>';
						}
					}
					if(type==='one'){
						$(str).appendTo($search_gtione.html(''));
						if(flag){
							$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
							$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
						}
					}else if(type==='two'){
						$(str).appendTo($search_gtitwo.html(''));
					}else if(type==='three'){
						$(str).appendTo($search_gtithree.html(''));
					}
				}else{
					console.log(resp.message||'error');
					if(type==='one'){
						$search_gtione.html('<option value="" selected >请选择一级分类</option>');
						$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}else if(type==='two'){
						$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}else if(type==='three'){
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}
				}
			}).fail(function(resp){
				console.log(resp.message||'error');
				if(type==='one'){
					$search_gtione.html('<option value="" selected >请选择一级分类</option>');
					$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}else if(type==='two'){
					$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}else if(type==='three'){
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}
			});
		}

		/*审核*/
		function executeAudit() {
			setSure.sure('',function(cf){
				/*是否选择了状态*/
				var applystate=parseInt($audit_radio_wrap.find(':checked').val(),10);
				if(isNaN(applystate)){
					$audit_radio_tip.html('您没有选择审核状态');
					setTimeout(function () {
						$audit_radio_tip.html('');
						$audit_radio_wrap.find('input').eq(0).prop({
							'checked':true
						});
					},2000);
					return false;
				}
				/*是否有id*/
				var id=$admin_id.val();
				if(id===''){
					dia.content('<span class="g-c-bs-warning g-btips-warn">您没有选择需要操作的数据</span>').showModal();
					return false;
				}


				var type=$admin_id.attr('data-type'),
					tip=cf.dia,
					temp_config=$.extend(true,{},goods_params);


					temp_config['operate']=applystate;

					temp_config['ids']=id;

				$.ajax({
						url:"http://10.0.5.226:8082/mall-buzhubms-api/goods/operate",
						dataType:'JSON',
						method:'post',
						data:temp_config
					})
					.done(function(resp){
						var code=parseInt(resp.code,10);
						if(code!==0){
							console.log(resp.message);
							tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"审核失败")+'</span>').show();
							if(type==='base'){
								if(operate_item){
									operate_item.removeClass('item-lighten');
									operate_item=null;
								}
							}else if(type==='batch'){
								batchItem.clear();
							}
							setTimeout(function () {
								tip.close();
								resetShowData('audit');
							},2000);
							return false;
						}
						/*是否是正确的返回数据*/
						tip.content('<span class="g-c-bs-success g-btips-succ">审核成功</span>').show();
						if(type==='base'){
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						}else if(type==='batch'){
							batchItem.clear();
						}
						setTimeout(function () {
							tip.close();
							getColumnData(goods_page,goods_config);
							setTimeout(function () {
								$show_audit_wrap.modal('hide');
								resetShowData('audit');
							},1000);
						},1000);
					})
					.fail(function(resp){
						console.log(resp.message);
						tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"审核失败")+'</span>').show();
						if(type==='base'){
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						}else if(type==='batch'){
							batchItem.clear();
						}
						setTimeout(function () {
							tip.close();
							resetShowData('audit');
							$show_audit_wrap.modal('hide');
						},2000);
					});

			},"是否审核该商品?",true);
		}

		/*批量操作*/
		function batchGoods(config) {

			var action=config.action;

			if(action===''||typeof action==='undefined'){
				return false;
			}
			var inputitems=batchItem.getBatchNode(),
				len=inputitems.length,
				i=0;

			if(len===0){
				dia.content('<span class="g-c-bs-warning g-btips-warn">请选中操作数据</span>').show();
				setTimeout(function () {
					dia.close();
				},2000);
				return false;
			}
			var tempid=batchItem.getBatchData(),
				filter=[];

			for(i;i<len;i++){
				var tempinput=inputitems[i],
					temp_audit=parseInt(tempinput.attr('data-auditstatus'),10);

				if(temp_audit===1&&action==='audit'){
					/*审核状态则不能继续审核*/
					filter.push(tempid[i]);
					continue;
				}
			}


			if(filter.length!==0){
				dia.content('<span class="g-c-bs-warning g-btips-warn">操作状态和选中状态不匹配,系统将过滤不匹配数据</span>').show();
				batchItem.filterData(filter);
				filter.length=0;
				setTimeout(function () {
					dia.close();
					/*批量操作*/
					tempid=batchItem.getBatchData();
					if(tempid.length!==0){
						if(action==='audit'){
							inputitems=batchItem.getBatchNode();
							showAudit({
								id:tempid,
								type:'batch'
							},inputitems);
						}
					}
				},2000);
			}else{
				tempid=batchItem.getBatchData();
				if(tempid.length!==0){
					if(action==='audit'){
						inputitems=batchItem.getBatchNode();
						showAudit({
							id:tempid,
							type:'batch'
						},inputitems);
					}
				}
			}
		}

		/*查看详情*/
		function showDetail(id,$tr) {
			if(typeof id==='undefined'){
				return false;
			}
			if(id===''){
				return false;
			}

			var temp_config=$.extend(true,{},goods_params);

			temp_config['id']=id;
			$.ajax({
					url:"http://10.0.5.226:8082/mall-buzhubms-api/goods/detail",
					dataType:'JSON',
					method:'post',
					data:temp_config
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						$admin_wholesale_price_list.attr({
							'data-id':''
						});
						return false;
					}
					/*是否是正确的返回数据*/
					var result=resp.result;

					if(!result){
						$admin_wholesale_price_list.attr({
							'data-id':''
						});
						return false;
					}
					if($.isEmptyObject(result)){
						$admin_wholesale_price_list.attr({
							'data-id':''
						});
						return false;
					}
					$admin_wholesale_price_list.attr({
						'data-id':id
					});

					/*解析轮播图*/
					var banner=result['bannerList'];
					if(banner&&banner.length!==0){
						getSlideData(banner,slide_config);
					}

					/*解析详情*/
					var detail=result['details'];
					if(detail!==''){
						getDetailHtml(detail);
					}

					/*解析类型*/
					var type=result['goodsTypeId'];
					if(typeof type!=='undefined'){
						document.getElementById('admin_goodstype').innerHTML=type;
					}

					/*解析名称*/
					var name=result['name'];
					if(typeof name!=='undefined'){
						document.getElementById('admin_name').innerHTML=name;
					}

					/*解析状态*/
					var status=result['status'],
						statemap={
						'0':'仓库',
						'1':'上架',
						'2':'下架',
						'3':'删除',
						'4':"待审核"
					};
					if(typeof status !=='undefined'&&status!==''){
						document.getElementById('admin_status').innerHTML=statemap[status];
					}else{
						document.getElementById('admin_status').innerHTML=statemap[0];
					}

					/*解析编码*/
					var gcode=result['gcode'];
					if(typeof gcode !=='undefined'){
						document.getElementById('admin_code').innerHTML=gcode;
					}

					/*解析排序*/
					var sort=result['sort'];
					if(typeof sort !=='undefined'){
						document.getElementById('admin_sort').innerHTML=sort;
					}

					/*解析是否被推荐*/
					var isrec=result['isRecommended'];
					if(typeof isrec!=='undefined'){
						document.getElementById('admin_isRecommended').innerHTML=(isrec?'是':'否');
					}

					/*解析库存，批发价，建议零售价*/
					var attr=getGroupCondition(result['tagsAttrsList'],result['attrInventoryPrices']);
					if(attr){
						/*设置属性组合值*/
						setGroupCondition(history_data);
						/*设置原始属性组合值*/
						setOldGroupCondition(history_data);
					}


					/*添加高亮状态*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					$goods_detail_wrap.modal('show',{backdrop:'static'});
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					$admin_wholesale_price_list.attr({
						'data-id':''
					});
					setTimeout(function () {
						dia.close();
					},2000);
				});

		}


		/*编辑提交价格数据*/
		function updatePrice(id,$tr){
			var setdata={};

			if(id===''){
				dia.content('<span class="g-c-bs-warning g-btips-warn">您没有选择需要操作的数据</span>').showModal();
				return false;
			}

			var goodsid=$admin_wholesale_price_list.attr('data-id');
			if(goodsid===''){
				dia.content('<span class="g-c-bs-warning g-btips-warn">您没有选择需要操作的数据</span>').showModal();
				return false;
			}

			$.extend(true,setdata,goods_params);

			var priceobj=getSetPrice($tr);
			if(priceobj===null){
				return false;
			}
			var tempprice=priceobj['value'].split('#'),
				tempinput=priceobj['$input'];

			$.extend(true,setdata,{
				goodsId:goodsid,
				goodsInventoryPricesId:id,
				wholesalePrice:tempprice[0],
				retailPrice:tempprice[1]
			});


			$.ajax({
				dataType:'JSON',
				method:'post',
				url:'http://10.0.5.226:8082/mall-buzhubms-api/goods/price/update',
				data:setdata
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					dia.content('<span class="g-c-bs-warning g-btips-warn">修改商品价格失败</span>').show();
					return false;
				}else{
					dia.content('<span class="g-c-bs-success g-btips-succ">修改商品价格成功</span>').show();
					/*成功后设置新值*/
					tempinput.eq(0).attr({
						'data-value':tempprice[0]
					});
					tempinput.eq(1).attr({
						'data-value':tempprice[1]
					});
				}
				setTimeout(function () {
					dia.close();
				},2000);
			}).fail(function(resp){
				console.log('error');
			});
		}


		/*获取设置的价格数据*/
		function getSetPrice($tr){
			var trims=public_tool.trimSep,
				$input=$tr.find('input'),
				sublen=$input.size();

			if(sublen!==0){
				var wholesale=trims($input.eq(0).val(),','),
					retail=trims($input.eq(1).val(),','),
					oldwholesale=$input.eq(0).attr('data-value'),
					oldretail=$input.eq(1).attr('data-value'),
					flag=true;

				if(wholesale===''&&retail===''){
					$admin_wholesale_price_tip.html('"批发价" 或 "建议零售价"不能为空');
					flag=false;
				}
				if(wholesale===oldwholesale&&retail===oldretail){
					$admin_wholesale_price_tip.html('"批发价" 或 "建议零售价"无变化');
					flag=false;
				}else{
					flag=true;
				}
				if(flag){
					return {
						value:wholesale+'#'+retail,
						$input:$input
					}
				}else{
					setTimeout(function () {
						$admin_wholesale_price_tip.html('');
					},3000);
					return null;
				}
			}else{
				return null;
			}
		}


		/*通过价格反向解析标签与属性*/
		function getGroupCondition(attr,price){
			var attrlen= 0,
				pricelen= 0,
				priceobj;

			if(attr){
				attrlen=attr.length;
			}

			if(attrlen===0){
				/*没有颜色和规格时*/
				if(price){
					pricelen=price.length;
					if(pricelen!==0){
						priceobj=price[0];
						if(priceobj!==null||priceobj!==''){
							priceobj=priceobj.split("#");
							if(priceobj.length!==0){
								document.getElementById('admin_inventory').innerHTML=priceobj[0];
								document.getElementById('admin_wholesale_price').innerHTML='￥:'+public_tool.moneyCorrect(priceobj[1],12,false)[0];
								document.getElementById('admin_retail_price').innerHTML='￥:'+public_tool.moneyCorrect(priceobj[2],12,false)[0];
								document.getElementById('admin_supplier_price').innerHTML=(function () {
									var supplier=dataitem[6];
									if(supplier===''||isNaN(supplier)){
										supplier='￥:'+'0.00';
									}else{
										supplier='￥:'+public_tool.moneyCorrect(supplier,12,false)[0];
									}
									return supplier;
								}());
							}
						}
					}
					return false;
				}
			}else {
				/*存储对象*/
				(function(){
					var i=0;
					for(i;i<attrlen;i++){
						var attr_obj=attr[i],
							name=attr[i]['name'],
							arr=attr[i]['list'],
							id=attr[i]['id'],
							j= 0,
							sublen=arr.length,
							str='';

						/*存入属性对象*/
						if(sublen!==0){
							/*没有填入对象即创建相关对象*/
							attr_obj['map']={};
							attr_obj['res']={};
							/*遍历*/
							for(j;j<sublen;j++){
								var subobj=arr[j],
									attrvalue=subobj["id"],
									attrtxt=subobj["name"];
								attr_obj['map'][attrtxt]=attrvalue;
								attr_obj['res'][attrvalue]=attrtxt;
							}

							attr_obj['label']=name.replace(/(\(.*\))|(\（.*\）)|\s*/g,'');
							attr_obj['key']=id;
							attr_map[id]=attr_obj;
						}else if(sublen===0){
							attr_obj['map']={};
							attr_obj['res']={};
							attr_obj['label']=name.replace(/(\(.*\))|(\（.*\）)|\s*/g,'');
							attr_obj['key']=id;
							attr_map[id]=attr_obj;
						}
					}
				}());

				/*解析结果集*/
				/*有颜色和规格时*/
				if(price){
					priceobj=price;
					pricelen=price.length;
					if(pricelen!==0){
						var	attrmap={};


						/*解析第一属性*/
						(function(){
							var i=0;
							loopout:for(i;i<pricelen;i++){
								var attrdata=priceobj[i].split('#'),
									attrone=attrdata[4];

								for(var j in attr_map){
									var mapdata=attr_map[j],
										submap=mapdata['res'];
									for(var p in submap){
										if(p===attrone){
											if($.isEmptyObject(listone)){
												listone['label']=mapdata['label'];
												listone['res']=submap;
												listone['id']=mapdata['id'];
												listone['key']=mapdata['key'];
												listone['map']=mapdata['map'];
											}
											break loopout;
										}
									}
								}
							}
						}());


						/*解析第二属性*/
						if(!$.isEmptyObject(listone)){
							(function(){
								var i=0;
								loopout:for(i;i<pricelen;i++){
									var attrdata=priceobj[i].split('#'),
										attrtwo=attrdata[5];

									for(var j in attr_map){
										var mapdata=attr_map[j],
											submap=mapdata['res'];
										for(var p in submap){
											if(p===attrtwo){
												if($.isEmptyObject(listtwo)){
													listtwo['label']=mapdata['label'];
													listtwo['res']=submap;
													listtwo['id']=mapdata['id'];
													listtwo['key']=mapdata['key'];
													listtwo['map']=mapdata['map'];
												}
												break loopout;
											}
										}
									}
								}
							}());
						}else{
							$admin_wholesale_price_list.html('');
							$admin_wholesale_price_thead.html(wholesale_price_theadstr);
							return false;
						}


						/*解析组合*/
						if(!$.isEmptyObject(listtwo)){
							(function(){
								var i=0;
								for(i;i<pricelen;i++){
									var attrdata=priceobj[i].split('#'),
										attrone=attrdata[4],
										attrtwo=attrdata[5];


									var mapone=listone['res'];
									for(var m in mapone){
										if(m===attrone){
											if(!(m in attrmap)){
												/*不存在即创建*/
												attrmap[m]=[];
											}
											var maptwo=listtwo['res'];
											for(var n in maptwo){
												if(n===attrtwo){
													attrmap[m].push(attrdata);
													break;
												}
											}
											break;
										}
									}
								}
							}());
						}else{
							$admin_wholesale_price_list.html('');
							$admin_wholesale_price_thead.html(wholesale_price_theadstr);
							return false;
						}

						if(!$.isEmptyObject(attrmap)){
							$.extend(true,history_data,attrmap);
							return true;
						}else{
							$admin_wholesale_price_list.html('');
							$admin_wholesale_price_thead.html(wholesale_price_theadstr);
							return false;
						}
					}else{
						$admin_wholesale_price_list.html('');
						$admin_wholesale_price_thead.html(wholesale_price_theadstr);
						return false;
					}
				}
			}
		}



		/*设置属性组合值*/
		function setGroupCondition(resp){
			var str='',
				checkid=0,
				x=0;

			for(var j in resp){
				var k= 0,
					datavalue=resp[j],
					len=datavalue.length;

				str+='<tr><td rowspan="'+len+'">'+listone['res'][j]+'</td>';
				for(k;k<len;k++){
					var dataitem=datavalue[k],
						ischeck=parseInt(dataitem[3],10)===1?'是':'',
						tempwholesaleprice=public_tool.moneyCorrect(dataitem[1],12,false),
						tempretailprice=public_tool.moneyCorrect(dataitem[2],12,false);
					if(k===0){
						str+='<td>'+listtwo['res'][dataitem[5]]+'</td>' +
							'<td>'+dataitem[0]+'</td>' +
							'<td><input class="admin-table-input" name="setwholesalePrice" maxlength="12" data-value="'+tempwholesaleprice[1]+'" value="'+tempwholesaleprice[0]+'" type="text"></td>' +
							'<td><input class="admin-table-input" data-value="'+tempretailprice[1]+'" value="'+tempretailprice[0]+'" name="setretailPrice" maxlength="12" type="text"></td>' +
							'<td>￥:'+(function(){
								var supplier=dataitem[6];
								if(supplier===''||isNaN(supplier)){
									supplier='0.00';
								}else{
									supplier=public_tool.moneyCorrect(supplier,12,false)[0];
								}
								return supplier;
							}())+'</td>' +
							'<td>'+ischeck+'</td>' +
							'<td>'+(function(){
								var inventid=dataitem[7];
								if(typeof inventid==='undefined'||inventid===''||isNaN(inventid)){

									return '';
								}else{
									return '<span class="btn btn-white btn-sm g-br3 g-c-gray6" data-id="'+inventid+'">修改</span>';
								}
							}())+'</td></tr>';
					}else{
						str+='<tr><td>'+listtwo['res'][dataitem[5]]+'</td>' +
							'<td>'+dataitem[0]+'</td>' +
							'<td><input class="admin-table-input" name="setwholesalePrice" maxlength="12" data-value="'+tempwholesaleprice[1]+'" value="'+tempwholesaleprice[0]+'" type="text"></td>' +
							'<td><input class="admin-table-input" data-value="'+tempretailprice[1]+'" value="'+tempretailprice[0]+'" name="setretailPrice" maxlength="12" type="text"></td>' +
							'<td>￥:'+(function(){
								var supplier=dataitem[6];
								if(supplier===''||isNaN(supplier)){
									supplier='0.00';
								}else{
									supplier=public_tool.moneyCorrect(supplier,12,false)[0];
								}
								return supplier;
							}())+'</td>' +
							'<td>'+ischeck+'</td>' +
							'<td>'+(function(){
								var inventid=dataitem[7];
								if(typeof inventid==='undefined'||inventid===''||isNaN(inventid)){

									return '';
								}else{
									return '<span class="btn btn-white btn-sm g-br3 g-c-gray6" data-id="'+inventid+'">修改</span>';
								}
							}())+'</td></tr>';
					}
					if(ischeck===''){
						/*判断是否选中,有则跳过无则计数*/
						checkid++;
					}
					x++;
				}
			}
			$admin_wholesale_price_thead.html('<tr><th>'+listone['label']+'</th><th>'+listtwo['label']+'</th><th>库存</th><th>批发价</th><th>建议零售价</th><th>供应商价</th><th>价格显示在首页</th><th>操作</th></tr>');
			$admin_wholesale_price_list.html(str);
			/*全部没选中则，默认第一个选中*/
			if(checkid===x){
				$admin_wholesale_price_list.find('tr:first-child').find('td').eq(6).html('是');
			}
		}


		/*设置原始数据查看*/
		function setOldGroupCondition(list){
			var str='',
				x=0,
				checkid=0;

			for(var j in list){
				var k= 0,
					item=list[j],
					len=item.length;

				str+='<tr><td rowspan="'+len+'">'+listone['res'][j]+'</td>';
				for(k;k<len;k++){
					var dataitem=item[k],
						ischeck=parseInt(dataitem[3],10)===1?'是':'';
					if(k===0){
						str+='<td>'+listtwo['res'][dataitem[5]]+'</td>' +
							'<td>'+dataitem[0]+'</td>' +
							'<td>￥:'+public_tool.moneyCorrect(dataitem[1],12,false)[0]+'</td>' +
							'<td>￥:'+public_tool.moneyCorrect(dataitem[2],12,false)[0]+'</td>' +
							'<td>￥:'+(function(){
								var supplier=dataitem[6];
								if(supplier===''||isNaN(supplier)){
									supplier='0.00';
								}else{
									supplier=public_tool.moneyCorrect(supplier,12,false)[0];
								}
								return supplier;
							}())+'</td>' +
							'<td>'+ischeck+'</td></tr>';
					}else{
						str+='<tr><td>'+listtwo['res'][dataitem[5]]+'</td>' +
							'<td>'+dataitem[0]+'</td>' +
							'<td>￥:'+public_tool.moneyCorrect(dataitem[1],12,false)[0]+'</td>' +
							'<td>￥:'+public_tool.moneyCorrect(dataitem[2],12,false)[0]+'</td>' +
							'<td>￥:'+(function(){
								var supplier=dataitem[6];
								if(supplier===''||isNaN(supplier)){
									supplier='0.00';
								}else{
									supplier=public_tool.moneyCorrect(supplier,12,false)[0];
								}
								return supplier;
							}())+'</td>' +
							'<td>'+ischeck+'</td></tr>';
					}
					if(ischeck===''){
						/*判断是否选中,有则跳过无则计数*/
						checkid++;
					}
					x++;
				}
			}
			document.getElementById('admin_wholesale_price_thead_old').innerHTML='<tr><th>'+listone['label']+'</th><th>'+listtwo['label']+'</th><th>库存</th><th>批发价</th><th>建议零售价</th><th>供应商价</th><th>价格显示在首页</th></tr>';
			var pricelist=document.getElementById('admin_wholesale_price_old');
			pricelist.innerHTML=str;
			/*全部没选中则，默认第一个选中*/
			if(checkid===x){
				$(pricelist).find('tr:first-child').find('td').eq(6).html('是');
			}
		}


		/*解析轮播图*/
		function getSlideData(list,config){
			var len=list.length,
				i= 0,
				str='';
			for(i;i<len;i++){
				var url=list[i]['imageUrl'];
				if(url.indexOf('qiniucdn.com')!==-1){
					if(url.indexOf('?imageView2')!==-1){
						url=url.split('?imageView2')[0]+'?imageView2/1/w/50/h/50';
					}else{
						url=url+'?imageView2/1/w/50/h/50';
					}
					str+='<li><img alt="" src="'+url+'" /></li>';
				}else {
					str+='<li><img alt="" src="'+url+'" /></li>';
				}
			}
			$(str).appendTo(config.$slide_tool.html(''));
			/*调用轮播*/
			goodsSlide.GoodsSlide(config);
		}


		/*解析详情*/
		function getDetailHtml(data){
			document.getElementById('admin_detail').innerHTML=data;
		}



	});


})(jQuery);