<?php
    ##ob_start();
    if(isset($_POST['submit'])){
        session_start();
        $_SESSION['nba']=$_POST['nba'];
        header('Location:nba_result.php');
    }
?>
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>喜欢的NBA人物</title>
</head>
<body>
    <div style="margin:0 auto;width:800px;height:400px;">
        <form action="" method="post">
            <label>
                NBA球星：
                <select name="nba">
                    <option value='詹姆斯'>詹姆斯</option>
                    <option value='韦德'>韦德</option>
                    <option selected value='杜兰特'>杜兰特</option>
                    <option value='维斯布鲁克'>维斯布鲁克</option>
                    <option value='邓肯'>邓肯</option>
                    <option value='加内特'>加内特</option>
                    <option value='乔丹'>乔丹</option>
                    <option value='约翰逊'>约翰逊</option>
                    <option value='科比'>科比</option>
                    <option value='安东尼'>安东尼</option>
                    <option value='霍华德'>霍华德</option>
                    <option value='波什'>波什</option>
                    <option value='奥尼尔'>奥尼尔</option>
                    <option value='奥拉朱旺'>奥拉朱旺</option>
                    <option value='张伯伦'>张伯伦</option>
                    <option value='摩西马龙'>摩西马龙</option>
                    <option value='尤因'>尤因</option>
                    <option value='保罗'>保罗</option>
                    <option value='格里芬'>格里芬</option>
                    <option value='诺维茨基'>诺维茨基</option>
                    <option value='乐福'>乐福</option>
                    <option value='戴维斯'>戴维斯</option>
                    <option value='欧文'>欧文</option>
                    <option value='麦格克雷迪'>麦格克雷迪</option>
                    <option value='卡特'>卡特</option>
                </select>
            </label>
            <input type="submit" name='submit' value="喜欢">
        </form>
    </div>
</body>