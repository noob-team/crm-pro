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
        if($name == "getaccountanduser"){
            $query1 = "SELECT * FROM accounttable ;";
            $query2 = "SELECT * FROM usertable ;";
            
            $res1 = mysqli_query($db,$query1);
            $res2 = mysqli_query($db,$query2);


            $res1 = mysqli_fetch_all($res1);
            $res2 = mysqli_fetch_all($res2);      


            $arr = array(
                "accounts" => $res1,
                "users" => $res2
            );
            echo json_encode($arr);
        }
    }
?>
