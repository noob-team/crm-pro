document.querySelector("#sidebar")
    .getElementsByClassName("fa-tasks")[0]
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
            M.toast({ html: "Error Loading.." });
        }
        else {
            //USER DROP DOWN LIST
            let users = `<div class="input-field col s12 m6">
            <select id = "userid"  required="">
                    <option value="" disabled selected>Select a user</option>
        `;


            for (var i = 0; i < result.users.length; i++) {
                let template = `<option value="${result.users[i][0]}"}">${result.users[i][1]}</option>`

                users += template;

            }
            users += `         </select>
                            <label>Assign User</label>
                        </div>`;

            //Account DROP DOWN LIST
            let accounts = `<div class="input-field col s12 m6" style="display:none;" id="accountBody">
                        <select id = "accountid" required="" >
                                <option value="" disabled selected>Select a account</option>
                    `;

            for (var i = 0; i < result.accounts.length; i++) {
                let template = `<option value="${result.accounts[i][0]}"}">${result.accounts[i][1]}</option>`
                accounts += template;
            }
            accounts += `         </select>
                                        <label>Account Id</label>
                                    </div>`;


            //CONTACT Dropdown LIST


            let contacts = `<div class="input-field col s12 m6" style="display:none;"  id="contactBody">
                                    <select id = "contactid"  required="">
                                            <option value="" disabled selected>Select a contact</option>
                                `;

            for (var i = 0; i < result.contacts.length; i++) {
                let template = `<option value="${result.contacts[i][0]}"}">${result.contacts[i][1]}</option>`



                contacts += template;
            }

            contacts += `         </select>
                                                    <label>Contact Id</label>
                                                </div>`;

            //Parent Dropdown LIST
            let parents = `<div class="input-field col s12 m6">
            <select id = "parentid"  required="">
                    <option value="" disabled selected>Select Parent</option>
        `;

            for (var i = 0; i < result.parents.length; i++) {
                let template = `<option value="${result.parents[i][1]}" name="${result.parents[i][2]}"} ">${result.parents[i][0]}</option>`
                parents += template;
            }
            parents += `         </select>
                            <label>Parent</label>
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
                                                <textarea id="desc" class="materialize-textarea"></textarea>
                                                <label for="desc">Enter Description</label>
                                        </div>  
                                        <div class="input-field col s12 m6">
                                            <select id = "statusid" name = "status" required="">
                                                <option value="" disabled selected>Select Status</option>
                                                <option value="Not Started" >Not Started</option>
                                                <option value="Started" >Started</option>
                                                <option value="Completed" >Completed</option>    
                                                <option value="Cancelled" >Cancelled</option>
                                                <option value="Deferred" >Deferred</option>    
                                            </select>
                                            <label for="statusid">Status</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <select id = "directionid" name = "status" required="">
                                                <option value="" disabled selected>Select Priority</option>
                                                <option value="Low" >Low</option>
                                                <option value="Normal" >Normal</option>  
                                                <option value="High" >High</option>  
                                                <option value="Urgent" >Urgent</option>  
                                            </select>
                                            <label for="directionid">Priority</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input type="text" id="datestart" class="datepicker">
                                            <label for="datestart">Start Date</label>
                                        </div>  
                                        <div class="input-field col s12 m6">
                                            <input type="text" id="timestart" class="timepicker">
                                            <label for="datestart">Start Time</label>
                                        </div>  
                                        <div class="input-field col s12 m6">
                                            <input type="text" id="dateend" class="datepicker">
                                            <label for="dateend">End Date</label>
                                        </div>  
                                        <div class="input-field col s12 m6">
                                            <input type="text" id="timeend" class="timepicker">
                                            <label for="timeend">End Time</label>
                                        </div>  
                                        ${parents}
                                        ${contacts}
                                        ${accounts}
                                        ${users}  
                                        
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

            $(document).ready(function () {
                $('.datepicker').datepicker({
                    format: 'yyyy-mm-dd',
                });
                $('.timepicker').timepicker({
                    twelveHour: false
                });
            });


            document.getElementById('parentid').addEventListener('change', (e) => {
                var ele = document.getElementById('parentid');

                if (ele.value.includes("account")) {
                    //Account selected parent
                    document.getElementById('accountBody').style.display = 'block';
                    document.getElementById('contactBody').style.display = 'none';

                }
                else if (ele.value.includes("contact")) {

                    document.getElementById('contactBody').style.display = 'block';
                    document.getElementById('accountBody').style.display = 'none';
                }


            });




            $(function () {
                $("#modal-btn").on('click', function () {

                    var ele = document.getElementById('parentid');
                    var parentId = "";
                    if (ele.value.includes("account")) {
                        //Account selected parent
                        parentId = document.getElementById('accountid').value;

                    }
                    else if (ele.value.includes("contact")) {
                        parentId = document.getElementById('contactid').value;
                    }

                    var data = {
                        "name": document.getElementById('name').value,
                        "desc": document.getElementById('desc').value,
                        "status": document.getElementById('statusid').value,
                        "priority": document.getElementById('directionid').value,
                        "startdate": document.getElementById('datestart').value,
                        "starttime": document.getElementById('timestart').value + ":00",
                        "enddate": document.getElementById('dateend').value,
                        "endtime": document.getElementById('timeend').value + ":00",
                        "parent": document.getElementById('parentid').value,
                        "parentid": parentId,
                        "assigneduser": document.getElementById('userid').value,
                    };
                    $.ajax({
                        type: "POST",
                        url: SERVER_PATH + "task.php",
                        data: { "name": 'createtask', 'data': data }
                    }).done(function (data) {
                        var result = $.parseJSON(data);
                        if (result.error) {
                            M.toast({ html: result.error });
                        }
                        else {
                            window.open("tasks.html", '_self');
                        }

                    });


                });
            });


        }
    });
});

