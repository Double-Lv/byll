<?php
$stream = $_POST['image'];

if (preg_match('/(?<=\/)[^\/]+(?=\;)/',$stream,$pregR)) $streamFileType ='.' .$pregR[0];  
$streamFileRand = date('YmdHis').rand(1000,9999);    

$streamFilename = "output/".$streamFileRand .$streamFileType;

preg_match('/(?<=base64,)[\S|\s]+/',$stream,$streamForW);
file_put_contents($streamFilename,base64_decode($streamForW[0]));

echo 'php/'.$streamFilename;

?>