const contactFormContents = `
    <div class="row">
        <form id = "modal-form" class="col s12">
            <div class="row">
                <div class="input-field col s12 m6">
                    <input id="nameid" name = "name" type="text" class="validate" required>
                    <label for="nameid">Full Name</label>
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
                        <select id = "accountsid" name = "accounts">
                            <option value="Option 1" selected>Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                        <label>Accounts</label>
                    </div>
                </div>
                <div class="input-field col s12 m12">
                    <textarea id="addressid" name = "address" class="materialize-textarea" required></textarea>
                    <label for="addressid">Address</label>
                </div>
                <div class="input-field col s12 m4">
                    <input id="cityid" name = "city" type="text" class="validate" required>
                    <label for="cityid">City</label>
                </div>
                <div class="input-field col s12 m4">
                    <input id="stateid" name = "state" type="text" class="validate" required>
                    <label for="stateid">State</label>
                </div>
                <div class="input-field col s12 m4">
                    <input id="countryid" name = "country" type="text" class="validate" required>
                    <label for="countryid">Country</label>
                </div>
            </div>
            <div class = "center">
                <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
            </div>
        </form>
    </div>
`;