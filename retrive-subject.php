<?php
include('dbConnection.php');

// Retrive Student Information

$sql_sub   = "SELECT * FROM subject";
$result_sub = $conn->query($sql_sub);
if ($result_sub->num_rows > 0)
{
    $data_sub = array();
    while ($row = $result_sub->fetch_assoc())
    {
        $data_sub[] = $row;
    }
}
//Returning json format data response to ajax call
echo json_encode($data_sub);


?>