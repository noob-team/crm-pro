// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-tasks")[0]
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
        url: SERVER_PATH + "task.php",
        data: { name: "gettask", 'email': email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        console.log(result);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userTeams = result.userTeam;
            var superparent = result.parent;


            $(document).ready(function () {
                $.ajax({
                    type: "POST",
                    url: SERVER_PATH + "mulitrequest.php",
                    data: { name: "getaccountanduser" }
                }).done(function (data) {
                    var result = $.parseJSON(data);

                    //USER DROP DOWN LIST
                    let users = `<div class="input-field col s12 m6">
            <select id = "userid"  required="">
                    <option value="" disabled >Select a user</option>
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


                    let contacts = `<div class="input-field col s12 m6" style="display:none;"  id="contactBody">
                                    <select id = "contactid"  required="">
                                            <option value=""  selected>Select a contact</option>
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
                                                <textarea id="desc" class="materialize-textarea" >${userInfo[10]}</textarea>
                                                <label for="desc" class="active">Description</label>
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
                                            <input id="datestart" value="${userInfo[4]}"  type="text" class="datepicker"  required>
                                            <label for="datestart" class="active">Start Date</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="timestart" value="${userInfo[5]}" type="text" class="timepicker"  required>
                                            <label for="timestart" class="active">Start Time</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="dateend" value="${userInfo[6]}"  type="text" class="datepicker"  required>
                                            <label for="dateend" class="active">End Date</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="timeend" value="${userInfo[7]}"  type="text" class="timepicker"  required>
                                            <label for="timeend" class="active">End Time</label>
                                        </div>
                                        ${parents}
                                        ${accounts}
                                        ${contacts}
                                        ${users}  
                                        <div class = "center input-field col s12 m12">
                                            <button id = "modal-btn" class="btn pulse waves-effect waves-light indigo">Save Changes</button>
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
                        if (child.value == userInfo[8]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#statusid").formSelect();

                    var statusObj = document.getElementById('directionid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.value == userInfo[9]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#directionid").formSelect();



                    var statusObj = document.getElementById('parentid');
                    for (var i = 1; i < statusObj.children.length; i++) {
                        var child = statusObj.children[i];
                        if (child.label == userInfo[12]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#parentid").formSelect();


                    if (userInfo[12] == "Contact") {
                        document.getElementById('contactBody').style.display = 'block';
                        document.getElementById('accountBody').style.display = 'none';
                        var temp = userInfo[3];
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
                    else if (userInfo[12] == "Account") {
                        document.getElementById('accountBody').style.display = 'block';
                        document.getElementById('contactBody').style.display = 'none';

                        var temp = userInfo[3];
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
                        if (child.value == userInfo[11]) {
                            child.selected = true;
                            break;
                        }
                    }
                    $("#userid").formSelect();


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
                                "id": idemail,
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
                                data: { "name": 'updateTaskInfo', 'data': data }
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

