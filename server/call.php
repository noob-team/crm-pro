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
        if($name == "createcall" ){
            $data = $_POST["data"];
            $name = $data["name"];
            $desc = $data["desc"];
            $status = $data["status"];
            $direction = $data["direction"];

            $parent = $data["parent"];
            $parentid = $data["parentid"];
            $assigneduser = $data["assigneduser"];
            
            $startdate = $data["startdate"];
            $starttime = $data["starttime"];
            $enddate = $data["enddate"];
            $endtime = $data["endtime"];

            $userAtt=null;
            $contAtt=null;

            if(isset($data["userAtt"]))
                $userAtt = $data["userAtt"];
            if(isset($data["contAtt"]))
                $contAtt = $data["contAtt"];


            $duraiton = $data["duration"];
            $emailinmins = $data["emailtimings"];
                       

            $query1 = "INSERT INTO `calltable` 
            (`id`, `callname`, `calldesc`, `callparentname`, `callparentid`, `callstatus`, `calldirection`, `callstartdate`, `callstarttime`, `callenddate`, `callendtime`, `callduration`, `callemailstatus`, `assigneduser`) VALUES 
            (NULL, '$name', '$desc', '$parent', '$parentid', '$status', '$direction', '$startdate', '$starttime', '$enddate', '$endtime', '$duraiton', '$emailinmins', '$assigneduser')
            ";
            
            $res1 = mysqli_query($db, $query1); 
            
            $id = $db->insert_id;

            if($userAtt){
                foreach($userAtt as $user){
                    $querysub ="INSERT INTO `calluserattendees` (`callid`, `useremail`) VALUES ('$id', '$user')";
                    $res = mysqli_query($db, $querysub); 
                    if(!$res){
                        $error="Error creating user attendee...".$db->error;
                        $arr = array(
                            "error" => $error
                        );
                        echo json_encode($arr);
                    }
                }
            }

            if($contAtt){
                foreach($contAtt as $user){
                    $querysub ="INSERT INTO `callcontactattendees` (`callid`, `contemail`) VALUES ('$id', '$user')";
                    $res = mysqli_query($db, $querysub); 
                    if(!$res){
                        $error="Error creating contact attendee...".$db->error;
                        $arr = array(
                            "error" => $error
                        );
                        echo json_encode($arr);
                    }
                }
            }

            if($res1){
                $succ="Account created";
                $arr = array(
                     "success" => $succ
                );
                echo json_encode($arr);
            }
            else{
                $error="Error creating call...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }

        }
        else if($name == "getallcalls" ){
            $query = "SELECT * FROM calltable C,parenttable P,usertable U where C.assigneduser=U.useremail and C.callparentname=P.parenttablename";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);     

            $parent = array();
            foreach($data as $row){
                $tablename = $row[15];
                $tableid = $row[16];
                $email = $row[4];
                $query1 = "Select * from $tablename T where T.$tableid = '$email'";
                $res = mysqli_query($db, $query1);
                $res = mysqli_fetch_row($res);    
                $parent[] = $res;
            }

            $arr = array(
                "data" => $data,
                "parent"=> $parent
            );

            
            echo json_encode($arr);             
        }
        else if($name == "getcall"){
            $id = $_POST['email'];
            $query = "SELECT * FROM calltable A,usertable U,parenttable P where A.id='$id' and A.assigneduser=U.useremail and A.callparentname=P.parenttablename";
            $results = mysqli_query($db, $query);           

            if($results){
                $data = mysqli_fetch_row($results);
                
                $query2 = "SELECT * FROM `callcontactattendees` C , `contacttable` CC where C.callid='$id' and C.contemail=CC.contemail";
                $query3 = "SELECT * FROM `calluserattendees` C , `usertable` CC where C.callid='$id' and C.useremail=CC.useremail";
                
                $res1 =  mysqli_query($db, $query2);  
                $res2 =  mysqli_query($db, $query3);  

                $res1 = mysqli_fetch_all($res1);
                $res2 = mysqli_fetch_all($res2);


                $tablename = $data[20];
                $tableid = $data[21];
                $email = $data[4];
                $query1 = "Select * from $tablename T where T.$tableid = '$email'";
                $res3 = mysqli_query($db, $query1);
                $res3 = mysqli_fetch_row($res3);    

                
                $arr = array(
                     "userInfo" => $data,
                     "userAtt" => $res2,
                     "contAtt" => $res1,
                     "parent" => $res3
                );
                echo json_encode($arr);
            }
            else{
                $error="No account found!";
                $arr = array(
                    "error" => $error
                );
                echo json_encode($arr);
            }
        
        }
        else if($name=="updateCallInfo"){
           
            $data = $_POST["data"];
            $id = $data["id"];
            $name = $data["name"];
            $desc = $data["desc"];
            $status = $data["status"];
            $direction = $data["direction"];

            $parent = $data["parent"];
            $parentid = $data["parentid"];
            $assigneduser = $data["assigneduser"];
            
            $startdate = $data["startdate"];
            $starttime = $data["starttime"];
            $enddate = $data["enddate"];
            $endtime = $data["endtime"];

            $userAtt=null;
            $contAtt=null;

            if(isset($data["userAtt"]))
                $userAtt = $data["userAtt"];
            if(isset($data["contAtt"]))
                $contAtt = $data["contAtt"];


            $duraiton = $data["duration"];
            $emailinmins = $data["emailtimings"];

            $query = "
            UPDATE `calltable` SET 
                `callname` = '$name',
                `calldesc` = '$desc',
                `callparentname` = '$parent',
                `callparentid` = '$parentid',
                `callstatus` = '$status', 
                `calldirection` = '$direction',
                `callstartdate` = '$startdate', `callstarttime` = '$starttime',
                `callenddate` = '$enddate', `callendtime` = '$endtime', 
                `callduration` = '$duraiton',
                `callemailstatus` = '$emailinmins',
                `assigneduser` = '$assigneduser' WHERE `calltable`.`id` = $id 
            ";

            $res = mysqli_query($db,$query);

            if($res){
                $query = "DELETE FROM `calluserattendees` where callid = $id ";
                $res2 = mysqli_query($db,$query);
                if($res2)
                    if($userAtt){
                        foreach($userAtt as $user){
                            $querysub ="INSERT INTO `calluserattendees` (`callid`, `useremail`) VALUES ('$id', '$user')";
                            $res = mysqli_query($db, $querysub); 
                            if(!$res){
                                $error="Error creating user attendee...".$db->error;
                                $arr = array(
                                    "error" => $error
                                );
                                echo json_encode($arr);
                            }
                        }
                    }
                $query = "DELETE FROM `callcontactattendees` where callid = $id "; 
                $res2 = mysqli_query($db,$query);
                if($res2)
                    if($contAtt){
                        foreach($contAtt as $user){
                            $querysub ="INSERT INTO `callcontactattendees` (`callid`, `contemail`) VALUES ('$id', '$user')";
                            $res = mysqli_query($db, $querysub); 
                            if(!$res){
                                $error="Error creating contact attendee...".$db->error;
                                $arr = array(
                                    "error" => $error
                                );
                                echo json_encode($arr);
                            }
                        }
                }
                
                $sucess="Update Successful";
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
        else if($name=="deleteCall"){
            $email = $_POST["email"];
            $query = "DELETE from calltable where id='$email'";
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
        else if($name=="deleteMultipleCalls"){
            $emails = $_POST["email"];
            $string = rtrim(implode("','", $emails), "','");
           
            $string = "'".$string."'";
            $query = "DELETE from calltable where id in ( $string ) ";
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
        
    }
?>
