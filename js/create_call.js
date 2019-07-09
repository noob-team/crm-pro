document.querySelector("#sidebar")
    .getElementsByClassName("fa-phone")[0]
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
            //USER DROP DOWN LIST
            let users = `<div class="input-field col s12 m12">
            <select id = "userid"  required="">
                    <option value="" disabled selected>Select a user</option>
        `;
            let userAttendees = `<div class="input-field col s12 m6"><span>Select User Attendees</span>
                                   
            `;

            for (var i = 0; i < result.users.length; i++) {
                let template = `<option value="${result.users[i][0]}"}">${result.users[i][1]}</option>`
                let template2 = ` <div class="row">
                                <div class="input-field col s12 m6">    
                                <label>
                                    <input type="checkbox" id="att@${result.users[i][0]}" class="userCheckBox filled-in" value="${result.users[i][0]}" />
                                    <span>${result.users[i][1]}</span>
                                </label></div></div>`;
                users += template;
                userAttendees += template2;
            }
            users += `         </select>
                            <label>Assign User</label>
                        </div>`;

            userAttendees += `
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
            let contAttendees = `<div class="input-field col s12 m6"><span>Select Contact Attendees</span>
                                   
            `;

            let contacts = `<div class="input-field col s12 m6" style="display:none;"  id="contactBody">
                                    <select id = "contactid"  required="">
                                            <option value="" disabled selected>Select a contact</option>
                                `;

            for (var i = 0; i < result.contacts.length; i++) {
                let template = `<option value="${result.contacts[i][0]}"}">${result.contacts[i][1]}</option>`

                let template2 = ` <div class="row">
                                <div class="input-field col s12 m6">    
                                <label>
                                    <input type="checkbox" id="cont@${result.contacts[i][0]}" class="contactCheckBox filled-in" value="${result.contacts[i][1]}" />
                                    <span>${result.contacts[i][1]}</span>
                                </label></div></div>`;

                contAttendees += template2;

                contacts += template;
            }
            contAttendees += `
            </div>`;
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
                                                <option value="Planned" >Planned</option>
                                                <option value="Held" >Held</option>
                                                <option value="Not Held" >Not Held</option>    
                                            </select>
                                            <label for="statusid">Select Status</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <select id = "directionid" name = "status" required="">
                                                <option value="" disabled selected>Select Direction</option>
                                                <option value="Outbound" >Outbound</option>
                                                <option value="Inbound" >Inbound</option>  
                                            </select>
                                            <label for="directionid">Select Direction of Call</label>
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

                                        <div class="input-field col s12 m6">
                                            <select id = "durationid" name = "status" required="">
                                                <option value="" disabled selected>Select Duration</option>
                                                <option value="5" >5m</option>
                                                <option value="10" >10m</option>  
                                                <option value="15" >15m</option>   
                                                <option value="30" >30m</option>   
                                                <option value="45" >45m</option>   
                                                <option value="60" >1h</option>   
                                                <option value="120" >2h</option>   
                                            </select>
                                            <label for="durationid">Select Duration of Call</label>
                                        </div>

                                        <div class="input-field col s12 m6">
                                            <select id = "emailtimer" name = "status" required="">
                                                <option value="" disabled selected>Select Email Reminder Timings</option>
                                                <option value="0" >Do not notify.</option>
                                                <option value="5" >5m before</option>
                                                <option value="10" >10m before</option>  
                                                <option value="15" >15m before</option>   
                                                <option value="30" >30m before</option>   
                                                <option value="45" >45m before</option>   
                                                <option value="60" >1h before</option>   
                                                <option value="120" >2h before</option>   
                                                <option value="180" >3h before</option>
                                                <option value="300" >5h before</option>  
                                                <option value="1440" >1d before</option>   
                                                <option value="2880" >2d before</option>   
                                                <option value="4320" >3d before</option>   
                                                <option value="7500" >5d before</option>    
                                            </select>
                                            <label for="emailtimer">Select Email Reminder Timings</label>
                                        </div>
                                        ${parents}
                                        ${contacts}
                                        ${accounts}
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
                                            ${userAttendees}
                                            ${contAttendees}    
                                        </div>
                                        <div class="row">
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

            document.getElementById('userid').addEventListener('change', (e) => {
                var ele = document.getElementById('userid');
                var objs = document.getElementsByClassName("userCheckBox");
                for (var i = 0; i < objs.length; i++) {
                    objs[i].checked = "";
                    objs[i].disabled = "";
                }
                document.getElementById('att@' + ele.value).disabled = "disabled";

            });

            document.getElementById('contactid').addEventListener('change', (e) => {
                var ele = document.getElementById('contactid');
                var objs = document.getElementsByClassName("contactCheckBox");
                for (var i = 0; i < objs.length; i++) {
                    objs[i].checked = "";
                    objs[i].disabled = "";
                }
                document.getElementById('cont@' + ele.value).disabled = "disabled";
            });

            document.getElementById('accountid').addEventListener('change', (e) => {
                var objs = document.getElementsByClassName("contactCheckBox");
                for (var i = 0; i < objs.length; i++) {
                    objs[i].checked = "";
                    objs[i].disabled = "";
                }
            });

            document.getElementById('parentid').addEventListener('change', (e) => {
                var objs = document.getElementsByClassName("contactCheckBox");
                for (var i = 0; i < objs.length; i++) {
                    objs[i].checked = "";
                    objs[i].disabled = "";
                }

                if (document.getElementById('parentid').value.includes("contact")) {
                    var ele = document.getElementById('contactid');
                    var objs = document.getElementsByClassName("contactCheckBox");
                    for (var i = 0; i < objs.length; i++) {
                        objs[i].checked = "";
                        objs[i].disabled = "";
                    }
                    if (document.getElementById('cont@' + ele.value))
                        document.getElementById('cont@' + ele.value).disabled = "disabled";
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

                    var userAtendeList = [];
                    for (var i = 0; i < result.users.length; i++) {
                        var user = result.users[i][0];
                        var ele = document.getElementById('att@' + user);
                        if (ele.checked) {
                            userAtendeList.push(user);
                        }
                    }
                    var contAtendeList = [];
                    for (var i = 0; i < result.contacts.length; i++) {
                        var user = result.contacts[i][0];
                        var ele = document.getElementById('cont@' + user);
                        if (ele.checked) {
                            contAtendeList.push(user);
                        }
                    }

                    var data = {
                        "name": document.getElementById('name').value,
                        "desc": document.getElementById('desc').value,
                        "status": document.getElementById('statusid').value,
                        "direction": document.getElementById('directionid').value,
                        "startdate": document.getElementById('datestart').value,
                        "starttime": document.getElementById('timestart').value + ":00",
                        "enddate": document.getElementById('dateend').value,
                        "endtime": document.getElementById('timeend').value + ":00",
                        "duration": document.getElementById('durationid').value,
                        "emailtimings": document.getElementById('emailtimer').value,
                        "parent": document.getElementById('parentid').value,
                        "parentid": parentId,
                        "assigneduser": document.getElementById('userid').value,
                        "userAtt": userAtendeList,
                        "contAtt": contAtendeList

                    };
                    $.ajax({
                        type: "POST",
                        url: SERVER_PATH + "call.php",
                        data: { "name": 'createcall', 'data': data }
                    }).done(function (data) {
                        var result = $.parseJSON(data);
                        if (result.error) {
                            M.toast({ html: result.error });
                        }
                        else {
                            window.open("calls.html", '_self');
                        }

                    });


                });
            });


        }
    });
});

