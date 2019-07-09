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

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "call.php",
        data: { name: "getcall", 'email': email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        console.log(result);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userTeams = result.userTeam;
            var constAtt = result.contAtt;
            var userAtt = result.userAtt;
            var superparent = result.parent;

            let parents = '';

            if (userInfo[3].includes("contact")) {
                //contact parent
                let templaye = `
                <div class="input-field col s12 m12">
                    <p class="grey-text">Parent</p>  
                    <a href="showcontact.html?email=${superparent[0]}" class="grey-text" >${superparent[1]}</a>
                </div>
                `;
                parents += templaye;
            }
            else if (userInfo[3].includes("account")) {
                //account parent
                let templaye = `
                <div class="input-field col s12 m12">
                    <p class="grey-text">Parent</p>  
                    <a href="showaccount.html?email=${superparent[0]}" class="grey-text" >${superparent[1]}</a>
                </div>
                `;
                parents += templaye;
            }

            let userAttendees = '<div class="row"> ';
            let contAttendees = '<div class="row">';

            let users = `
            <div class="row">
                <div class="input-field col s12 m12">
                    <p class="grey-text">Assigned User</p>  
                    <a href="showuser.html?email=${userInfo[14]}" class="grey-text" >${userInfo[15]}</a>
                </div>
            </div>
            `;

            for (var i = 0; i < userAtt.length; i++) {
                var smalltemp = '';
                if (i == 0) {
                    smalltemp = ' <p class="grey-text">Users:</p>  '
                }
                let temp = `
                <div class="input-field col s12 m12">${smalltemp}
                    <a href="showuser.html?email=${userAtt[i][2]}" class="grey-text" >${userAtt[i][3]}</a>
                </div>
            `;
                userAttendees += temp;
            }
            for (var i = 0; i < constAtt.length; i++) {
                var smalltemp = '';
                if (i == 0) {
                    smalltemp = ' <p class="grey-text">Contacts:</p>  '
                }
                let temp = `
                <div class="input-field col s12 m12">${smalltemp}
                    <a href="showcontact.html?email=${constAtt[i][2]}" class="grey-text" >${constAtt[i][3]}</a>
                </div>
            `;
                contAttendees += temp;
            }


            userAttendees += '</div>';
            contAttendees += '</div>';

            var userCard = `
            <div class="row">
            <div class="col col s12 m12 l12">
                <div id = "modal-form"  class="card">
                    <div class="card-content">
                        <span class="card-title">Call Overview</span>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <input id="name" value="${userInfo[1]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="name" class="active">Name</label>
                            </div>
                            <div class="input-field col s12 m6">
                                    <textarea id="desc" class="materialize-textarea" disabled>${userInfo[2]}</textarea>
                                    <label for="desc" class="active">Description</label>
                            </div>  
                            <div class="input-field col s12 m6">
                                <input id="status" value="${userInfo[5]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="status" class="active">Status</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="Direction" value="${userInfo[6]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="Direction" class="active">Direction</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="StartDate" value="${userInfo[7]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="StartDate" class="active">Start Date</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="StartDate1" value="${userInfo[8]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="StartDate1" class="active">Start Time</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="EndDate" value="${userInfo[9]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="EndDate" class="active">End Date</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="EndDate1" value="${userInfo[10]}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="EndDate1" class="active">End Time</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="Duration" value="${convToHours(userInfo[11])}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="Duration" class="active">Duration</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="EmailState" value="${emailremainder(userInfo[12])}" name = "fullname" type="text" class="validate" disabled required>
                                <label for="EmailState" class="active">Email Reminder</label>
                            </div>
                            ${parents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m12 l12">
                <div class="card">
                        <div class="card-content">
                            <span class="card-title">Attendees</span>
                                ${users}  
                                ${userAttendees}
                                ${contAttendees}    
                        </div>
                </div>
            </div>
        </div>
        </div>
            `;




            document.getElementsByClassName('uniqElement')[0].innerHTML += (userCard);

        }

    });
});

