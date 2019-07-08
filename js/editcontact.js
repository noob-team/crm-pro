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
        url: SERVER_PATH + "user.php",
        data: { name: "getallusers" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (!result) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userList = result;


            let users = `<div class="input-field col s12 m6">
            <select id = "userid" name = "user" required="">
                    <option value="" disabled >Select a user</option>
        `;
            for (var i = 0; i < result.length; i++) {
                let template = `<option id="user${i}" value="${result[i][0]}">${result[i][1]}</option>`;
                users += template;
            }
            users += `         </select>
                            <label>Assign User</label>
                        </div>`;

            $(document).ready(function () {
                $.ajax({
                    type: "POST",
                    url: SERVER_PATH + "account.php",
                    data: { name: "getaccount", "email": email }
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
                                <input id="website" name = "website" value='${userInfo[2]}' type="text" class="validate">
                                <label for="website" class="active">Website</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="telephoneid1" name = "mobile1" value='${userInfo[3]}' type="tel" class="validate" required>
                                <label for="telephoneid1" class="active">Mobile</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="telephoneid2" name = "mobile2" type="tel" value='${userInfo[4]}' class="validate" >
                                <label for="telephoneid2" class="active">Mobile ( Optional )</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="gstno" name = "gstno" type="text" value='${userInfo[16]}' class="validate">
                                <label for="gstno" class="active">GST Number</label>
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
                                <input id="billingstreetaddr" value='${userInfo[5]}' name = "billingstreetaddr" type="text" class="validate" required>
                                <label for="billingstreetaddr" class="active">Street Address</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingcityaddr" value='${userInfo[6]}' name = "billingcityaddr" type="text" class="validate" required>
                                <label for="billingcityaddr" class="active">City</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingstate" value='${userInfo[7]}' name = "billingstate" type="text" class="validate" required>
                                <label for="billingstate" class="active">State</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="billingpostal" value='${userInfo[8]}' name = "billingpostal" type="number" class="validate" required>
                                <label for="billingpostal" class="active">Zip/Postal Code</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                            <input id="billingcountry"value='${userInfo[9]}'  name = "billingcountry" type="text" class="validate" required>
                            <label for="billingcountry" class="active">Country</label>
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
                                <input id="shippingstreetaddr"  value='${userInfo[10]}' name = "shippingstreetaddr" type="text" class="validate" required>
                                <label for="shippingstreetaddr" class="active">Street Address</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="shippingcityaddr"  value='${userInfo[11]}' name = "shippingcityaddr" type="text" class="validate" required>
                                <label for="shippingcityaddr" class="active">City</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="shippingstate"  value='${userInfo[12]}' name = "shippingstate" type="text" class="validate" required>
                                <label for="shippingstate" class="active">State</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                                <input id="shippingpostal"  value='${userInfo[13]}' name = "shippingpostal" type="number" class="validate" required>
                                <label for="shippingpostal" class="active">Zip/Postal Code</label>
                            </div>
                            <div class="input-field col s12 m6 l12">
                            <input id="shippingcountry"  value='${userInfo[14]}' name = "shippingcountry" type="text" class="validate" required>
                            <label for="shippingcountry" class="active">Country</label>
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
                                    <option value="" disabled >Select Account Type</option>
                                    <option value="Customer" id="acc0">Customer</option>
                                    <option value="Investor" id="acc1">Investor</option>
                                    <option value="Partner" id="acc2">Partner</option>
                                    <option value="Retailer" id="acc3">Retailer</option>
                                </select>
                                <label>Type</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <select id = "industry" name = "type">
                                    <option value="" disabled>Select Industry Type</option>
                                    <option value="Advertising">Advertising</option><option value="Aerospace">Aerospace</option><option value="Agriculture">Agriculture</option><option value="Apparel &amp; Accessories">Apparel &amp; Accessories</option><option value="Architecture">Architecture</option><option value="Automotive">Automotive</option><option value="Banking">Banking</option><option value="Biotechnology">Biotechnology</option><option value="Building Materials &amp; Equipment">Building Materials &amp; Equipment</option><option value="Chemical">Chemical</option><option value="Computer">Computer</option><option value="Construction">Construction</option><option value="Consulting">Consulting</option><option value="Creative">Creative</option><option value="Culture">Culture</option><option value="Defense">Defense</option><option value="Education">Education</option><option value="Electric Power">Electric Power</option><option value="Electronics">Electronics</option><option value="Energy">Energy</option><option value="Entertainment &amp; Leisure">Entertainment &amp; Leisure</option><option value="Finance">Finance</option><option value="Food &amp; Beverage">Food &amp; Beverage</option><option value="Grocery">Grocery</option><option value="Healthcare">Healthcare</option><option value="Hospitality">Hospitality</option><option value="Insurance">Insurance</option><option value="Legal">Legal</option><option value="Manufacturing">Manufacturing</option><option value="Marketing">Marketing</option><option value="Mass Media">Mass Media</option><option value="Mining">Mining</option><option value="Music">Music</option><option value="Petroleum">Petroleum</option><option value="Publishing">Publishing</option><option value="Real Estate">Real Estate</option><option value="Retail">Retail</option><option value="Service">Service</option><option value="Shipping">Shipping</option><option value="Software">Software</option><option value="Sports">Sports</option><option value="Support">Support</option><option value="Technology">Technology</option><option value="Telecommunications">Telecommunications</option><option value="Television">Television</option><option value="Testing, Inspection &amp; Certification">Testing, Inspection &amp; Certification</option><option value="Transportation">Transportation</option><option value="Travel">Travel</option><option value="Venture Capital">Venture Capital</option><option value="Water">Water</option><option value="Wholesale">Wholesale</option>
                                </select>
                                <label>Type</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <textarea id="desc" class="materialize-textarea">${userInfo[18]}</textarea>
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
                            if (userList[u][0] == userInfo[19]) {
                                id = u;
                                break;
                            }
                        }
                        var id = "user" + id;
                        document.getElementById(id).selected = true;
                        $('#userid').formSelect();


                        var id = "0";
                        var typess = ["Customer", "Investor", "Partner", "Retailer"];
                        for (var u = 0; u < 4; u++) {
                            if (typess[u] == userInfo[15]) {
                                id = u;
                                break;
                            }
                        }
                        var id = "acc" + id;
                        document.getElementById(id).selected = true;
                        $('#typeid').formSelect();


                        var industry = document.getElementById('industry');
                        var sub = industry.children;
                        for (var i = 1; i < sub.length; i++) {
                            var opt = sub[i];
                            if (opt.value == userInfo[17]) {
                                opt.selected = true;
                                break;
                            }
                        }
                        $('#industry').formSelect();


                        $(function () {
                            $("#saveUserInfo").on('click', function () {

                                var oldEmail = email;

                                var newdata = {
                                    "name": document.getElementById('name').value,
                                    "email": document.getElementById('emailid').value,
                                    "website": document.getElementById('website').value,
                                    "telephone1": document.getElementById('telephoneid1').value,
                                    "telephone2": document.getElementById('telephoneid2').value,
                                    "gstno": document.getElementById('gstno').value,

                                    "billingstreetaddr": document.getElementById('billingstreetaddr').value,
                                    "billingcityaddr": document.getElementById('billingcityaddr').value,
                                    "billingstate": document.getElementById('billingstate').value,
                                    "billingpostal": document.getElementById('billingpostal').value,
                                    "billingcountry": document.getElementById('billingcountry').value,

                                    "shippingstreetaddr": document.getElementById('shippingstreetaddr').value,
                                    "shippingcityaddr": document.getElementById('shippingcityaddr').value,
                                    "shippingstate": document.getElementById('shippingstate').value,
                                    "shippingpostal": document.getElementById('shippingpostal').value,
                                    "shippingcountry": document.getElementById('shippingcountry').value,

                                    "indsustryType": document.getElementById('industry').value,
                                    "desc": document.getElementById('desc').value,
                                    "usertype": document.getElementById('typeid').value,
                                    "assigneduser": document.getElementById('userid').value
                                };
                                $.ajax({
                                    type: "POST",
                                    url: SERVER_PATH + "account.php",
                                    data: { "name": "updateAccountInfo", "oldEmail": oldEmail, "newdata": newdata }
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

