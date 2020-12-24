
$(document).ready(function () {
    //Ajax Request for Retriving Data
    function showData()
    {
        output="";
        $.ajax({
            url:"retrive.php",
            method: "GET",
            dataType: "json",
            success: function (data)
            {
                  // console.log(data);
                 if (data)
                 {
                     x = data;
                 }else {
                     x ="";
                 }
                 for (i=0; i<x.length; i++)
                 {
                    // console.log(x[i]);
                     output +="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"
                         +x[i].phone+"</td><td>"+x[i].semester+
                         "</td><td><button class='btn btn-warning btn-sm btn-edit' data-sid="+x[i].id+">Edit</button>" +
                         "<button class='btn btn-danger btn-sm btn-delete' data-sid="+x[i].id+">Delete</button></td></tr>";
                 }
                 $("#tbody").html(output);
            }

        })
    }
showData();

    //Ajax Request for Insert Data
$("#btnadd").click(function (e) {
   e.preventDefault();
   console.log("Save Button Clicked");
   let stid = $("#studentid").val();
   let nm = $("#nameid").val();
   let em = $("#emailid").val();
   let ph = $("#phoneid").val();
   let se = $("#semasterid").val();

    // console.log(name);
    // console.log(email);
    // console.log(phone);
    // console.log(semester);
    mydata = {
        student_id:stid,
        student_name:nm,
        student_email:em,
        student_phone:ph,
        student_semester:se
    }
    // console.log(mydata);

    $.ajax({
        url:"insert.php",
        type:"POST",
        data: JSON.stringify(mydata),
        success: function (data)
        {
            // console.log(data);
            msg ="<div class='alert alert-danger mt-3'>"+data+"</div>";
            $("#msg").html(msg);
            $("#myForm")[0].reset();
            showData();
        },
    });
});
  //Ajax Request for Deleting Data
    $("tbody").on("click",".btn-delete", function () {
              console.log("Delete Button Clicked");
              let id=$(this).attr("data-sid");
              // console.log(id);
              mydata = {sid:id};
              mythis = this;
              $.ajax({
                  url:"delete.php",
                  method: "POST",
                  data: JSON.stringify(mydata),
                  success : function (data)
                  {
                      if (data == 1)
                      {
                          msg ="<div class='alert alert-danger mt-4'>Student Deleted Successfully</div>";
                          $(mythis).closest("tr").fadeOut();
                      }else if(data == 0)
                      {
                          msg ="<div class='alert alert-danger mt-4'>Unable to Delete Student</div>";
                      }
                      // console.log(data);

                      $("#msg").html(msg);

                  }
              });
    });
    //Ajax Request for Editing Data
    $("tbody").on("click",".btn-edit", function () {
        console.log("Edit Button Clicked");
        let id=$(this).attr("data-sid");
            // console.log(id);
        mydata = {sid:id};
        // mythis = this;
        $.ajax({
            url: "edit.php",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
              // console.log(data);
                $("#studentid").val(data.id);
                $("#nameid").val(data.name);
                $("#emailid").val(data.email);
                $("#phoneid").val(data.phone);
                $("#semasterid").val(data.semester);

            },
        });
    });
});