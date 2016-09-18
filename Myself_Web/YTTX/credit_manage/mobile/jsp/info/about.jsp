<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" 		uri="http://java.sun.com/jsp/jstl/functions"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,maximum-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="telephone=no" name="format-detection">
<meta name="description" content="信用卡管理--关于我们">
<meta name="keywords" content="信用卡管理--关于我们">
<title>信用卡管理--关于我们</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/mobile/css/info.css">
</head>
<body>


    <!--详情-->
    <section class="info-wrap">
    		
        <div>
        		<h2>关于我们</h2>
            <div>
              <p>深圳市银通天下移动支付有限公司是高新奇科技股份有限公司旗下子公司，高新奇科技股份有限公司成立于1997年，是广东省100强制造企业、深圳50强民营企业和通信行业10强企业，自有现代化工业园区17万平方米，产品制造一体化，拥有电脑全自动贴片生产线及现代化综合生产线60余条，拥有员工5000余名。</p>
              <p>深圳市银通天下移动支付有限公司是集移动支付终端产品研发、生产、销售、金融业务培训与咨询等为一体的移动支付金融服务解决方案提供商及运营商。</p>
            </div>
        </div>
        
        
        <div>
        		<h2>关于产品</h2>
            <div>
              <p>银通天下APP是一款智能管理信用卡软件，通过智能解析信用卡电子账单，来实现持卡人用卡信息管理和个人财务的智能化应用，是集成在线办卡、管卡（智能账单管理、电子帐单收款、还款提醒、支付宝&amp;微信还款、F2B2C商城）、速贷、理财、资讯等综合性一站式金融服务平台。</p>
            </div>
        </div>
        
       
    </section>
</body>
</html>
