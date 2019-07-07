// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-user")[0]
    .parentElement.parentElement
    .classList.add("active-link");


var currentUrl = window.location.href;
var url = new URL(currentUrl);
var email = url.searchParams.get("email");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "user.php",
        data: { name: "getuser", 'email': email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error || result.userInfo == null) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userTeams = result.userTeam;

            var userCard = `
                <div class="row">
                <div class="col s12 m12 l12">
                <div class="card ">
                <div class="card-content">
                    <span class="card-title">Overview</span>
                    <div class="row">
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Full Name</p>
                                <input value="${userInfo[1]}" id="name" type="text" class="validate">
                        </div>
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Email Address</p>
                                <input value="${userInfo[0]}" id="email" type="text" class="validate">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Gender</p>
                            <select id = "gender" name = "gender">
                                <option id="0" value="Male">Male</option>
                                <option id="1" value="Female">Female</option>
                                <option id="2" value="Neutral">Neutral</option>
                            </select>
                        </div>
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Password</p>
                                <input value="${userInfo[4]}" id="password" type="password" class="validate">
                                <span>
                                    <label>
                                        <input type="checkbox" id="showPass"/>
                                        <span>Show Password</span>
                                    </label>
                                </span>
                        </div>
                        
                      
                    </div>
                    <div class="row">
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Phone Number</p>
                                <input value="${userInfo[2]}" id="phone" type="text" class="validate">
                            <button class="btn pulse waves-effect waves-light" style="background:#3f51b5" id="saveUserInfo" type="submit">Save Changes
                                <i class="material-icons right">save</i>
                            </button>
                        </div>
                    </div>

                </div>
                </div>
                </div>
            </div>
            `;

            var userTeamCard = '';


            if (userTeams) {
                userTeamCard = `
                <div class="row">
                    <div class="col s12 m6 l6">
                        <div class="card ">
                            <div class="card-content">
                                <span class="card-title">Teams</span>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                   `;

                for (var i = 0; i < userTeams.length; i++) {
                    var template = `
                    <tr>
                        <td>${userTeams[i][5]}</td>
                        <td>${userTeams[i][3]}</td>    
                    </tr>                
                    `;
                    userTeamCard += template;
                }

                userTeamCard += `
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                `;

            }


            document.getElementsByClassName('uniqElement')[0].innerHTML += (userCard + userTeamCard);

            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            var list = ['Male', 'Female', 'Neutral'];
            var id = list.indexOf(userInfo[3]);
            document.getElementById(id).selected = true;
            $('#gender').formSelect();


            document.getElementById('showPass').onclick = function () {
                if (document.getElementById('showPass').checked) {
                    document.getElementById('password').type = 'text';
                } else {
                    document.getElementById('password').type = 'password';
                }
            }


            $(function () {
                $("#saveUserInfo").on('click', function () {

                    var oldValues = userInfo;
                    var email = document.getElementById('email').value;
                    var name = document.getElementById('name').value;
                    var gender = document.getElementById('gender').value;
                    var password = document.getElementById('password').value;
                    var phone = document.getElementById('phone').value;

                    var oldValues = { "email": oldValues[0], "name": oldValues[1], "phone": oldValues[2], "gender": oldValues[3], "password": oldValues[4] };
                    var newValues = { "email": email, "name": name, "phone": phone, "gender": gender, "password": password };

                    $.ajax({
                        type: "POST",
                        url: SERVER_PATH + "user.php",
                        data: { "name": "updateUserInfo", "oldValues": oldValues, "newValues": newValues }
                    }).done(function (data) {
                        console.log(data);
                        var result = $.parseJSON(data);
                        if (result.error) {
                            M.toast({ html: result.error });
                        }
                        else {
                            M.toast({ html: result.success });
                        }

                    })


                });
            });




        }

    });
});

