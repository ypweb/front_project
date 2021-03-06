<?php
        session_start();
        
        $ww=778;
        $wh=178;
        
        //绘画区域
        $wrap=imagecreatetruecolor($ww,$wh);
        $text=imagecreatetruecolor(80,20);
        
        //(设置颜色)背景颜色
        $bg=imagecolorallocate($wrap,255,255,255);
        
        //随机生成颜色
        $lines=array();
        $len=10;
        for($i=0;$i<$len;$i++){
            $la=rand(0,255);
            $lb=rand(0,255);
            $lc=rand(0,255);
            $ld=$la.$lb.$lc;
            array_push($lines,$ld);
        }
        
        //填充背景颜色
        imagefill($wrap,0,0,$bg);
        imagefill($text,0,0,$bg);
        
        //画字符
        $str='';
        $slen=6;
        for($j=0;$j<$slen;$j++){
            $r=rand(0,9);
            imagechar($text,2,$j*15,rand(0,5),$r,$lines[rand(0,$len-1)]);
            $str.=$r;
        }
        imagecopyresized($wrap,$text,0,0,0,0,$ww,$wh,80,20);
        
        //将字符存入session中
        $_SESSION['validcode']=$str;
        
        //画线条
        for($j=0;$j<3;$j++){
            imageline($wrap,rand(0,$ww),rand(0,$wh),rand(10,$ww-$wh),rand(5,$wh),$lines[rand(0,$len-1)]);
        }
        
        //画其弧线
        for($j=0;$j<3;$j++){
            imagearc($wrap,rand(10,$ww-10),rand(10,$wh-10),rand(10,$wh),rand(10,$wh),rand(0,360),rand(0,360),$lines[rand(0,$len-1)]);
        }
        
        //画点缀干扰
        for($j=0;$j<100;$j++){
            imagesetpixel($wrap,(rand(0,100)/100)*$ww,(rand(0,100)/100)*$wh,$lines[rand(0,$len-1)]);
        }
        
        
        //imagechar($wrap,2,($ww/$slen)*$j,rand(10,$wh-10),$r,$lines[rand(0,$len-1)]);
        
        //标头
        header('Content-type:image/png');
        imagepng($wrap);
        imagedestroy($wrap);
        
?>









