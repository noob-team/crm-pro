// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-user-circle")[0]
    .parentElement.parentElement
    .classList.add("active-link");


var currentUrl = window.location.href;
var url = new URL(currentUrl);
var email = url.searchParams.get("email");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "account.php",
        data: { name: "getaccount", 'email': email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;
            var userTeams = result.userTeam;

            var userCard = `
                <div class="row">
                <div class="col s12 m12 l12">
                <div class="card ">
                <div class="card-content">
                    <span class="card-title">User Overview</span>
                    <div class="row">
                    <div class="col s12 m5 l5">
                        <p class="grey-text">Full Name</p>
                            <input disabled value="${userInfo[1]}" id="name" type="text" class="validate">
                    </div>
                    <div class="col s12 m5 l5">
                        <p class="grey-text">Email Address</p>
                            <input disabled value="${userInfo[0]}" id="email" type="text" class="validate">
                    </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Gender</p>
                                <input disabled value="${userInfo[3]}" id="gender" type="text" class="validate">
                        </div>
                        <div class="col s12 m5 l5">
                            <p class="grey-text">Password</p>
                                <input disabled value="${userInfo[4]}" id="password" type="password" class="validate">
                                <span>
                                    <label>
                                        <input type="checkbox" id="showPass"/>
                                        <span>Show Password</span>
                                    </label>
                                </span>
                        </div>
                            <div class="col s12 m5 l5">
                                <p class="grey-text">Phone Number</p>
                                    <input disabled value="${userInfo[2]}" id="phone" type="text" class="validate">
                            </div>
                       
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

