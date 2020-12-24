<?php
include('dbConnection.php');
$data   = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['subid'];


if (!empty($id))
{
    $sql = "DELETE FROM subject WHERE id ={$id}";
    if ($conn->query($sql) == TRUE)
    {
        echo 1;
    }else
    {
        echo 0;
    }

}
?>