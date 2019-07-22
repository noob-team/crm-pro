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
            $query3 = "SELECT * FROM parenttable ;";
            $query4 = "SELECT * FROM contacttable ;";

            $res1 = mysqli_query($db,$query1);
            $res2 = mysqli_query($db,$query2);
            $res3 = mysqli_query($db,$query3);
            $res4 = mysqli_query($db,$query4);

            $res1 = mysqli_fetch_all($res1);
            $res2 = mysqli_fetch_all($res2);      
            $res3 = mysqli_fetch_all($res3);      
            $res4 = mysqli_fetch_all($res4);      


            $arr = array(
                "accounts" => $res1,
                "users" => $res2,
                "parents" => $res3,
                "contacts" => $res4
            );
            echo json_encode($arr);
        }
        else if($name == "getdates"){
            $query1 = "SELECT * from calltable";
            $query2 = "SELECT * from tasktable";
            
            $res1 = mysqli_query($db,$query1);
            $res2 = mysqli_query($db,$query2);

            $res1 = mysqli_fetch_all($res1);
            $res2 = mysqli_fetch_all($res2);      
            
            $arr = array(
                "calls" => $res1,
                "tasks" => $res2
            );
            echo json_encode($arr);

        }
    }
?>
