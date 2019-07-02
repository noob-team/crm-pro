const accountFormContents = `
    <div class="row">
        <form id = "modal-form" class="col s12">
            <div class="row">
                <div class="input-field col s12 m6">
                    <input id="nameid" name = "name" type="text" class="validate" required>
                    <label for="nameid">Task Name</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="websiteid" name = "website" type="text" class="validate" required>
                    <label for="websiteid">Website</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="telephoneid" name = "mobile" type="tel" class="validate" required>
                    <label for="telephoneid">Mobile</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="emailid" name = "email" type="email" class="validate" required>
                    <label for="emailid">Email</label>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <select id = "typeid" name = "type">
                            <option value="Customer">Customer</option>
                            <option value="Partner" selected>Partner</option>
                            <option value="Investor">Investor</option>
                            <option value="Reseller">Reseller</option>
                        </select>
                        <label>Type</label>
                    </div>
                </div>
                <div class="input-field col s12 m6">
                    <input id="gstinid" name = "gstin" type="tel" class="validate" required>
                    <label for="gstinid">GST-IN</label>
                </div>
                <div class="col s12 m6">
                    <span>Billing address</span>
                    <div className="row">
                        <div class="input-field col s12 m12">
                            <textarea id="billingstreetid" name = "billingstreet" class="materialize-textarea" required></textarea>
                            <label for="billingstreetid">Street</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="billingcityid" name = "billingcity" type="text" class="validate" required>
                            <label for="billingcityid">City</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="billingstateid" name = "billingstate" type="text" class="validate" required>
                            <label for="billingstateid">State</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="billingpostalid" name = "billingpostal" type="tel" class="validate" required>
                            <label for="billingpostalid">Postal code</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="billingcountryid" name = "billingcountry" type="text" class="validate" required>
                            <label for="billingcountryid">Country</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <span>Shipping address</span>
                    <div className="row">
                        <div class="input-field col s12 m12">
                            <textarea id="shippingstreetid" name = "shippingstreet" class="materialize-textarea" required></textarea>
                            <label for="shippingstreetid">Street</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="shippingcityid" name = "shippingcity" type="text" class="validate" required>
                            <label for="shippingcityid">City</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="shippingstateid" name = "shippingstate" type="text" class="validate" required>
                            <label for="shippingstateid">State</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="shippingpostalid" name = "shippingpostal" type="tel" class="validate" required>
                            <label for="shippingpostalid">Postal code</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="shippingcountryid" name = "shippingcountry" type="text" class="validate" required>
                            <label for="shippingcountryid">Country</label>
                        </div>
                    </div>
                </div>
                <div class="input-field col s12 m12">
                    <textarea id="descriptionid" name = "description" class="materialize-textarea"></textarea>
                    <label for="descriptionid">Descripion</label>
                </div>
            </div>
            <div class = "center">
                <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
            </div>
        </form>
    </div>
`;