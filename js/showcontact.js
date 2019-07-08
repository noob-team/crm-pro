// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-address-book")[0]
    .parentElement.parentElement
    .classList.add("active-link");


var currentUrl = window.location.href;
var url = new URL(currentUrl);
var email = url.searchParams.get("email");

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "contact.php",
        data: { name: "getcontact", 'email': email }
    }).done(function (data) {
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
                        <span class="card-title">Contact Overview</span>
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
                                <p class="grey-text">Phone Number</p>  
                                <input id="name" disabled value='${userInfo[2]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Account</p>  
                                <a href="showaccount.html?email=${userInfo[9]}" class="grey-text" >${userInfo[12]}</a>
                            </div>
                            <div class="input-field col s12 m12">
                                <p class="grey-text">Assigned User</p>  
                                <a href="showuser.html?email=${userInfo[31]}" class="grey-text" >${userInfo[32]}</a>
                            </div>
                            <div class="input-field col s12 m12">
                                <p class="grey-text">Description</p>  
                                <textarea  id="name" class="materialize-textarea" disabled >${userInfo[8]}</textarea>
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
                        <span class="card-title">Address</span>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Street Address</p>  
                                <input id="name" disabled value='${userInfo[3]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">City</p>  
                                <input id="name" disabled value='${userInfo[4]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">State</p>  
                                <input id="name" disabled value='${userInfo[5]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Postal Code</p>  
                                <input id="name" disabled value='${userInfo[6]}'>
                            </div>
                            <div class="input-field col s12 m6">
                                <p class="grey-text">Country</p>  
                                <input id="name" disabled value='${userInfo[7]}'>
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

