(function($,w){
		//依赖自定义规则
		var email=Valid_Rule.email,
				mobilephone=Valid_Rule.mobilephone,
				num=Valid_Rule.num,
				moneyy=Valid_Rule.moneyy,
				moneyqw=Valid_Rule.moneyqw,
				moneybw=Valid_Rule.moneybw,
				moneysw=Valid_Rule.moneysw,
				moneyw=Valid_Rule.moneyw,
				moneyq=Valid_Rule.moneyq,
				moneyb=Valid_Rule.moneyb,
				money=Valid_Rule.money;

		var valid_fnobj=function(){
						/*密码强度*/
						this.pwdStrong=function(str,tip,scope){
									var score=0,
									txt=this.trims(str),
									len=txt==''?0:txt.length,
									reg1=/[a-zA-Z]+/,
									reg2=/[0-9]+/,
									reg3=/\W+\D+/;
									if(len>=scope[0]&&len<=scope[1]){
										if(reg1.test(txt) && reg2.test(txt) && reg3.test(txt)) {
											score=90;
										}else if(reg1.test(txt) || reg2.test(txt) || reg3.test(txt)) {
											if(reg1.test(txt) && reg2.test(txt)){
												score=60;
											}else if(reg1.test(txt) && reg3.test(txt)) {
												score=60;
											}else if(reg2.test(txt) && reg3.test(txt)) {
												score=60;
											}else{
												score=30;
											}
										}
										if(score<=50){
											tip.removeClass().addClass('g-c-gray2').html('低级');
										}else if(score<=79&&50<score){
											tip.removeClass().addClass('g-c-orange').html('中级');
										}else if(score>=80){
											tip.removeClass().addClass('g-c-red2').html('高级');
										}
									}else if(txt==""||txt=="null"){
										tip.removeClass().addClass('g-c-gray2').html('');
									}else if(txt!=""&&len<scope[0]){
										tip.removeClass().addClass('g-c-red2').html('密码长度至少大于'+scope[0]+'位');
									}else{
										tip.removeClass().addClass('g-c-gray2').html('');
									}
							}
							/*读秒*/
							this.getCount=function(tid,times,nodes){
									var count=0,
									id=tid,
									t=times,
									n=nodes;
									n.html(times+'秒后重新获取').attr({"disabled":"disabled"}),
									timer=this.getTimer();
									id=setInterval(function(){
											count=timer();
											count=count<=t?count:count%t;
											n.html((t-count)+'秒后重新获取');
											if(count==t||count==0){
												clearInterval(id);
												tid=null;
												id=null;
												n.removeAttr("disabled").html('获取验证码');
											};
									},1000);
							}
		}
				
		valid_fnobj.prototype={
					/*去除所有空格*/
					trims:function(str){
						return str.replace(/\s*/g,'');
					},
					/*去除前后空格*/
					trim:function(str){
						return str.replace(/^\s*\s*$/,'');
					},
					//去除指示的字符（字符串,需去除字符)
					trimSep:function(str,sep){
						return str.replace(new RegExp('\\'+sep,'g'),'');
					},
					/*判断邮箱*/
					isEmail:function(str){
						return email.test(this.trims(str))?true:false;
					},
					/*判断手机*/
					isMobilePhone:function(str){
						return mobilephone.test(this.trims(str))?true:false;
					},
					/*判断邮箱或者手机*/
					isEMP:function(str){
						if(!this.isEmail(str)&&!this.isMobilePhone(str)){
								return false;
						}else{
								return true;
						}
					},
					/*判空*/
					isRequire:function(str){
							return this.trims(str)==''?true:false;
					},
					/*判断是否相等*/
					isEqual:function(str1,str2){
							return this.trims(str1)==this.trims(str2)?true:false;
					},
					/*判断是否是数值*/
					isNum:function(str){
							return num.test(this.trims(str))?true:false;
					},
					/*判断数据范围*/
					isMinMax:function(str,arr){
							var len=str.length;
							return (len<arr[1]||len==arr[1])&&(len>arr[0]||len==arr[0])?true:false;
					},
					/*计时器*/
					getTimer:function(){
							var i=0;
							return function(){
									return ++i;
							}; 
					},
					//最大为亿(字符串)
					isMoneyY:function(str){
							return moneyy.test(this.trims(str))?true:false;
					},
					//最大为千万(字符串)
					isMoneyQW:function(str){
							return moneyqw.test(this.trims(str))?true:false;
					},
					//最大为百万(字符串)
					isMoneyBW:function(str){
							return moneybw.test(this.trims(str))?true:false; 
					},
					//最大为十万(字符串)
					isMoneySW:function(str){
							return moneysw.test(this.trims(str))?true:false;
					},
					//最大为万(字符串)
					isMoneyW:function(str){
							return moneyw.test(this.trims(str))?true:false;
					},
					//最大为千(字符串)
					isMoneyQ:function(str){
							return moneyq.test(this.trims(str))?true:false; 
					},
					//最大为百(字符串)
					isMoneyB:function(str){
							return moneyb.test(this.trims(str))?true:false; 
					},
					//是否为正确的人民币格式(字符串)
					isMoney:function(str){
							return money.test(this.trims(str))?true:false; 
					},
					/*是否为正确身份证*/
					isIDCard:function(str){
						var area={
							'11':"北京",'12':"天津",'13':"河北",'14':"山西",'15':"内蒙古",'21':"辽宁",'22':"吉林",'23':"黑龙江",'31':"上海",'32':"江苏",'33':"浙江",'34':"安徽",'35':"福建",'36':"江西",'37':"山东",'41':"河南",'42':"湖北",'43':"湖南",'44':"广东",'45':"广西",'46':"海南",'50':"重庆",'51':"四川",'52':"贵州",'53':"云南",'54':"西藏",'61':"陕西",'62':"甘肃",'63':"青海",'64':"宁夏",'65':"新疆",'71':"台湾",'81':"香港",'82':"澳门",'91':"国外"
						},
						wf=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
						last=[1,0,'x',9,8,7,6,5,4,3,2],
						idcard=this.trims(str.toString()),
						len=idcard.length;
						//判断是否为有效位
						if(idcard==''||len<15||(len>15&&len<18)||len>18){
							return false;
						}else{
								//是否为为数字
								var nums=0,
									nlen=0;
								if(len==18){
									nums=idcard.slice(0,17).replace(/\D*/g,'');
								}else if(len==15){
									nums=idcard.slice(0,14).replace(/\D*/g,'');
								}
								nlen=nums.length;
								if(nlen<14||(nlen>14&&nlen<17)){
									return false;
								}
								//是否为有效地区
								if(area[idcard.slice(0,2)]==null){
									return false;
								}
								var years,
								months,
								days,
								sex;
								if(len==18){
									years=parseInt(idcard.slice(6,10));
									months=parseInt(idcard.slice(10,12));
									days=parseInt(idcard.slice(12,14));
									sex=parseInt(idcard.slice(16,17));
								}else if(len==15){
									years=parseInt(idcard.slice(6,8)) + 1900;
									months=parseInt(idcard.slice(8,10));
									days=parseInt(idcard.slice(10,12));
									sex=parseInt(idcard.slice(14));
								}
								//是否为有效月份
								if(months>12||months<1){
									return false;
								}
								//是否为有效天
								if(days<1){
									return false;
								}
								var leapyear=this.isLeapYear(years,months);
								if((leapyear.isly&&months==2&&days>29)||(!leapyear.isly&&months==2&&days>28)||(months!=2&&leapyear.m<days)){
									return false;
								}
								//是否为正确识别码
								if(len==18){
									var temparr=idcard.split(''),
									tempmax=0,
									i=0,
									haves=0,
									ids=parseInt(idcard.slice(17)),
									tempids=0;
									if(isNaN(ids)){
										ids='x';
									}
									for(i;i<17;i++){
										tempmax+=wf[i]*parseInt(temparr[i]);
									}
									haves=tempmax%11;
									tempids=last[haves];
									if(ids!=tempids){
										return false;
									}
								}
						}
						return true;
					},
					/*是否为闰年*/
					isLeapYear: function(y, m) {
							var m_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
							var isly = (y % 4 == 0 && y % 100 != 0 )? true : y % 400 == 0 ? true : false;
							isly ? m_arr.splice(1, 1, 29) : m_arr.splice(1, 1, 28);
							return m?{isly: isly,months: m_arr,m: m_arr[parseInt(m, 10) - 1]}:{isly: isly,months: m_arr}
					},
					//自动补全纠错人民币(字符串)，返回一个数组['格式化后的数据',带小数点的未格式化数据]
					moneyCorrect:function(str){
							var money=this.trimSep(str.toString(),','),
									moneyarr,
									len=0,
									partz,
									partx,
									tempstr='';
							
							money=this.trims(money);
							if(money==''){
								return ['0.00','0.00'];
							}
							if(money.lastIndexOf('.')!=-1){
									moneyarr=money.split('.');
									len=moneyarr.length;
									if(len>2){
											partz=moneyarr[len-2];
											partx=moneyarr[len-1];
									}else{
											partz=moneyarr[0];
											partx=moneyarr[1];
									}
									if(!num.test(partx)){
										partx=partx.replace(/\D*/g,'');
									}
									if(partx.length==0){
										partx='.00';
									}else if(partx.length==1){
										partx='.'+partx+'0';
									}else if(partx.length>=2){
										partx='.'+partx.slice(0,2);
									}
							}else{
									partz=money;
									partx='.00';
							}
							if(!num.test(partz)){
									partz=partz.replace(/\D*/g,'');
							}
							tempstr=partz+partx;
							var templen=partz.length;
							if(templen>3){
									var i=0,j=1;
									partz=partz.split('').reverse();
									for(i;i<templen;i++){
											if(j%3==0&&j!=templen){
													partz.splice(i,1,','+partz[i].toString());
											}
											j++;
									}
									partz=partz.reverse().join('');
							}else if(templen==0){
								partz='0';
							}
							if(partz.length>=2){
								if(partz.charAt(0)=='0'||partz.charAt(0)==0){
									partz=partz.slice(1);
								}
							}
							return [partz+partx,tempstr];
					},
					//将人民币转换成大写（字符串，显示容器）
					toUpMoney:function(str,wraps){
							var cn_zero = "零",
									cn_one = "壹",
									cn_two = "贰",
									cn_three = "叁",
									cn_four = "肆",
									cn_five = "伍",
									cn_six = "陆",
									cn_seven = "柒",
									cn_height = "捌",
									cn_nine = "玖",
									cn_ten = "拾",
									cn_hundred = "佰",
									cn_thousand = "仟",
									cn_ten_thousand = "万",
									cn_hundred_million = "亿",
									cn_symbol="",
									cn_dollar = "元",
									cn_ten_cent = "角",
									cn_cent = "分",
									cn_integer = "整",
									integral,
									decimal,
									outputCharacters,
									parts,
									digits,
									radices,
									bigRadices,
									decimals,
									zeroCount,
									i,
									p,
									d,
									quotient,
									modulus,
									tvs=str.toString(),
									formatstr = tvs.replace(/^0+/,""),
									parts =formatstr.split(".");
							
							if (parts.length > 1) {
									integral = parts[0];
									decimal = parts[1];
									decimal = decimal.slice(0, 2);
							}else {
									integral = parts[0];
									decimal = "";
							}
							digits =[cn_zero, cn_one, cn_two, cn_three, cn_four, cn_five, cn_six, cn_seven, cn_height, cn_nine];
							radices =["", cn_ten, cn_hundred, cn_thousand];
							bigRadices =["", cn_ten_thousand, cn_hundred_million];
							decimals =[cn_ten_cent,cn_cent];
							outputCharacters = "";
							if (Number(integral) > 0) {
									zeroCount = 0;
									for (i = 0; i < integral.length; i++) {
											p = integral.length - i - 1;
											d = integral.substr(i, 1);
											quotient = p / 4;
											modulus = p % 4;
											if (d == "0") {
												zeroCount++;
											}else {
												if (zeroCount > 0){
													outputCharacters += digits[0];
												}
												zeroCount = 0;
												outputCharacters += digits[Number(d)] + radices[modulus];
											}
											if (modulus == 0 && zeroCount < 4){
												outputCharacters += bigRadices[quotient];
											}
									}
									outputCharacters += cn_dollar;
							}
							if (decimal != "") {
									for (i = 0; i < decimal.length; i++) {
											d = decimal.substr(i, 1);
											if (d != "0") {
												outputCharacters += digits[Number(d)] + decimals[i];
											}
									}
							}
							if (outputCharacters == "") {
									outputCharacters = cn_zero + cn_dollar;
							}
							if (decimal == "") {
									outputCharacters += cn_integer;
							}
							outputCharacters = cn_symbol + outputCharacters;
							
							if(wraps){
								return wraps.innerHTML=outputCharacters;
							}else{
								return outputCharacters;
							}
					},
					////银行卡格式化（字符串）
					cardFormat:function(str){
						var cardno=str.toString().replace(/\s*/g,'');
						if(cardno==''){
							return '';
						}
						cardno=cardno.split('');
						var len=cardno.length,
						i=0,
						j=1;
						for(i;i<len;i++){
							if(j%4==0&&j!=len){
								cardno.splice(i,1,cardno[i]+" ");
							}
							j++;
						}
						return cardno.join('');
					},
					////手机格式化
					phoneFormat:function(str){
						var phoneno=str.toString().replace(/\s*/g,'');
						if(phoneno==''){
							return '';
						}
						phoneno=phoneno.split('');
						
						var len=phoneno.length,
						i=0;
						for(i;i<len;i++){
							var j=i+2;
							if(i!=0){
								if(i==2){
									phoneno.splice(i,1,phoneno[i]+" ");
								}else if(j%4==0&&j!=len+1){
									phoneno.splice(i,1,phoneno[i]+" ");
								}
							}
						}
						return phoneno.join('');
					},
					//光标定位至具体位置(需定位元素,[元素中字符],定位位置，[是否在特定位置的前或者后])
					cursorPos:function(elem,str,index,flag){
							var vals='',
								len=0;
							if(!str){
								vals=elem.value||elem.innerHTML;
								len=vals.length;
							}else{
								len = str.lengt
							}
							pos=Number(index);
							
							if(isNaN(pos)){
								pos=str.indexOf(index);
							}
		
							//elem.focus();	
							setTimeout(function() {
								if (elem.setSelectionRange) {
									if(!flag){
										elem.setSelectionRange(pos,pos);
									}else{
										elem.setSelectionRange(pos+1,pos+1);
									}
								} else {
									var range = elem.createTextRange();
									range.moveStart("character", -len);
									range.moveEnd("character", -len);
									if(!flag){
										range.moveStart("character", pos);
									}else{
										range.moveStart("character", pos+1);
									}
									range.moveEnd("character", 0);
									range.select();
								}
							},0);
					}
					
					
		};
		w.ValidFn=new valid_fnobj();	
})(Zepto,window);