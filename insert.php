<?php
include('dbConnection.php');

// stripslashes


$data   = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);

$id   = $mydata['student_id'];
$name = $mydata['student_name'];
$email = $mydata['student_email'];
$phone = $mydata['student_phone'];
$semester = $mydata['student_semester'];

//Insert Data
//if (!empty($name) && !empty($email) && !empty($phone) && !empty($semester) )
//{
//    $sql = "INSERT INTO student(name,email,phone,semester)VALUES ('$name','$email','$phone','$semester')";
//
//    if ($conn->query($sql) == TRUE)
//    {
//        echo "Student Saved Succesfully";
//    }else
//        {
//            echo "Student Not Saved";
//        }
//}else
//{
//    echo "Fill All Fields";
//}

//Insert or Update Data
if (!empty($name) && !empty($email) && !empty($phone) && !empty($semester) )
{
    $sql = "INSERT INTO student(id,name,email,phone,semester)VALUES ('$id','$name','$email','$phone','$semester')

       ON DUPLICATE KEY  UPDATE  name ='$name', email='$email',phone='$phone',semester='$semester'";

    if ($conn->query($sql) == TRUE)
    {
        echo "Student Saved Succesfully";
    }else
    {
        echo "Student Not Saved";
    }
}else
{
    echo "Fill All Fields";
}
?>