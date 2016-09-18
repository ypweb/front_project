/*---表单信息---*/
function vmsg_objs(){
	var vobjs={};
	var rules=c_Regular();
	/*--登录提示信息--*/
	vobjs.login_msg=[{
        ele:"#txtUserName",
		nullmsg:"用户名不能为空",
        datatype:"m|e",
		errormsg:"用户名格式错误,应为邮箱或手机"
    },
    {
        ele:"#txtPwd",
		nullmsg:"密码不能为空",
        datatype:"*6-20",
        errormsg:"密码长度应在6~20位之间"
    }];
	
	/*--注册(手机)提示信息--*/
	vobjs.regmobile_msg=[{
        ele:"#tm_mobile",
		nullmsg:"手机号不能为空",
        datatype:"reg_havamobile" 
    },
    {
        ele:"#tm_vc",
		nullmsg:"验证码不能为空",
        datatype:"*6-6",
        errormsg:"验证码长度为6位"
    },
    {
        ele:"#tm_pw",
		nullmsg:"设置密码不能为空",
        datatype:"*6-20",
        errormsg:"设置密码长度应在6~20位之间"
    },
    {
        ele:"#tm_repw",
		nullmsg:"确认密码不能为空",
        datatype:"*6-20",
        errormsg:"设置密码与确认密码不一致",
		recheck:"tm_pw" 
    }];
	
	/*--注册(邮箱)提示信息--*/
	vobjs.regemail_msg=[{
        ele:"#te_email",
		nullmsg:"邮箱不能为空",
        datatype:"reg_haveemail",
    },
    {
        ele:"#te_pw",
        datatype:"*6-20",
        nullmsg:"设置密码不能为空",
        errormsg:"设置密码长度应在6~20位之间"
    },
    {
        ele:"#te_repw",
		nullmsg:"确认密码不能为空",
		datatype:"*6-20",
		recheck:"te_pw",
        errormsg:"设置密码与确认密码不一致"
    },
    {
        ele:"#te_vc",
		nullmsg:"验证码不能为空",
        datatype:"*4-4",
        errormsg:"验证码长度为4位"
    }]
	
	/*--收货地址添加提示信息--*/
	vobjs.adr_addmsg=[{
        ele:"#dzx_01",
		nullmsg:"收货人不能为空",
        datatype:rules.UserName,
		errormsg:"收货人只能包含字母、数字、汉字、下划线"
    },
    {
        ele:"#SelProvince",
		nullmsg:"请选择收货省份",
        datatype:"adr_address"
    },
    {
        ele:"#dzx_03",
		nullmsg:"详细地址不能为空",
        datatype:"*5-200",
        errormsg:"请认真填写详细地址"
    },
    {
        ele:"#dzx_04_01",
        datatype:"adr_mp",
		nullmsg:"手机号码不为空",
		errormsg:"手机号码格式错误"
    },
	{
        ele:"#dzx_04_02",
        datatype:"adr_mp",
		nullmsg:"手机号码或固定电话至少选一个",
		errormsg:"固定电话格式错误"
    }];
	
	/*--收货地址更新提示信息--*/
	vobjs.adr_updatemsg=[{
        ele:"#b_dzx_01",
		nullmsg:"收货人不能为空",
        datatype:rules.UserName,
		errormsg:"收货人只能包含字母、数字、汉字、下划线"
    },
    {
        ele:"#selProvince_update",
		nullmsg:"请选择收货省市",
        datatype:"adr_address"
    },
    {
        ele:"#b_dzx_03",
		nullmsg:"详细地址不能为空",
        datatype:"*5-200",
        errormsg:"请认真填写详细地址"
    },
    {
        ele:"#b_dzx_04_01",
        datatype:"adr_mp",
		nullmsg:"手机号码不为空",
		errormsg:"手机号码格式错误"
    },
	{
        ele:"#b_dzx_04_02",
        datatype:"adr_mp",
		nullmsg:"手机号码或固定电话至少选一个",
		errormsg:"固定电话格式错误"
    }];
	
	
	/*--安全设置-修改邮箱1--*/
	vobjs.ss_email1msg=[
	{
        ele:"#ss_emailtext",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	/*--安全设置-修改邮箱2--*/
	vobjs.ss_email2msg=[
	{
        ele:"#ss_emailtext21",
		nullmsg:"新邮箱不能为空",
        datatype:"e",
		errormsg:"新邮箱格式错误"
    },
	{
        ele:"#ss_emailtext22",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	/*--安全设置-修改绑定手机1--*/
	vobjs.ss_pd1msg=[
	{
        ele:"#ss_emailtext",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	/*--安全设置-修改绑定手机2--*/
	vobjs.ss_bp2msg=[
	{
        ele:"#ss_emailtext21",
		nullmsg:"新手机不能为空",
        datatype:"m",
		errormsg:"新手机格式错误"
    },
	{
        ele:"#ss_emailtext22",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	/*--安全设置-修改密码1--*/
	vobjs.ss_pwd1msg=[
	{
        ele:"#ss_pwdtext",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	/*--安全设置-修改密码2--*/
	vobjs.ss_pwd2msg=[
	{
        ele:"#ss_pwdtext21",
		nullmsg:"新密码不能为空",
        datatype:"n6-20|s6-20",
		errormsg:"新密码长度为6-20位"
    },
	{
        ele:"#ss_pwdtext22",
		nullmsg:"重复密码不能为空",
        datatype:"n6-20|s6-20",
		errormsg:"重复密码与新密码不一致",
		recheck:"pwd"
    }];
	
	/*--安全设置-绑定手机1--*/
	vobjs.ss_phone1msg=[
	{
        ele:"#ss_phonetext",
		nullmsg:"绑定手机号码不能为空",
        datatype:"m",
		errormsg:"绑定手机号码格式不正确"
    }];
	
	/*--安全设置-绑定手机2--*/
	vobjs.ss_phone2msg=[
	{
        ele:"#ss_phonetext",
		nullmsg:"验证码不能为空",
        datatype:"n6-6",
		errormsg:"验证码长度为6位"
    }];
	
	
	return vobjs;
};