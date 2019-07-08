// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-address-book")[0]
    .parentElement.parentElement
    .classList.add("active-link");


var currentUrl = window.location.href;
var url = new URL(currentUrl);
var email = url.searchParams.get("email");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "mulitrequest.php",
        data: { name: "getaccountanduser" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (!result) {
            M.toast({ html: "Loading Error!" });
        }
        else {

            var userList = result.users;
            var accountList = result.accounts;

            let users = `<div class="input-field col s12 m12">
            <select id = "userid" name = "user" required="">
                    <option value="" disabled>Select a user</option>
        `;
            for (var i = 0; i < result.users.length; i++) {
                let template = `<option id="user${i}" value="${result.users[i][0]}"}">${result.users[i][1]}</option>`
                users += template;
            }
            users += `         </select>
                            <label>Assign User</label>
                        </div>`;

            let accounts = `<div class="input-field col s12 m12">
                        <select id = "accountid" name = "accounts" required="">
                                <option value="" disabled selected>Select a account</option>
                    `;

            for (var i = 0; i < result.accounts.length; i++) {
                let template = `<option id="acc${i}" value="${result.accounts[i][0]}"}">${result.accounts[i][1]}</option>`
                accounts += template;
            }
            accounts += `         </select>
                                        <label>Assign Account</label>
                                    </div>`;

            $(document).ready(function () {
                $.ajax({
                    type: "POST",
                    url: SERVER_PATH + "contact.php",
                    data: { name: "getcontact", "email": email }
                }).done(function (data) {
                    var result = $.parseJSON(data);
                    if (!result) {
                        M.toast({ html: "Loading Error!" });
                    }
                    else {
                        var userInfo = result.userInfo;

                        var userCard = `
            <div class="row">
            <div class="col col s12 m12 l12">
                <div id = "modal-form"  class="card">
                    <div class="card-content">
                        <span class="card-title">Overview</span>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <input id="name" name = "fullname" value='${userInfo[1]}' type="text" class="validate" required>
                                <label for="name" class="active">Name</label>
                            </div>
                            <div class="input-field col s12 m6">
                            <input id="emailid" name = "email" type="email" value='${userInfo[0]}' class="validate" required>
                            <label for="emailid" class="active">Email</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="telephoneid1" name = "mobile1" value='${userInfo[2]}' type="tel" class="validate" required>
                                <label for="telephoneid1" class="active">Mobile</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Address</span>
                        <div class="row">
                            <div class="input-field col s12 m6 l12">
                                <input id="billingstreetaddr" value='${userInfo[3]}' name = "billingstreetaddr" type="text" class="validate" required>
                                <label for="billingstreetaddr" class="active">Street Address</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingcityaddr" value='${userInfo[4]}' name = "billingcityaddr" type="text" class="validate" required>
                                <label for="billingcityaddr" class="active">City</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingstate" value='${userInfo[5]}' name = "billingstate" type="text" class="validate" required>
                                <label for="billingstate" class="active">State</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingpostal" value='${userInfo[6]}' name = "billingpostal" type="number" class="validate" required>
                                <label for="billingpostal" class="active">Zip/Postal Code</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                            <input id="billingcountry"value='${userInfo[7]}'  name = "billingcountry" type="text" class="validate" required>
                            <label for="billingcountry" class="active">Country</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        <div class="row">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <div class="row">
                            ${users}  
                            ${accounts}
                            <div class="input-field col s12 m6">
                                <textarea id="desc" class="materialize-textarea">${userInfo[8]}</textarea>
                                <label for="desc" class="active">Enter Description</label>
                          </div>       
                          <div class = "center">
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

                        document.getElementsByClassName('uniqElement')[0].innerHTML += (userCard);

                        var elems = document.querySelectorAll('select');
                        var instances = M.FormSelect.init(elems);

                        var id = "0";
                        for (var u = 0; u < userList.length; u++) {
                            if (userList[u][0] == userInfo[31]) {
                                id = u;
                                break;
                            }
                        }
                        var id = "user" + id;
                        document.getElementById(id).selected = true;
                        $('#userid').formSelect();



                        var id = "0";
                        for (var u = 0; u < userList.length; u++) {
                            if (accountList[u][0] == userInfo[11]) {
                                id = u;
                                break;
                            }
                        }
                        var id = "acc" + id;
                        document.getElementById(id).selected = true;
                        $('#accountid').formSelect();



                        $(function () {
                            $("#saveUserInfo").on('click', function () {

                                var oldEmail = email;

                                var data = {
                                    "name": document.getElementById('name').value,
                                    "email": document.getElementById('emailid').value,
                                    "telephone1": document.getElementById('telephoneid1').value,


                                    "billingstreetaddr": document.getElementById('billingstreetaddr').value,
                                    "billingcityaddr": document.getElementById('billingcityaddr').value,
                                    "billingstate": document.getElementById('billingstate').value,
                                    "billingpostal": document.getElementById('billingpostal').value,
                                    "billingcountry": document.getElementById('billingcountry').value,


                                    "accountid": document.getElementById('accountid').value,
                                    "desc": document.getElementById('desc').value,
                                    "assigneduser": document.getElementById('userid').value
                                };
                                $.ajax({
                                    type: "POST",
                                    url: SERVER_PATH + "contact.php",
                                    data: { "name": "updateContactInfo", "oldEmail": oldEmail, "newdata": data }
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






        }

    });
});

