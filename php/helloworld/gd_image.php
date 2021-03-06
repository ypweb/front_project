<?php 
    //读取本地图片到内存
    try {
        //原始图片
        $rimg=imagecreatefromjpeg('images/test.jpg');
        //缩放图片
        $wimg=imagecreatefromjpeg('images/stest.jpg');
        //水印
        $wmimg=imagecreatefrompng('images/watermark.png');
    } catch (Exception $e) {
        
    }
    
    
    //获取计算所得图片的实际宽和高
    $rw=imagesx($rimg);
    $rh=imagesy($rimg);
    
    $wmw=imagesx($wmimg);
    $wmh=imagesy($wmimg);
    
    
    
    //计算缩放后所得宽和高
    $sw=$rw*0.5;
    $sh=$rh*0.5;
    
    //创建缩放后图片画布
    $simg=imagecreatetruecolor($sw, $sh);
    
    //拷贝缩放操作
    imagecopyresampled($simg,$rimg,0,0,0,0,$sw,$sh,$rw,$rh);
    //拷贝生成水印操作
    imagecopyresampled($wimg,$wmimg,$sw-$wmw-200,$sh-$wmh-100,0,0,$sw,$sh,$wmw,$wmh);
    
    //生成个性化水印
    $fonts="C:\Windows\Fonts\msyh.ttc";
    $wstr="nimei you huo!liu bi xie le.";
    $wstr=mb_convert_encoding($wstr,'UTF-8','GBK,GB2312');
    imagettftext($wimg,rand(15,30),rand(-20,20),5,$sw-50,rand(0,255).rand(0,255).rand(0,255),$fonts,$wstr);
    
    
    //生成图片至文件夹
    imagejpeg($simg,'images/stest.jpg');
    imagejpeg($wimg,'images/wtest.jpg');
    
    //清空内存
    imagedestroy($simg);
    imagedestroy($wimg);
?>
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>GD类测试</title>
<style type="text/css">
    .gd-vwrap{
	       box-sizing:border-box;
    	   margin:20px auto;
    	   height:200px;
    	   width:800px;
    	   padding:10px;
    	   border:1px solid #ccc;
    	   border-radius:3px;
    	   >img{
	           width:100%;
    	       height:100%;
    	       display:block;
    	       overflow:hidden;
    	   }
    }
    .gd-imgwrap{
	       box-sizing:border-box;
    	   margin:20px auto;
    	   padding:10px;
    	   width:90%;
    	   min-width:800px;
    }
    .gd-imgside,
    .gd-imgmain{
	       box-sizing:border-box;
    	   float:left;
    	   min-height:200px;
         >img{
	           box-sizing:border-box;
    	       overflow:hidden;
    	   }
    }
    .gd-imgside:after,
    .gd-imgmain:after{
	       clear:both;
    	   content:'';
    }
    .gd-imgside{
	       width:40%;
    }
    .gd-imgmain{
	       width:60%;
    }
    .gd-imgside:before,
    .gd-imgmain:before{
	       display:block;
    	   float:left;
    	   height:30px;
    	   width:100%;
    	   line-height:30px;
    	   text-indent:20px;
    	   font-size:12px;
    }
    .gd-imgside:nth-of-type(2):before{
	       content:'缩略图：';
    	   color:#090;
    	   
    }
    .gd-imgside:nth-of-type(3):before{
	       content:'缩略图同时加水印：';
    	   color:#069;
    	   
    }
    .gd-imgmain:before{
	       content:'原图：';
    	   color:#900;
    }
</style>
</head>
<body>
<p style="height:50px;line-height:50px;font-size:24px;text-align:center;color:#060;">GD测试(<span style="color:#c00;margin:0 3px 0 5px;">Graphics Draw</span>)</p><hr />
<div class="gd-vwrap"><img id="gd_img" src="gd.php" /></div>
<div class="gd-imgwrap">
    <div class="gd-imgmain">
        <img alt="test" src="images/test.jpg" />
    </div>
    <div class="gd-imgside">
        <img alt="test" src="images/stest.jpg" />
    </div>
    <div class="gd-imgside">
        <img alt="test" src="images/wtest.jpg" />
    </div>
</div>
</body>










