<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
    <link rel="stylesheet" href="css/login.css">

    <title>CRM Login</title>
    <style>
        form{
            margin:0 30px;
        }
        #container{
            width:500px;
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
        }
    </style>

</head>
<body>
    <div id="container">
            <div class="card">
                <div style="background:#3f51b5">
                    <img src="images/logo.png" alt="" class="image-responsive">
                </div>
                <div class="card-content">
                    <form action="login.php" method="post">
                    	<?php include('error.php');?>
                        <div class="input-field">
                            <select name="admintype">
                                <option value="Administrator" selected="">Administrator</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Support Manager">Support Manager</option>
                            </select>
                            <label>User</label>
                        </div>
                        <div class="input-field">
                              <input id="username" name="username" type="text" class="validate">
         					  <label for="username">Username</label>
                        </div>
                        <div class="input-field">
                              <input id="password" name="password" type="password" class="validate">
         					  <label for="password">Password</label>
                        </div>
                        <div class="input-field">
                            <button class="btn indigo darken-1" name="login_user">Login</button>
                        </div>
                    </form>
                </div>
                <div class="card-action">
  					<a href="register.php">Sign up</a>
                </div>
        </div>
    </div>

    <!-- jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <script>
        $(document).ready(function(){
            $('select').formSelect();
        });
    </script>

</body>
</html>