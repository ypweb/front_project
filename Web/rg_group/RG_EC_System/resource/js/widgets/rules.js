/*
author:yipin,
name:rule 
定义相关规则
*/
define({
	  //邮箱
		email:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/,
		//手机
		mobilephone:/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/,
		//数字
		num:/^[0-9]{0,}$/g,
		//格式化钱--亿
		moneyy:/^(([1-9]{1}\d{0,8})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--千万
		moneyqw:/^(([1-9]{1}\d{0,7})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--百万
		moneybw:/^(([1-9]{1}\d{0,6})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--十万
		moneysw:/^(([1-9]{1}\d{0,5})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--万
		moneyw:/^(([1-9]{1}\d{0,4})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--千
		moneyq:/^(([1-9]{1}\d{0,3})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//格式化钱--百
		moneyb:/^(([1-9]{1}\d{0,2})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/,
		//钱
		money:/^(([1-9]{1}\d{0,})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/
});