<?php
include('dbConnection.php');
$data   = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['subid'];

$sql = "SELECT * FROM subject WHERE id ={$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

//Returning json format data response to ajax call
echo json_encode($row);

?>