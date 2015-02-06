<?php
$to = $_POST["To"];
$from = $_POST["From"];
$subject = $_POST["Subject"];
$text = $_POST["Text"];

if ($text == "") {
    $text = " ";
}

$data = array("to"=>$to,"from"=>$from,"subject"=>$subject,"text"=>$text);

$result = shell_exec("py/send.py ".json_encode(json_encode($data)));

?>


<!DOCTYPE html>
<html>
    
    <head>
		<title>MyMail</title>
		<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Quicksand:300' rel='stylesheet' type='text/css'>
		<!-- The main CSS file -->
        <link href="style.css" rel="stylesheet" />
        
    </head>
    
    <body>
        
        <form id="main" method="post" action="sendtest.php">
            <h1>MyMail</h1>
			<h6>by zhengchanghai.com</h6>			

			<p id="feedback">

<?php

if (trim($result) == "0") {
	echo "Succeed and <a href='index.html'>send more</a>";
} else {
	echo " Failed and <a href='index.html'>retry</a>";
}

?>

			</p>

        </form>
       
        <!-- JavaScript Includes -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>

    </body>
</html>


</body>
</html>
