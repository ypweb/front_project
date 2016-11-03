/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8081/mall-agentbms-api/module/menu',
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
				merchantedit_power=public_tool.getKeyPower('mall-merchant-update',powermap),
				merchantadd_power=public_tool.getKeyPower('mall-merchant-add',powermap);


			/*dom引用和相关变量定义*/
			var module_id='mall-merchant-add'/*模块id，主要用于本地存储传值*/,
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
				admin_merchant_form=document.getElementById('admin_merchant_form'),
				$admin_merchant_form=$(admin_merchant_form),
				$admin_id=$('#admin_id'),
				$admin_username=$('#admin_username'),
				$admin_password=$('#admin_password'),
				$admin_name=$('#admin_name'),
				$admin_type=$('#admin_type'),
				$admin_fullName=$('#admin_fullName'),
				$admin_shortName=$('#admin_shortName'),
				$admin_imei_code=$('#admin_imei_code'),
				$admin_deviceType=$('#admin_deviceType'),
				$admin_linkman=$('#admin_linkman'),
				$admin_cellphone=$('#admin_cellphone'),
				$admin_telephone=$('#admin_telephone'),
				$admin_province=$('#admin_province'),
				$admin_city=$('#admin_city'),
				$admin_country=$('#admin_country'),
				$admin_address=$('#admin_address'),
				$admin_status=$('#admin_status'),
				$admin_salesmanId=$('#admin_salesmanId'),
				$admin_remark=$('#admin_remark'),
				$admin_action=$('#admin_action'),
				resetform0=null;



			/*重置表单*/
			admin_merchant_form.reset();


			/*查询可用业务员Id*/
			getSalesmanId();



			/*格式化手机号码*/
			$.each([$admin_cellphone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});


			/*绑定切换地址*/
			$.each([$admin_province,$admin_city,$admin_country],function () {
				var self=this,
					selector=this.selector,
					type='';

				if(selector.indexOf('province')!==-1){
					type='province';
				}else if(selector.indexOf('city')!==-1){
					type='city';
				}else if(selector.indexOf('country')!==-1){
					type='country';
				}

				this.on('change',function () {
					var $this=$(this),
						value=$this.val();
					getAddress(value,'',type,true);
				});
			});


			/*获取编辑缓存*/
			var edit_cache=public_tool.getParams('mall-merchant-add');
			if(edit_cache){
				$admin_action.html('修改');
				$admin_username.prop({
					'readonly':true
				});
				/*判断权限*/
				if(merchantedit_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				setAgentData(edit_cache['id']);
			}else{
				/*判断权限*/
				if(merchantadd_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				/*获取地址*/
				getAddress(86,'','province',true);
			}


			/*绑定添加地址*/
			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					formcache=public_tool.cache,
					basedata={
						roleId:decodeURIComponent(logininfo.param.roleId),
						token:decodeURIComponent(logininfo.param.token),
						adminId:decodeURIComponent(logininfo.param.adminId),
						loginGrade:decodeURIComponent(logininfo.param.grade)
					};


				if(formcache.form_opt_0){
					$.each([formcache.form_opt_0],function(index){
						var formtype,
						config={
							dataType:'JSON',
							method:'post'
						};
						if(index===0){
							formtype='addmerchant';
						}
						$.extend(true,(function () {
							if(formtype==='addmerchant'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='addmerchant'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={};

								$.extend(true,setdata,basedata);

								if(formtype==='addmerchant'){

									/*同步编辑器*/
									$.extend(true,setdata,{
										password:$admin_password.val(),
										name:$admin_name.val(),
										type:$admin_type.find(':selected').val(),
										fullName:$admin_fullName.val(),
										shortName:$admin_shortName.val(),
										imei_code:$admin_imei_code.val(),
										deviceType:$admin_deviceType.find(':selected').val(),
										linkman:$admin_linkman.val(),
										cellphone:public_tool.trims($admin_cellphone.val()),
										telephone:public_tool.trims($admin_telephone.val()),
										province:$admin_province.find(':selected').val(),
										city:$admin_city.find(':selected').val(),
										country:$admin_country.find(':selected').val(),
										address:$admin_address.val(),
										status:$admin_status.find(':selected').val(),
										salesmanId:$admin_salesmanId.find(':selected').val(),
										remark:$admin_remark.val()
									});

                                    var id=$admin_id.val(),
										actiontype='';
                                    if(id!==''){
										/*修改操作*/
                                        setdata['id']=id;
										actiontype='修改';
										delete setdata['username'];
                                    }else{
										/*新增操作*/
										actiontype='新增';
										setdata['username']=$admin_username.val();
                                        delete setdata['id'];
                                    }
									config['url']="http://120.76.237.100:8081/mall-agentbms-api/merchant/addupdate";
									config['data']=setdata;
								}

								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='addmerchant'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+actiontype+'商户失败</span>').show();
											return false;
										}else{
											public_tool.removeParams('mall-merchant-add');
											dia.content('<span class="g-c-bs-success g-btips-succ">'+actiontype+'商户成功</span>').show();
										}
									}


									setTimeout(function () {
										dia.close();
										if(formtype==='addmerchant'){
											/*页面跳转*/
											location.href='mall-merchant-list.html';
										}
									},2000);
								}).fail(function(resp){
									console.log('error');
								});



								return false;
							}
						});
					});

				}


				/*提交验证*/
				if(resetform0===null){
					resetform0=$admin_merchant_form.validate(form_opt0);
				}
			}



		}






		/*查询地址*/
		function getAddress(id,sel,type,getflag) {
			$.ajax({
					url:"http://120.24.226.70:8081/yttx-public-api/address/get",
					dataType:'JSON',
					method:'post',
					data:{
						parentCode:id===''?86:id,
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token),
						grade:decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						return false;
					}
					/*是否是正确的返回数据*/
					var res=resp.result;
					if(!res){
						return false;
					}
					var list=res.list;

					if(!list){
						return false;
					}

					var len=list.length,
						str='',
						$wrap='',
						i=0;

					if(type==='province'){
						$wrap=$admin_province;
					}else if(type==='city'){
						$wrap=$admin_city;
					}else if(type==='country'){
						$wrap=$admin_country;
					}

					if(len!==0){
						if(sel!==''){
							for(i;i<len;i++){
								var codes=list[i]["code"];
								if(codes===sel){
									str+='<option selected value="'+codes+'">'+list[i]["name"]+'</option>';
								}else{
									str+='<option value="'+codes+'">'+list[i]["name"]+'</option>';
								}
							}
						}else{
							for(i;i<len;i++){
								if(i===0){
									sel=list[i]["code"];
									str+='<option selected value="'+list[i]["code"]+'">'+list[i]["name"]+'</option>';
								}else{
									str+='<option value="'+list[i]["code"]+'">'+list[i]["name"]+'</option>';
								}
							}
						}
						$(str).appendTo($wrap.html(''));

						if(sel!==''&&getflag){
							if(type==='province'){
								getAddress(sel,'','city',true);
							}else if(type==='city'){
								getAddress(sel,'','country');
							}
						}
					}
				})
				.fail(function(resp){
					console.log(resp.message);
				});
		}


		/*修改时设置值*/
		function setAgentData(id) {
			if(!id){
				return false;
			}


			$.ajax({
				url:"http://120.76.237.100:8081/mall-agentbms-api/merchant/detail",
				dataType:'JSON',
				method:'post',
				data:{
					"id":id,
					"adminId":decodeURIComponent(logininfo.param.adminId),
					"token":decodeURIComponent(logininfo.param.token),
					"grade":decodeURIComponent(logininfo.param.grade)
				}
			})
			.done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					console.log(resp.message);
					return false;
				}
				/*是否是正确的返回数据*/
				var list=resp.result;

				if(!$.isEmptyObject(list)){
					$admin_id.val(id);
					for(var j in list){
						switch(j){
							case 'username':
								$admin_username.val(list[j]);
								break;
							case 'password':
								$admin_password.val(list[j]);
								break;
							case 'name':
								$admin_name.val(list[j]);
								break;
							case 'type':
								var type=parseInt(list[j],10);
								$admin_type.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===type){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'fullName':
								$admin_fullName.val(list[j]);
								break;
							case 'shortName':
								$admin_shortName.val(list[j]);
								break;
							case 'imei_code':
								$admin_imei_code.val(list[j]);
								break;
							case 'deviceType':
								var device=parseInt(list[j],10);
								$admin_deviceType.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===device){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'linkman':
								$admin_linkman.val(list[j]);
								break;
							case 'cellphone':
								$admin_cellphone.val(public_tool.phoneFormat(list[j]));
								break;
							case 'telephone':
								$admin_telephone.val(list[j]);
								break;
							case 'province':
								getAddress('86',list[j],'province');
								break;
							case 'city':
								getAddress(list['province'],list[j],'city');
								break;
							case 'country':
								getAddress(list['city'],list[j],'country');
								break;
							case 'address':
								$admin_address.val(list[j]);
								break;
							case 'status':
								var status=parseInt(list[j],10);
								$admin_status.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===status){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'salesmanId':
								var salesman=parseInt(list[j],10);
								$admin_salesmanId.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===salesman){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'remark':
								$admin_remark.val(list[j]);
								break;
						}
					}

				}
			})
			.fail(function(resp){
				console.log(resp.message);
			});

		}


		/*查询业务员Id*/
		function getSalesmanId() {
			$.ajax({
				url:"http://120.76.237.100:8081/mall-agentbms-api/salesmans/list",
				dataType:'JSON',
				method:'post',
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				}
			})
			.done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					console.log(resp.message);
					doSalesmanIdFail();
					return false;
				}
				/*是否是正确的返回数据*/
				var res=resp.result;

				if(!res){
					doSalesmanIdFail();
					return false;
				}

				var list=res.list;


				if(list){
					var len=list.length,
						i=0,
						str='';
					if(len===0){
						doSalesmanIdFail();
						return false;
					}
					for(i;i<len;i++){
						if(i===0){
							str+='<option value="" selected>请选择业务员</option><option value="'+list[i]["id"]+'">'+list[i]["name"]+'</option>';
						}else{
							str+='<option value="'+list[i]["id"]+'">'+list[i]["name"]+'</option>';
						}
					}
					$(str).appendTo($admin_salesmanId.html(''));
				}else{
					doSalesmanIdFail();
					return false;
				}
			})
			.fail(function(resp){
				console.log(resp.message);
				doSalesmanIdFail();
			});
		}

		/*处理无业务员时的情况*/
		function doSalesmanIdFail() {
			return false;
			dia.close();
			dia.content('<span class="g-c-bs-warning g-btips-warn">还没有业务员，3秒后将跳转至添加业务员处</span>').show();
			setTimeout(function () {
				dia.close();
				location.href='../salesman/mall-salesman-add.html';
			},3000);
		}




	});



})(jQuery);