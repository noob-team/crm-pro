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
        if($name == "login" ){
            $username = $_POST['username'];
            $password = $_POST['password'];
            $password = md5($password);
            $admintype =$_POST['admintype'];
            if (empty($username)) {
              $error="Username is required";
              $arr = array(
                "error" => $error
              );
              echo json_encode($arr);
            }
            else if (empty($password)) {
                $error="Password is required";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
            }
          
            else {
              $query = "SELECT * FROM admintable WHERE adminname='$username' AND adminpass='$password' AND admintype='$admintype'";
              $results = mysqli_query($db, $query); 
              if (mysqli_num_rows($results) == 1) {
                $successs=$username;
                $arr = array(
                  "username" => $successs
                );
                echo json_encode($arr);
              }else {
                $error="Wrong username/password combination";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
              }
            }

        }
        else if($name == "register"){

            $username = $_POST['username'];
            $password1 = $_POST['password1'];
            $password2 = $_POST['password2'];
            $password = md5($password1);
            $admintype =$_POST['admintype'];
            if (empty($username)) {
              $error="Username is required";
              $arr = array(
                "error" => $error
              );
              echo json_encode($arr);
            }
            else if (empty($password1)) {
                $error="Password is required";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
            }
            else if($password1!=$password2){
                $error="Password Mismatch";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
            }
            else {
              $query = "SELECT * FROM admintable WHERE adminname='$username' AND admintype='$admintype'";
              $results = mysqli_query($db, $query);    
              if (mysqli_num_rows($results) == 1) {
                $error="Username and account already exists";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
              }
              else {
                
                $query = "INSERT INTO `admintable` (`adminid`, `admintype`, `adminname`, `adminpass`) VALUES (NULL, '$admintype', '$username', '$password')";
                mysqli_query($db, $query);
                $successs=$username;
                $arr = array(
                  "username" => $successs
                );
                echo json_encode($arr);
              }
            }
        }

    }
?>
