<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $user = "root";
    $pass = "";
    $database = "crm";
    $db = new mysqli($servername, $user, $pass, $database);
    if($db->connect_error){
        die("Connection Failed".$db->connect_error);
    }
    else{
        $name = $_POST["name"];
        if($name == "createtask" ){
            $data = $_POST["data"];
            $name = $data["name"];
            $desc = $data["desc"];
            $status = $data["status"];
            $priority = $data["priority"];

            $parent = $data["parent"];
            $parentid = $data["parentid"];
            $assigneduser = $data["assigneduser"];
            
            $startdate = $data["startdate"];
            $starttime = $data["starttime"];
            $enddate = $data["enddate"];
            $endtime = $data["endtime"];
                       

            $query1 = "INSERT INTO `tasktable` 
            (`taskid`, `taskname`, `taskdescription`, `taskparent`, `tasktarget`, `taskstatus`, `taskpriority`, `taskstartdate`, `taskstarttime`, `taskenddate`, `taskendtime`, `taskuseremail`) VALUES 
            (NULL, '$name', '$desc', '$parent', '$parentid', '$status', '$priority', '$startdate', '$starttime', '$enddate', '$endtime','$assigneduser')
            ";
            
            $res1 = mysqli_query($db, $query1); 

            if($res1){
                $succ="Account created";
                $arr = array(
                     "success" => $succ
                );
                echo json_encode($arr);
            }
            else{
                $error="Error creating task...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }

        }
        else if($name == "getalltasks" ){
            $query = "SELECT * FROM tasktable C,parenttable P,usertable U where C.taskuseremail=U.useremail and C.taskparent=P.parenttablename";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);     
            $arr = array(
                "data" => $data
            );            
            echo json_encode($arr);             
        }
        
        else if($name == "gettask"){
            $id = $_POST['email'];
            $query = "SELECT * FROM tasktable C,parenttable P,usertable U where C.taskuseremail=U.useremail and C.taskparent=P.parenttablename and C.taskid = $id ";
            $results = mysqli_query($db, $query);           

            if($results){
                $data = mysqli_fetch_row($results);

                $tablename = $data[2];
                $tableid = $data[14];
                $email = $data[3];
                $query1 = "Select * from $tablename T where T.$tableid = '$email'";
                $res3 = mysqli_query($db, $query1);
                $res3 = mysqli_fetch_row($res3);    

                
                $arr = array(
                     "userInfo" => $data,
                     "parent" => $res3
                );
                echo json_encode($arr);
            }
            else{
                $error="No task found!";
                $arr = array(
                    "error" => $error
                );
                echo json_encode($arr);
            }
        
        }
        else if($name=="updateTaskInfo"){
           
            $data = $_POST["data"];
            $id = $data["id"];
            $name = $data["name"];
            $desc = $data["desc"];
            $status = $data["status"];
            $priority = $data["priority"];

            $parent = $data["parent"];
            $parentid = $data["parentid"];
            $assigneduser = $data["assigneduser"];
            
            $startdate = $data["startdate"];
            $starttime = $data["starttime"];
            $enddate = $data["enddate"];
            $endtime = $data["endtime"];

            $query = "
            UPDATE `tasktable` SET 
                `taskname` = '$name',
                `taskdescription` = '$desc',
                `taskparent` = '$parent',
                `tasktarget` = '$parentid',
                `taskstatus` = '$status', 
                `taskpriority` = '$priority',
                `taskstartdate` = '$startdate', `taskstarttime` = '$starttime',
                `taskenddate` = '$enddate', `taskendtime` = '$endtime', 
                `taskuseremail` = '$assigneduser' WHERE `tasktable`.`taskid` = $id 
            ";

            $res = mysqli_query($db,$query);

            if($res){               
                $sucess="Update Successful";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);
            }
            else{
                $error="Error updating...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }


        }
        else if($name=="deleteTask"){
            $email = $_POST["email"];
            $query = "DELETE from tasktable where taskid='$email'";
            $res1= mysqli_query($db, $query);

            if($res1){
                $sucess="Delete Successful";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);
            }
            else{
                $error="Error Deleting account...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }
        }
        else if($name=="deleteMultipleTasks"){
            $emails = $_POST["email"];
            $string = rtrim(implode("','", $emails), "','");
           
            $string = "'".$string."'";
            $query = "DELETE from tasktable where taskid in ( $string ) ";
            $res1= mysqli_query($db, $query);

            if($res1){
                $sucess="Delete Successful";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);
            }
            else{
                $error="Error Deleting tasks...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }
        }
        
    }
?>
