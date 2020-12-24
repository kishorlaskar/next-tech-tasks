<?php
include('dbConnection.php');

// Retrive Student Information

   $sql   = "SELECT * FROM student";
   $result = $conn->query($sql);
   if ($result->num_rows > 0)
   {
       $data = array();
       while ($row = $result->fetch_assoc())
       {
           $data[] = $row;
       }
   }
   //Returning json format data response to ajax call
  echo json_encode($data);


?>