// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-phone")[0]
    .parentElement.parentElement
    .classList.add("active-link");

function convToHours(mins) {
    var hrs = Math.trunc(mins / 60);
    var remmins = mins - hrs * 60;
    var result = `${hrs}h ${remmins}min`;
    return result;
}

function emailremainder(mins) {
    if (mins == 0) return 'No Reminder Available';
    var days = Math.trunc(mins / (24 * 60));
    if (days == 0) {
        return convToHours(mins) + " before";
    }
    return days + " before";

}

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var email = url.searchParams.get("email");
var idemail = email;
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "call.php",
        data: { name: "getcall", 'email': email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userTeams = result.userTeam;
            var constAtt = result.contAtt;
            var userAtt = result.userAtt;
            var superparent = result.parent;


            $(document).ready(function () {
                $.ajax({
                    type: "POST",
                    url: SERVER_PATH + "mulitrequest.php",
                    data: { name: "getaccountanduser" }
                }).done(function (data) {
                    var result = $.parseJSON(data);

                    //USER DROP DOWN LIST
                    let users = `<div class="input-field col s12 m12">
            <select id = "userid"  required="">
                    <option value="" disabled >Select a user</option>
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
                                <option value="" disabled >Select a account</option>
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
                                            <option value=""  selected>Select a contact</option>
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
                    <option value="" disabled >Select Parent</option>
        `;

                    for (var i = 0; i < result.parents.length; i++) {
                        let template = `<option value="${result.parents[i][1]}" name="${result.parents[i][0]}"} ">${result.parents[i][0]}</option>`
                        parents += template;
                    }
                    parents += `         </select>
                            <label>Parent</label>
                        </div>`;


                    var userCard = `
                        <div class="row">
                        <div class="col col s12 m12 l12">
                            <div id = "modal-form"  class="card">
                                <div class="card-content">
                                    <span class="card-title">Call Overview</span>
                                    <div class="row">
                                        <div class="input-field col s12 m6">
                                            <input id="name" value="${userInfo[1]}" name = "fullname" type="text" class="validate"  required>
                                            <label for="name" class="active">Name</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                                <textarea id="desc" class="materialize-textarea" >${userInfo[2]}</textarea>
                                                <label for="desc" class="active">Description</label>
                                        </div>  
                                        <div class="input-field col s12 m6">
                                            <select id = "statusid"  required="">
                                                <option value="" disabled >Select Status</option>
                                                <option value="Planned" >Planned</option>
                                                <option value="Held" >Held</option>
                                                <option value="Not Held" >Not Held</option>    
                                            </select>
                                            <label>Status</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                                        <select id = "directionid" name = "status" required="">
                                                            <option value="" disabled >Select Direction</option>
                                                            <option value="Outbound" >Outbound</option>
                                                            <option value="Inbound" >Inbound</option>  
                                                        </select>
                                                        <label for="directionid">Select Direction of Call</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="datestart" value="${userInfo[7]}"  type="text" class="datepicker"  required>
                                            <label for="datestart" class="active">Start Date</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="timestart" value="${userInfo[8]}" type="text" class="timepicker"  required>
                                            <label for="timestart" class="active">Start Time</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="dateend" value="${userInfo[9]}"  type="text" class="datepicker"  required>
                                            <label for="dateend" class="active">End Date</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="timeend" value="${userInfo[10]}"  type="text" class="timepicker"  required>
                                            <label for="timeend" class="active">End Time</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <select id = "durationid" name = "status" required="">
                                                <option value="" disabled >Select Duration</option>
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
                                                <option value="" disabled >Select Email Reminder Timings</option>
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
                                        ${accounts}
                                        ${contacts}
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
                                            <div class = "center input-field col s12 m12">
                                                <button id = "modal-btn" class="btn pulse waves-effect waves-light indigo">Save Changes</button>
                                            </div>
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


                    $(document).ready(function () {
                        $('.datepicker').datepicker({
                            format: 'yyyy-mm-dd',
                        });
                        $('.timepicker').timepicker({
                            twelveHour: false
                        });
                    });


                    //initializing dropdown list boxes and checkboxes


                    var statusObj = document.getElementById('statusid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[5]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#statusid").formSelect();

                    var statusObj = document.getElementById('directionid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[6]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#directionid").formSelect();

                    var statusObj = document.getElementById('durationid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[11]) {
                            child.selected = true;
                            break;
                        }
                    }

                    $("#durationid").formSelect();

                    var statusObj = document.getElementById('emailtimer');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[12]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#emailtimer").formSelect();



                    var statusObj = document.getElementById('parentid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.label == userInfo[19]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#parentid").formSelect();

                    if (userInfo[19] == "Contact") {
                        document.getElementById('contactBody').style.display = 'block';
                        document.getElementById('accountBody').style.display = 'none';
                        var temp = userInfo[4];
                        var res = "";
                        for (var i = 0; i < result.contacts.length; i++) {
                            if (result.contacts[i][0] == temp) {
                                res = i;
                                break;
                            }
                        }

                        var statusObj = document.getElementById('contactid');
                        for (var i = 1; i < statusObj.children.length; i++) {
                            var child = statusObj.children[i];
                            if (child.label == result.contacts[res][1]) {
                                child.selected = true;
                                break;
                            }
                        }
                        $("#contactid").formSelect();

                    }
                    else if (userInfo[19] == "Account") {
                        document.getElementById('accountBody').style.display = 'block';
                        document.getElementById('contactBody').style.display = 'none';

                        var temp = userInfo[4];
                        var res = "";
                        for (var i = 0; i < result.accounts.length; i++) {
                            if (result.accounts[i][0] == temp) {
                                res = i;
                                break;
                            }
                        }

                        var statusObj = document.getElementById('accountid');
                        for (var i = 1; i < statusObj.children.length; i++) {
                            var child = statusObj.children[i];
                            if (child.label == result.accounts[res][1]) {
                                child.selected = true;
                                break;
                            }
                        }
                        $("#accountid").formSelect();
                    }

                    var statusObj = document.getElementById('userid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[13]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#userid").formSelect();

                    var ele = document.getElementById('userid');
                    var objs = document.getElementsByClassName("userCheckBox");
                    for (var i = 0; i < objs.length; i++) {
                        objs[i].checked = "";
                        objs[i].disabled = "";
                    }
                    document.getElementById('att@' + ele.value).disabled = "disabled";

                    if (userInfo[19] == "Contact") {
                        var ele = document.getElementById('contactid');
                        var objs = document.getElementsByClassName("contactCheckBox");
                        for (var i = 0; i < objs.length; i++) {
                            objs[i].checked = "";
                            objs[i].disabled = "";
                        }
                        document.getElementById('cont@' + ele.value).disabled = "disabled";
                    }


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
                        if (document.getElementById('cont@' + ele.value))
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



                    for (var i = 0; i < userAtt.length; i++) {
                        var temp = userAtt[i][1];
                        var email = 'att@' + temp;
                        document.getElementById(email).checked = true;
                    }

                    for (var i = 0; i < constAtt.length; i++) {
                        var temp = constAtt[i][1];
                        var email = 'cont@' + temp;
                        document.getElementById(email).checked = true;
                    }


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
                                "id": idemail,
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
                                data: { "name": 'updateCallInfo', 'data': data }
                            }).done(function (data) {
                                var result = $.parseJSON(data);
                                if (result.error) {
                                    M.toast({ html: result.error });
                                }
                                else {
                                    M.toast({ html: "Updates saved..." });
                                }

                            });


                        });
                    });



                })
            });


        }

    });
});

