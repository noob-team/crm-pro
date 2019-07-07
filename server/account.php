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
        if($name == "createaccount" ){
            $data = $_POST["data"];
            $email = $data["email"];
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

            $query = "
            INSERT INTO `accounttable` 
            (`accountemail`, `accountname`, `accountwebsite`, `accountphone1`, `accountphone2`, `accountbillingstreet`, `accountbillingcity`, `accountbillingstate`, `accountbillingpostal`, `accountbillingcountry`, `accountshippingstreet`, `accountshippingcity`, `accountshippingstate`, `accountshippingpostal`, `accountshippingcountry`, `accountType`, `accountGST`, `accountIndustry`, `accountDescription`, `assigneduseremail`) VALUES 
            ('$email', '$name', '$website', '$telephone1', '$telephone2', ' $billingstreetaddr', '$billingcityaddr', '$billingstate', '$billingpostal', '$billingcountry', '$shippingstreetaddr', '$shippingcityaddr', '$shippingstate', '$shippingpostal', '$shippingcountry', '$usertype', '$gstno', '$indsustryType', '$desc', '$assigneduser');
            ";
            
            $res1 = mysqli_query($db, $query); 

            if($res1){
                $succ="Account created";
                $arr = array(
                     "success" => $succ
                );
                echo json_encode($arr);
            }
            else{
                $error="Error creating account...";
                $arr = array(
                    "error" => $error
                );
                echo json_encode($arr);
            }

        }
        else if($name == "getallaccounts" ){
            $query = "SELECT * FROM accounttable";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);            
            echo json_encode($data);             
        }
        else if($name == "getaccount"){
            $email = $_POST['email'];
            $query = "SELECT * FROM accounttable A,usertable U where A.accountemail='$email' and A.assigneduseremail=U.useremail ";
            $results = mysqli_query($db, $query);
            if($results){
                $data = mysqli_fetch_row($results);     
                $arr = array(
                     "userInfo" => $data
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
        
    }
?>
