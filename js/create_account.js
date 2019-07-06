document.querySelector("#sidebar")
    .getElementsByClassName("fa-user-circle")[0]
    .parentElement.parentElement
    .classList.add("active-link");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "user.php",
        data: { name: "getallusers" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Error Loading teams.." });
        }
        else {
            let users = `<div class="input-field col s12 m6">
        <select id = "userid" name = "user" required="">
                <option value="" disabled selected>Select a user</option>
    `;
            let accountFormContents = '';

            for (var i = 0; i < result.length; i++) {
                let template = `<option value="${result[i][1]}" name="${result[i][0]}">${result[i][1]}</option>`
                users += template;
            }
            users += `         </select>
                        <label>Assign User</label>
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
                                        <input id="website" name = "website" type="text" class="validate">
                                        <label for="website">Website</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input id="telephoneid1" name = "mobile1" type="tel" class="validate" required>
                                        <label for="telephoneid1">Mobile</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input id="telephoneid2" name = "mobile2" type="tel" class="validate" >
                                        <label for="telephoneid2">Mobile ( Optional )</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input id="passwordid" name = "password" type="text" class="validate" required>
                                        <label for="passwordid">Password</label>
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
                                <span class="card-title">Billing Address</span>
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
                                    <label for="billingcountry">City</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m6 l6">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Shipping Address</span>
                                <div class="row">
                                    <div class="input-field col s12 m6 l12">
                                        <input id="shippingstreetaddr" name = "shippingstreetaddr" type="text" class="validate" required>
                                        <label for="shippingstreetaddr">Street Address</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="shippingcityaddr" name = "shippingcityaddr" type="text" class="validate" required>
                                        <label for="shippingcityaddr">City</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="shippingstate" name = "shippingstate" type="text" class="validate" required>
                                        <label for="shippingstate">State</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                        <input id="shippingpostal" name = "shippingpostal" type="number" class="validate" required>
                                        <label for="shippingpostal">Zip/Postal Code</label>
                                    </div>
                                    <div class="input-field col s12 m6 l12">
                                    <input id="shippingcountry" name = "shippingcountry" type="text" class="validate" required>
                                    <label for="shippingcountry">City</label>
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
                                    <div class="input-field col s12 m6">
                                        <select id = "typeid" name = "type">
                                            <option value="" disabled selected>Select Account Type</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Investor">Investor</option>
                                            <option value="Partner">Partner</option>
                                            <option value="Retailer">Retailer</option>
                                        </select>
                                        <label>Type</label>
                                    </div>       
                                    <div class = "center">
                                        <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
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
                    var email = $("#emailid").val();
                    var data = [];

                    // $.ajax({
                    //     type: "POST",
                    //     url: SERVER_PATH + "account.php",
                    //     data: { "name": 'createaccount', 'data': data }
                    // }).done(function (data) {
                    //     var result = $.parseJSON(data);
                    //     if (result.error) {
                    //         M.toast({ html: result.error });
                    //     }
                    //     else {
                    //         window.open("accounts.html", '_self');
                    //     }

                    // });


                });
            });


        }
    });
});

