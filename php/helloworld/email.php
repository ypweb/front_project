<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title></title>
</head>
<body>

<?php


         if(isset($_POST['submit'])){
            require_once 'PHPMailer/class.phpmailer.php';
           
            //表单对象
            $to=$_POST['To'];
            $from=$_POST['From'];
            $theme=$_POST['Theme'];
            $msg=$_POST['Msg'];
            
            //设置邮件基本信息
            $smtp='smtp.qq.com';
            $port='25';
            $username='461168849@qq.com';
            $password='yp15802549165';
            
            //
            $mail=new PHPMailer();
            $mail->IsSMTP();
            $mail->SMTPAuth=true;
            $mail->SMTPSecure='ssl';
            $mail->Host=$smtp;
            $mail->Port=$port;
            $mail->CharSet='gb2312';
            
            $mail->Username=$username;
            $mail->Password=$password;
            $mail->From=$from;
            $mail->FromName=$from;
            $mail->Subject=$theme;
            $mail->Body=$msg;
            
            $mail->IsHTML(true);
            $mail->AddAddress($to);
            
            //发送
            if(!$mail->Send()){
                echo '<p style="text-align:center;line-height:200px;height:200px;margin:10px auto;color:#c00;">你妹，发送失败<a href="test8.php">返回</a></p>';  
            }else{
                echo '<p style="text-align:center;line-height:200px;height:200px;margin:10px auto;color:#39d;">你妹，发送成功<a href="test8.php">返回</a></p>';
            }
            die();
            
            
            
            
        } 
    


//         require_once "PHPMailer/class.phpmailer.php";//email.class.php
        
//         $smtpserver = "smtp.qq.com";
//         $smtpserverport =25;
        
//         $smtpusermail = "461168849@qq.com";
//         $smtpuser = "461168849";//SMTP服务器的用户帐号
//         $smtppass = "yp15802549165";//SMTP服务器的用户密码
        
//         $to = $_POST['To'];
//         $theme = $_POST['Theme'];
//         $msg = $_POST['Msg'];
//         $type = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
//         $smtp = new smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
//         $smtp->debug = false;//是否显示发送的调试信息
//         $state = $smtp->sendmail($to, $smtpusermail, $theme, $msg, $type);
//         if($state==""){
//             echo '<p style="text-align:center;line-height:200px;height:200px;margin:10px auto;color:#c00;">你妹，发送失败<a href="test8.html">返回</a></p>';
//             exit();
//         }else{
//             echo '<p style="text-align:center;line-height:200px;height:200px;margin:10px auto;color:#39d;">你妹，发送成功<a href="test8.html">返回</a></p>';
            
//         }
?>

</body>
</html>








