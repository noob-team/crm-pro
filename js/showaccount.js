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
        console.log(data);
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var userInfo = result.userInfo;

            var userCard = `
            <div class="row">
            <div class="col col s12 m12 l12">
                <div id = "modal-form"  class="card">
                    <div class="card-content">
                        <span class="card-title">Account Overview</span>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Name</p>  
                                <input id="name" disabled value='${userInfo[1]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Email</p>  
                                <input id="name" disabled value='${userInfo[0]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Website</p>  
                                <a href="http://${userInfo[2]}" class="grey-text">${userInfo[2]}</a>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Mobile 1</p>  
                                <input id="name" disabled value='${userInfo[4]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Mobile 2</p>  
                                <input id="name" disabled value='${userInfo[5]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">GST Number</p>  
                                <input id="name" disabled value='${userInfo[16]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Account Type</p>  
                                <input id="name" disabled value='${userInfo[15]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Industry</p>  
                                <input id="name" disabled value='${userInfo[17]}'>
                            </div>
                            <div class="input-field col s12 m12">
                                <p class="grey-text">Description</p>  
                                <textarea  id="name" class="materialize-textarea" disabled >${userInfo[18]}</textarea>
                            </div>
                            <div class="input-field col s12 m12">
                                <p class="grey-text">Assigned User</p>  
                                <a href="showuser.html?email=${userInfo[19]}" class="grey-text" >${userInfo[21]}</a>
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
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Street Address</p>  
                                <input id="name" disabled value='${userInfo[5]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">City</p>  
                                <input id="name" disabled value='${userInfo[6]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">State</p>  
                                <input id="name" disabled value='${userInfo[7]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Postal Code</p>  
                                <input id="name" disabled value='${userInfo[8]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Country</p>  
                                <input id="name" disabled value='${userInfo[9]}'>
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
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Street Address</p>  
                                <input id="name" disabled value='${userInfo[10]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">City</p>  
                                <input id="name" disabled value='${userInfo[11]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">State</p>  
                                <input id="name" disabled value='${userInfo[12]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Postal Code</p>  
                                <input id="name" disabled value='${userInfo[13]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Country</p>  
                                <input id="name" disabled value='${userInfo[14]}'>
                            </div>
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

