
$(document).ready(function () {
    //Ajax Request for Retriving Data
    function showSubjectdata()
    {
        output_subject="";
        $.ajax({
            url:"retrive-subject.php",
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
                    output_subject +="<tr><td>"+x[i].id+"</td><td>"+x[i].subject_name+"</td><td>"+x[i].subject_code+"</td><td>"
                        +x[i].credit+
                        "</td><td><button class='btn btn-warning btn-sm btn-edit' data-subid="+x[i].id+">Edit</button>" +
                        "<button class='btn btn-danger btn-sm btn-delete' data-subid="+x[i].id+">Delete</button></td></tr>";
                }
                $("#tbody").html(output_subject);
            },

        });
    }
    showSubjectdata();

    //Ajax Request for Insert Data
    $("#btnadd").click(function (e) {
        e.preventDefault();
        console.log("Save Button Clicked");
        let suid = $("#subjectid").val();
        let nm = $("#subjectnameid").val();
        let co = $("#codeid").val();
        let cr = $("#creditid").val();

        mydata = {
            subject_id:suid,
            subject_name:nm,
            subject_code:co,
            subject_credit:cr
        }
        // console.log(mydata);

        $.ajax({
            url:"insert-subject.php",
            type:"POST",
            data: JSON.stringify(mydata),
            success: function (data)
            {
                // console.log(data);
                msg ="<div class='alert alert-danger mt-3'>"+data+"</div>";
                $("#msg").html(msg);
                $("#myForm")[0].reset();
                showSubjectdata();
            },
        });
    });
    //Ajax Request for Deleting Data
    $("tbody").on("click",".btn-delete", function () {
        console.log("Delete Button Clicked");
        let id=$(this).attr("data-subid");
        // console.log(id);
        mydata = {subid:id};
        mythis = this;
        $.ajax({
            url:"delete-subject.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success : function (data)
            {
                if (data == 1)
                {
                    msg ="<div class='alert alert-danger mt-4'>Subject Deleted Successfully</div>";
                    $(mythis).closest("tr").fadeOut();
                }else if(data == 0)
                {
                    msg ="<div class='alert alert-danger mt-4'>Unable to Delete Subject</div>";
                }
                // console.log(data);

                $("#msg").html(msg);

            }
        });
    });
    //Ajax Request for Editing Data
    $("tbody").on("click",".btn-edit", function () {
        console.log("Edit Button Clicked");
        let id=$(this).attr("data-subid");
        // console.log(id);
        mydata = {subid:id};
        // mythis = this;
        $.ajax({
            url: "edit-subject.php",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
                // console.log(data);
                $("#subjectid").val(data.id);
                $("#subjectnameid").val(data.subject_name);
                $("#codeid").val(data.subject_code);
                $("#creditid").val(data.credit);
            },
        });
    });
});