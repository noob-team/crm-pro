<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $user = "root";
    $pass = "";
    $database = "crm";
    $db = new mysqli($servername, $user, $pass, $database);
    if($db->connect_error){
        die("Connection Failed");
    }
    else{
        $name = $_POST["name"];
        if($name == "getallusers" ){
               
            $query = "SELECT * FROM usertable";
            $results = mysqli_query($db, $query);
            
            $data = mysqli_fetch_all($results);
            
            echo json_encode($data);             
        
        }
        else if($name == "register"){


        }

    }
?>
