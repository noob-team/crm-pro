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
        if($name == "createcontact" ){
            $data = $_POST["data"];
            $email = $data["email"];
            $name = $data["name"];
            $telephone1 = $data["telephone1"];

            $billingstreetaddr=$data["billingstreetaddr"];
            $billingcityaddr = $data["billingcityaddr"];
            $billingstate = $data["billingstate"];
            $billingpostal = $data["billingpostal"];
            $billingcountry = $data["billingcountry"];

            $accountid = $data["accountid"];
            $desc = $data["desc"];
            $assigneduser = $data["assigneduser"];

            $query = "
            INSERT INTO `contacttable` 
            (`contemail`, `contname`, `contphone`, `contstreet`, `contcity`, `contstate`, `constpostal`, `constcountry`, `constdesc`, `constaccountemail`, `constassigneduser`) VALUES 
            ('$email', '$name', '$telephone1', '$billingstreetaddr', '$billingcityaddr', '$billingstate', '$billingpostal', '$billingpostal', '$desc', '$accountid', '$assigneduser');
            
            ";
            
            $res1 = mysqli_query($db, $query); 

            if($res1){
                $succ="Contact created";
                $arr = array(
                     "success" => $succ
                );
                echo json_encode($arr);
            }
            else{
                $error="Error creating contact...";
                $arr = array(
                    "error" => $error
                );
                echo json_encode($arr);
            }

        }
        else if($name == "getallcontacts" ){
            $query = "SELECT * FROM contacttable C,accounttable A where C.constaccountemail=A.accountemail";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);            
            echo json_encode($data);             
        }
        else if($name == "getcontact"){
            $email = $_POST['email'];
            $query = "SELECT * FROM contacttable C,accounttable A,usertable U where C.constassigneduser=U.useremail and C.constaccountemail=A.accountemail and C.contemail='$email'";
            $results = mysqli_query($db, $query);
            if($results){
                $data = mysqli_fetch_row($results);     
                $arr = array(
                     "userInfo" => $data
                );
                echo json_encode($arr);
            }
            else{
                $error="No contact found!";
                $arr = array(
                    "error" => $error
                );
                echo json_encode($arr);
            }
        
        }
        else if($name=="updateContactInfo"){
            $oldemail = $_POST["oldEmail"];
            $data = $_POST["newdata"];

            $newemail = $data["email"];
            $name = $data["name"];
            $telephone1 = $data["telephone1"];

            $billingstreetaddr=$data["billingstreetaddr"];
            $billingcityaddr = $data["billingcityaddr"];
            $billingstate = $data["billingstate"];
            $billingpostal = $data["billingpostal"];
            $billingcountry = $data["billingcountry"];

            $accountid = $data["accountid"];
            $desc = $data["desc"];
            $assigneduser = $data["assigneduser"];

            $query1 = "
            UPDATE `contacttable` SET 
            `contemail` = '$newemail',                         
            `contname` = '$name', 
            `contphone` = '$telephone1', 
            `contstreet` = '$billingstreetaddr',
            `contcity` = '$billingcityaddr', 
            `contstate` = '$billingstate', 
            `constpostal` = '$billingpostal',
            `constcountry` = '$billingcountry',
            `constdesc` = '$desc',
            `constaccountemail` = '$accountid',
            `constassigneduser` = '$assigneduser'
             WHERE `contacttable`.`contemail` = '$oldemail' ";

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
        else if($name=="deleteContact"){
            $email = $_POST["email"];
            $query = "DELETE from contacttable where contemail='$email'";
            $res1= mysqli_query($db, $query);

            if($res1){
                $sucess="Delete Successful";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);
            }
            else{
                $error="Error Deleting contact...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }
        }
        else if($name=="deleteMultipleContacts"){
            $emails = $_POST["email"];
            $string = rtrim(implode("','", $emails), "','");
           
            $string = "'".$string."'";
            $query = "DELETE from contacttable where contemail in ( $string ) ";
            $res1= mysqli_query($db, $query);

            if($res1){
                $sucess="Delete Successful";
                $arr = array(
                    "success" => $sucess
                );
                echo json_encode($arr);
            }
            else{
                $error="Error Deleting contact...";
                $arr = array(
                    "error" => $error.$db->error
                );
                echo json_encode($arr);
            }
        }
        
    }
?>
