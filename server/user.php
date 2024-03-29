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
        else if($name == "getallteam"){
            $query = "SELECT * FROM teamtable";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);            
            echo json_encode($data);
        }
        else if($name == "getallroles"){
            $query = "SELECT * FROM roletable";
            $results = mysqli_query($db, $query);
            $data = mysqli_fetch_all($results);            
            echo json_encode($data);
        }
        else if($name == 'createuser'){
            $username = $_POST["username"];
            $email = $_POST["email"];
            $phone = $_POST["phone"];
            $gender = $_POST["gender"];
            $password = $_POST["password"];
            $team = $_POST["team"];
            $role = $_POST["role"];
            if (empty($username)) {
                $error="Username is required";
                $arr = array(
                  "error" => $error
                );
                echo json_encode($arr);
              }
              else if (empty($email)) {
                  $error="Email is required";
                  $arr = array(
                    "error" => $error
                  );
                  echo json_encode($arr);
              }
            else if (empty($phone)) {
                        $error="Phone Number is required";
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
            else{
                $query = "INSERT INTO `usertable` (`useremail`, `username`, `userphone`, `usergender`, `userpassword`) VALUES ('$email', '$username', '$phone', '$gender', '$password')";
                $query1 = "INSERT INTO `userroletable` (`useremail`, `roleid`) VALUES ('$email', '$role')";
                $query2 = "INSERT INTO `userteamtable` (`useremail`, `teamid`) VALUES ('$email', '$team')";

                $res1= mysqli_query($db, $query);
                $res2= mysqli_query($db, $query1);
                $res3= mysqli_query($db, $query2);

                if($res1){
                    $succ="User created";
                    $arr = array(
                         "success" => $succ
                    );
                    echo json_encode($arr);
                }
                else{
                    $error="Error creating user...";
                    $arr = array(
                        "error" => $error
                    );
                    echo json_encode($arr);
                }

            }
        }
        else if($name=="getuser"){
            $email = $_POST["email"];
            $query1 = "SELECT * FROM usertable where useremail = '$email'";
            $query2 = "SELECT * FROM userroletable U,teamtable T,roletable R where U.useremail='$email' and U.roleid=R.roleid and R.teamid = T.teamid";
            //TODO : task table
            //TODO : Meetings
            //TODO: calls
            
            $res1 = mysqli_query($db,$query1);
            $res2 = mysqli_query($db,$query2);


            $res1 = mysqli_fetch_row($res1);
            $res2 = mysqli_fetch_all($res2);      


            $arr = array(
                "userInfo" => $res1,
                "userTeam" => $res2
            );
            echo json_encode($arr);

        }
        else if($name=="updateUserInfo"){
            $oldValues = $_POST["oldValues"];
            $newValues = $_POST["newValues"];
            
            $oldEmail = $oldValues['email'];
            $refNewEmail = $newValues["email"];
            $newName = $newValues["name"];
            $newPhone = $newValues["phone"];
            $newGender = $newValues["gender"];
            $newPassword = $newValues["password"];

            
            $query1 = "UPDATE `usertable` SET 
                `useremail` = '$refNewEmail',
                `username` = '$newName',
                `userphone` = $newPhone,
                `usergender` = '$newGender',
                `userpassword` = '$newPassword'            
            WHERE `usertable`.`useremail` = '$oldEmail'";


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
                    "error" => $error
                );
                echo json_encode($arr);
            }

        }
        else if($name=="deleteUser"){
            $email = $_POST["email"];
            $query = "DELETE from usertable where useremail='$email'";
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
        else if($name=="deleteMultipleUsers"){
            $emails = $_POST["email"];
            $string = rtrim(implode("','", $emails), "','");
           
            $string = "'".$string."'";
            $query = "DELETE from usertable where useremail in ( $string ) ";
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
