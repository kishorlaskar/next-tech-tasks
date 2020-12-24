<?php
include('dbConnection.php');

// stripslashes


$data   = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);

$id   = $mydata['subject_id'];
$name = $mydata['subject_name'];
$code = $mydata['subject_code'];
$credit = $mydata['subject_credit'];


//Insert or Update Data
if (!empty($name) && !empty($code) && !empty($credit))
{
    $sql = "INSERT INTO subject(id,subject_name,subject_code,credit)VALUES ('$id','$name','$code','$credit')

       ON DUPLICATE KEY  UPDATE  subject_name ='$name', subject_code='$code',credit='$credit'";

    if ($conn->query($sql) == TRUE)
    {
        echo "Subject Saved Succesfully";
    }else
    {
        echo "Subject Not Saved";
    }
}else
{
    echo "Fill All Fields";
}
?>