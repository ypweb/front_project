<?php
        setcookie('nbaname','篮球之神',time()*30);
        session_start();
        $nba=$_SESSION['nba'];
        if(isset($_COOKIE['nbaname'])){
            $nbaname=$_COOKIE['nbaname'];
        }
?>
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>喜欢的NBA人物--<?php echo $nba?></title>
</head>
<body>
    <div style="margin:0 auto;width:800px;height:400px;">
                小样，你喜欢的nba球星是：<span style="color:#f00;padding:0 5px;"><?php echo $nba?></span><br/>
        cookie test：<span style="color:#f00;padding:0 5px;"><?php echo $nbaname?></span><span style="color:#f0f;padding:0 5px;" id="cookie"></span> 
        <script>
					var cookwrap=document.getElementById('cookie'),
					times=30,
					timeid=null;
					function cookTimes(n){
						cookwrap.innerHTML=n+'秒后失效';
						timeid=setTimeout(function(){
								cookTimes(n);
						},1000);
						n--;
						if(n<0){
								clearTimeout(timeid);
								timeid=null;
								cookwrap.innerHTML='';
						}
					}
					cookTimes(times);
        </script>       
    </div>
</body>