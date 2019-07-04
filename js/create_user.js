document.querySelector("#sidebar")
    .getElementsByClassName("fa-user")[0]
    .parentElement.parentElement
    .classList.add("active-link");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "server/user.php",
        data: { name: "getallteam" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Error Loading teams.." });
        }
        else {
            let teams = `<div class="input-field col s12 m6">
        <select id = "teamid" name = "team">
                <option value="" disabled selected>Choose your Team</option>
    `;
            let accountFormContents = '';

            for (var i = 0; i < result.length; i++) {
                let template = `<option value="${result[i][0]}">${result[i][1]}</option>`
                teams += template;
            }
            teams += `         </select>
                        <label>Team</label>
                    </div>`;

            $.ajax({
                type: "POST",
                url: "server/user.php",
                data: { name: "getallroles" }
            }).done(function (data) {
                var result = $.parseJSON(data);
                let roles = `<div class="input-field col s12 m6">
                            <select id = "roleid" name = "role">
                                    <option value="" disabled selected>Choose your Role</option>
                        `;
                if (result.error) {
                    M.toast({ html: "Error Loading Roles.." });
                }
                else {
                    let roleFormContents = '';

                    for (var i = 0; i < result.length; i++) {
                        let template = `<option value="${result[i][0]}">${result[i][1]}</option>`
                        roles += template;
                    }
                    roles += `</select>
                    <label>Role</label>
                </div>`;

                    accountFormContents = `
                <div id = "modal-form" class="col s12">
                    <div class="row">
                         <div class="input-field col s12 m12">
                            <input id="name" name = "fullname" type="text" class="validate" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="emailid" name = "email" type="email" class="validate" required>
                            <label for="emailid">Email</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="telephoneid" name = "mobile" type="tel" class="validate" required>
                            <label for="telephoneid">Mobile</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="passwordid" name = "password" type="text" class="validate" required>
                            <label for="passwordid">Password</label>
                        </div>
                        <div class="input-field col s12 m6">
                                <select id = "genderid" name = "gender">
                                    <option value="" disabled selected>Choose your Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Neutral">Neutral</option>
                                </select>
                                <label>Type</label>
                        </div>       
                        ${teams}   
                        ${roles}     
                        <div class = "center">
                            <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
                        </div>     
                    </div>
                    
                </div>
        `;
                    document.getElementById('formdata').innerHTML = accountFormContents;
                    var elems = document.querySelectorAll('select');
                    var instances = M.FormSelect.init(elems);

                    $(function () {
                        $("#modal-btn").on('click', function () {
                            var username = $("#name").val();
                            var email = $("#emailid").val();
                            var phone = $("#telephoneid").val();
                            var gender = $("#genderid").val();
                            var password = $("#passwordid").val();
                            var team = $("#teamid").val();
                            var role = $("#roleid").val();
                            $.ajax({
                                type: "POST",
                                url: "server/user.php",
                                data: { "name": 'createuser', "username": username, "password": password, "email": email, "phone": phone, "gender": gender, "team": team, "role": role }
                            }).done(function (data) {
                                var result = $.parseJSON(data);
                                if (result.error) {
                                    M.toast({ html: result.error });
                                }
                                else {
                                    window.open("users.html", '_self');
                                }

                            })


                        });
                    });
                }
            });
        }
    });
});

