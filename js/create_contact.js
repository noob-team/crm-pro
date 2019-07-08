document.querySelector("#sidebar")
    .getElementsByClassName("fa-address-book")[0]
    .parentElement.parentElement
    .classList.add("active-link");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "mulitrequest.php",
        data: { name: "getaccountanduser" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Error Loading teams.." });
        }
        else {
            let users = `<div class="input-field col s12 m12">
        <select id = "userid" name = "user" required="">
                <option value="" disabled selected>Select a user</option>
    `;
            for (var i = 0; i < result.users.length; i++) {
                let template = `<option value="${result.users[i][0]}"}">${result.users[i][1]}</option>`
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
                let template = `<option value="${result.accounts[i][0]}"}">${result.accounts[i][1]}</option>`
                accounts += template;
            }
            accounts += `         </select>
                                    <label>Assign Account</label>
                                </div>`;



            accountFormContents = `
                <div class="row">
                    <div class="col col s12 m12 l12">
                        <div id = "modal-form"  class="card">
                            <div class="card-content">
                                <span class="card-title">Overview</span>
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input id="name" name = "fullname" type="text" class="validate" required>
                                        <label for="name">Name</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                    <input id="emailid" name = "email" type="email" class="validate" required>
                                    <label for="emailid">Email</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input id="telephoneid1" name = "mobile1" type="tel" class="validate" required>
                                        <label for="telephoneid1">Mobile</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m6 l6">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Address</span>
                                <div class="row">
                                    <div class="input-field col s12 m6 l12">
                                        <input id="billingstreetaddr" name = "billingstreetaddr" type="text" class="validate" required>
                                        <label for="billingstreetaddr">Street Address</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="billingcityaddr" name = "billingcityaddr" type="text" class="validate" required>
                                        <label for="billingcityaddr">City</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="billingstate" name = "billingstate" type="text" class="validate" required>
                                        <label for="billingstate">State</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="billingpostal" name = "billingpostal" type="number" class="validate" required>
                                        <label for="billingpostal">Zip/Postal Code</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                    <input id="billingcountry" name = "billingcountry" type="text" class="validate" required>
                                    <label for="billingcountry">Country</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m6 l6">
                        <div class="card">
                                <div class="card-content">
                                    <div class="row">
                                        ${users}  
                                        ${accounts}
                                        <div class="input-field col s12 m12">
                                            <textarea id="desc" class="materialize-textarea"></textarea>
                                            <label for="desc">Enter Description</label>
                                    </div>       
                                    <div class = "center">
                                        <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
                                    </div>     
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                </div>


        `;
            document.getElementById('formdata').innerHTML = accountFormContents;
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            $(function () {
                $("#modal-btn").on('click', function () {
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
                    console.log(data);
                    $.ajax({
                        type: "POST",
                        url: SERVER_PATH + "contact.php",
                        data: { "name": 'createcontact', 'data': data }
                    }).done(function (data) {
                        var result = $.parseJSON(data);
                        if (result.error) {
                            M.toast({ html: result.error });
                        }
                        else {
                            window.open("contacts.html", '_self');
                        }

                    });


                });
            });


        }
    });
});

