<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>mysql测试</title>
<style type="text/css">
		.mstheme{
			height:50px;
			line-height:50px;
			font-size:24px;
			text-align:center;
			color:#060;
		}
		.msbtn1{
		  width:1000px;
		  margin:20px auto;
		  box-sizing:border-box;
		  padding:20px;
		}
		.msbtn1 p{
			text-align:center;
			height:30px;
			line-height:30px;
			width:100%;
			float:left;
			margin:10px 0 0 0;
			cursor:pointer;
			border-width:1px;
			border-style:solid;
			border-radius:3px;
			font-size:12px;
		}
		.msbtn1 p:hover{
				text-decoration:underline;
		}
		.msbtn1 p:nth-child(1){
			border-color:#01C305;
			color:#01C305;
		}
		.msbtn1 p:nth-child(2){
			border-color:#02A8E4;
			color:#02A8E4;
		}
		.msbtn1 p:nth-child(3){
			border-color:#0388DD;
			color:#0388DD;
		}
		.msbtn1 p:nth-child(4){
			border-color:#9501BD;
			color:#9501BD;
		}
		.msbtn1 p:nth-child(5){
			border-color:#555;
			color:#555;
		}
		.msbtn1 p:nth-child(6){
			border-color:#E46B01;
			color:#E46B01;
		}
		.msbtn1 p:nth-child(7){
			border-color:#840002;
			color:#840002;
		}
		.msbtn1 p:nth-child(8){
			border-color:#C40105;
			color:#C40105;
		}
</style>
</head>
<body>
	<p class="mstheme">MySQL测试</p><hr />
	<div class="msbtn1">
	   <p id="mysql_open">数据库连接</p>
	   <p id="mysql_db">数据库创建</p>
	   <p id="mysql_table">表创建</p>
     <p id="mysql_insert">表插入</p>
     <p id="mysql_query">表查询</p>
     <p id="mysql_update">表更新</p>
     <p id="mysql_delete">表删除</p>
	   <p id="mysql_close">数据库关闭</p>
	</div>
  <?php 
      error_reporting(0);
			$sqllink;
			
			//打开连接
      function ms_Open(){
				try {
				    $GLOBALS['sqllink']=mysql_connect('localhost:3306','root','123456',false);
				   // mysql_query("SET NAMES 'utf8'",$GLOBALS['sqllink']);
            echo 'console.log("正在连接数据库资源！")';
				} catch (Exception $e) {
				    echo 'console.log("抱歉，连接数据库资源失败！")';
				}  
      }
      
      //创建数据库
			function ms_db(){
			    if($GLOBALS['sqllink']){
			        try {
			            mysql_query('create database testyp',$GLOBALS['sqllink']);
			            echo 'console.log("恭喜，创建数据库\'testyp\'成功！")';
			        } catch (Exception $e) {
			            echo 'console.log("抱歉，创建数据库\'testyp\'失败！")';
			        }
			    }else{
			        echo 'console.log("抱歉！数据库资源未连接！")';
			        return false; 
			    }
			}
			
			//创建表
			function ms_Table(){
			    $str='create table yp_info(
		          tid int,
		          title varchar(100),
		          content varchar(1000),
		          Primary key(tid)
		      )';
			    mysql_select_db("testyp",$GLOBALS['sqllink']);
			    if($GLOBALS['sqllink']){
			        mysql_query($str,$GLOBALS['sqllink']);
			        echo 'console.log("恭喜，创建表成功！")';
			    }else{
			        echo 'console.log("抱歉，创建表失败！")';
			    }
			}
			
			//插入表
			function ms_Insert(){
			    if($GLOBALS['sqllink']){
			        mysql_select_db("testyp",$GLOBALS['sqllink']);
			        mysql_query('insert into yp_info (title,content) values("aaa","To solve the PHP MySQL query into Chinese garbled.")');
			        //mysql_query('insert into yp_info (title,content) values("bbb","PHP cannot insert the Chinese record for MYSQL")');
			        echo 'console.log("恭喜，插入表成功！")';
			    }else{
			        echo 'console.log("抱歉，插入表失败！")';
			    }
			    
			    
			}
			
			//查询表
			function ms_Query(){
			    $res='';
			    if($GLOBALS['sqllink']){
			        mysql_select_db("testyp",$GLOBALS['sqllink']);
			        $res=mysql_query('select title,content from yp_info');
			        echo 'console.log("恭喜，查询表成功")';
			    }else{
			        echo 'console.log("抱歉，查询表失败！")';
			    }  
			}
			
			//更新表
			function ms_Update(){
			    if($GLOBALS['sqllink']){
			        mysql_select_db("testyp",$GLOBALS['sqllink']);
			        mysql_query('update yp_info set title="bbb",content="PHP cannot insert the Chinese record for MYSQL" where tid=0');
			        echo 'console.log("恭喜，更新表成功！")';
			    }else{
			        echo 'console.log("抱歉，更新表失败！")';
			    }
			}
			
			//删除表
			function ms_Delete(){
			    if($GLOBALS['sqllink']){
			        mysql_select_db("testyp",$GLOBALS['sqllink']);
			        mysql_query('delete from yp_info where tid=0');
			        echo 'console.log("恭喜，删除表成功！")';
			    }else{
			        echo 'console.log("抱歉，删除表失败！")';
			    }
			}
			
			
			//关闭连接
			function ms_Close(){
			    mysql_close($GLOBALS['sqllink']);
			    echo 'console.log("连接正在关闭！")';
			}
  ?>
  <script>
			(function(){
				
				
				var opendb=document.getElementById('mysql_open'),
						db=document.getElementById('mysql_db'),
						table=document.getElementById('mysql_table'),
						insert=document.getElementById('mysql_insert'),
						query=document.getElementById('mysql_query'),
						update=document.getElementById('mysql_update'),
						del=document.getElementById('mysql_delete'),
						closedb=document.getElementById('mysql_close');
						
						
				//打开数据库
				opendb.onclick=function(){
						<?php
						  ms_Open();
            ?>
				};
				
				//创建数据库
				db.onclick=function(){
						<?php 
						  ms_db();
						?>
				
				};
				
				//创建数据表
				table.onclick=function(){
					<?php 
					  ms_Table();
					?>
				
				};
				
				//插入表
				insert.onclick=function(){
					<?php 
						ms_Insert();
					?>
						
				
				};
				
				//查询表
				query.onclick=function(){
					<?php 
					   ms_Query();
					?>
				
				};
				
				//更新表
				update.onclick=function(){
					<?php 
					   ms_Update();
					?>
				};
				
				//删除表
				del.onclick=function(){
					<?php 
					   ms_Delete();
					?>
				};
				
				//关闭数据库
				closedb.onclick=function(){
						<?php 
						  ms_Close();
					  ?>
				};
				
				
			}());
  </script>
</body>










