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
        else if($name=="updateAccountInfo"){
            $oldemail = $_POST["oldEmail"];
            $data = $_POST["newdata"];

            $newemail = $data["email"];
            $name = $data["name"];
            $website = $data["website"];
            $telephone1 = $data["telephone1"];
            $telephone2 = $data["telephone2"];

            $billingstreetaddr=$data["billingstreetaddr"];
            $billingcityaddr = $data["billingcityaddr"];
            $billingstate = $data["billingstate"];
            $billingpostal = $data["billingpostal"];
            $billingcountry = $data["billingcountry"];

            $shippingstreetaddr = $data["shippingstreetaddr"];
            $shippingcityaddr = $data["shippingcityaddr"];
            $shippingstate = $data["shippingstate"];
            $shippingpostal = $data["shippingpostal"];
            $shippingcountry = $data["shippingcountry"];

            $indsustryType = $data["indsustryType"];
            $usertype = $data["usertype"];
            $gstno = $data["gstno"];
            $desc = $data["desc"];
            $assigneduser = $data["assigneduser"];

            $query1 = "UPDATE `accounttable` SET 
            `accountemail` = '$newemail',
            `accountname` = '$name',
            `accountwebsite` = '$website',
            `accountphone1` = '$telephone1',
            `accountphone2` = '$telephone2',

            `accountbillingstreet` = '$billingstreetaddr',
            `accountbillingcity` = '$billingcityaddr',
            `accountbillingstate` = '$billingstate',
            `accountbillingpostal` = '$billingpostal',
            `accountbillingcountry` = '$billingcountry',

            `accountshippingstreet` = '$shippingstreetaddr',
            `accountshippingcity` = '$shippingcityaddr',
            `accountshippingstate` = '$shippingstate',
            `accountshippingpostal` = '$shippingpostal',
            `accountshippingcountry` = '$shippingcountry',

            `accountType` = '$usertype',
            `accountGST` = '$gstno',
            `accountIndustry` = '$indsustryType',
            `accountDescription` = '$desc',
            `assigneduseremail` = '$assigneduser'

             WHERE `accounttable`.`accountemail` = '$oldemail'";

            $res1= mysqli_query($db, $query1);

            if($res1){
                
                $sucess="Updates Saved.";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);

            }
            else{
                $error="Error Updating account...";
                $arr = array(
                    "error" => $db->error
                );
                echo json_encode($arr);
            }

        }
        else if($name=="deleteAccount"){
            $email = $_POST["email"];
            $query = "DELETE from accounttable where accountemail='$email'";
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
        else if($name=="deleteMultipleAccounts"){
            $emails = $_POST["email"];
            $string = rtrim(implode("','", $emails), "','");
           
            $string = "'".$string."'";
            $query = "DELETE from accounttable where accountemail in ( $string ) ";
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
