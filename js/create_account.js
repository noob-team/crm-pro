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
                let template = `<option value="${result[i][0]}"}">${result[i][1]}</option>`
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
                                        <input id="gstno" name = "gstno" type="text" class="validate">
                                        <label for="gstno">GST Number</label>
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
                                    <label for="billingcountry">Country</label>
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
                                    <label for="shippingcountry">Country</label>
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
                                    <div class="input-field col s12 m6">
                                        <select id = "industry" name = "type">
                                            <option value="" disabled selected>Select Industry Type</option>
                                            <option value="Advertising">Advertising</option><option value="Aerospace">Aerospace</option><option value="Agriculture">Agriculture</option><option value="Apparel &amp; Accessories">Apparel &amp; Accessories</option><option value="Architecture">Architecture</option><option value="Automotive">Automotive</option><option value="Banking">Banking</option><option value="Biotechnology">Biotechnology</option><option value="Building Materials &amp; Equipment">Building Materials &amp; Equipment</option><option value="Chemical">Chemical</option><option value="Computer">Computer</option><option value="Construction">Construction</option><option value="Consulting">Consulting</option><option value="Creative">Creative</option><option value="Culture">Culture</option><option value="Defense">Defense</option><option value="Education">Education</option><option value="Electric Power">Electric Power</option><option value="Electronics">Electronics</option><option value="Energy">Energy</option><option value="Entertainment &amp; Leisure">Entertainment &amp; Leisure</option><option value="Finance">Finance</option><option value="Food &amp; Beverage">Food &amp; Beverage</option><option value="Grocery">Grocery</option><option value="Healthcare">Healthcare</option><option value="Hospitality">Hospitality</option><option value="Insurance">Insurance</option><option value="Legal">Legal</option><option value="Manufacturing">Manufacturing</option><option value="Marketing">Marketing</option><option value="Mass Media">Mass Media</option><option value="Mining">Mining</option><option value="Music">Music</option><option value="Petroleum">Petroleum</option><option value="Publishing">Publishing</option><option value="Real Estate">Real Estate</option><option value="Retail">Retail</option><option value="Service">Service</option><option value="Shipping">Shipping</option><option value="Software">Software</option><option value="Sports">Sports</option><option value="Support">Support</option><option value="Technology">Technology</option><option value="Telecommunications">Telecommunications</option><option value="Television">Television</option><option value="Testing, Inspection &amp; Certification">Testing, Inspection &amp; Certification</option><option value="Transportation">Transportation</option><option value="Travel">Travel</option><option value="Venture Capital">Venture Capital</option><option value="Water">Water</option><option value="Wholesale">Wholesale</option>
                                        </select>
                                        <label>Type</label>
                                    </div>
                                    <div class="input-field col s12 m6">
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

        `;
            document.getElementById('formdata').innerHTML = accountFormContents;
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            $(function () {
                $("#modal-btn").on('click', function () {

                    var data = {
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
                        data: { "name": 'createaccount', 'data': data }
                    }).done(function (data) {
                        var result = $.parseJSON(data);
                        if (result.error) {
                            M.toast({ html: result.error });
                        }
                        else {
                            window.open("accounts.html", '_self');
                        }

                    });


                });
            });


        }
    });
});

