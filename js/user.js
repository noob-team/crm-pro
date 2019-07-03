
// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-user")[0]
    .parentElement.parentElement
    .classList.add("active-link");

// --- for displaying/hiding the delete selected button and to select all ---
const selectAll_checkbox = document.querySelector("#selectAll");
const checkboxes = document.getElementsByClassName("checkbox");
const deleteSelected = document.querySelector("#delete-selected");
let checkboxesSelectedCount = 0
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", (e) => {
        if (checkboxes[i].checked) {
            deleteSelected.style.display = "inline-block";
            checkboxesSelectedCount++;
        } else {
            checkboxesSelectedCount--;
            if (!checkboxesSelectedCount) {
                deleteSelected.style.display = "none";
            }
        }
        if (checkboxesSelectedCount === checkboxes.length)
            selectAll_checkbox.checked = true;
        else
            selectAll_checkbox.checked = false;
    });
}
selectAll_checkbox.addEventListener("change", (e) => {
    if (selectAll_checkbox.checked) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            checkboxesSelectedCount = checkboxes.length;
            deleteSelected.style.display = "inline-block";
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            checkboxesSelectedCount = 0;
            deleteSelected.style.display = "none";
        }
    }
});

// --- for search ---
const findNextMultipleOf4 = (n) => {
    return ((4 - n % 4) + n);
}
// findNextMultiple = (n, m) => {
//     return ((n - m % n) + m)
// }
const searchBar = document.querySelector("#searchBar");
const searchItems = document.getElementsByClassName("searchItems");
searchBar.addEventListener("keyup", (e) => {
    let searchBarValue = searchBar.value.toLowerCase();
    for (let i = 0; i < searchItems.length; i++) {
        let searchItemValue = searchItems[i].textContent.toLowerCase();
        // console.log("SEARCH ITEMS VALUE: ", searchItemValue);
        if ((searchItemValue.includes(searchBarValue))) {
            // console.log("FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "";
            if ((i + 1) % 4 !== 0) {
                i = (findNextMultipleOf4(i) - 1);
            }
            // console.log("FOUND!", searchItems[i].parentElement.style.display);
        } else {
            // console.log("NOT FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "none";
        }
    }
});



if (getCookie("username") == null || getCookie("username") == "") {
    window.open("login.html", "_self");
}
setTimeout(() => {
    if (getCookie("username") == null || getCookie("username") == "") {
        window.open("login.html", "_self");
    }
}, 5000);

$(function () {
    $("#logoutButton").on('click', function () {
        setCookie("username", "", 0);
        setCookie("admintype", "", 0);
        window.open("login.html", "_self");
    });
});

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "server/user.php",
        data: { name: "getallusers" }
    }).done(function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
            M.toast({ html: "Loading Error!" });
        }
        else {
            var tableRows = "";
            for (var i = 0; i < result.length; i++) {
                var email = result[i][0];
                var name = result[i][1];
                var phone = result[i][2];

                var template = `
                <tr>
                    <td>
                        <label>
                            <input type="checkbox" class="filled-in checkbox" />
                            <span></span>
                        </label>
                    </td>
                    <td class="searchItems name_td">${name}</td>
                    <td class="searchItems website_td">${email}</td>
                    <td class="searchItems type_td">${phone}</td>
                    <td class="searchItems billingcountry_td hide">Russia</td>
                    <td class="billingstreet_td hide">20th street</td>
                    <td class="billingcity_td hide">sdads</td>
                    <td class="billingstate_td hide">fafdfsa</td>
                    <td class="billingpostal_td hide">323</td>
                    <td class="shippingstreet_td hide">ewsfsfd</td>
                    <td class="shippingcity_td hide">hhfdfd</td>
                    <td class="shippingstate_td hide">wtrre</td>
                    <td class="shippingcountry_td hide">fsdfdfsd</td>
                    <td class="shippingpostal_td hide">324</td>
                    <td class="gstin_td hide">534</td>
                    <td class="description_td hide">Whatever</td>
                    <td class="phone_td hide">324344534</td>
                    <td class="email_td hide">gfhg@gfdgf</td>
                    <td>
                        <a href="#modal" class="tooltipped modal-trigger view" data-position="bottom"
                            data-tooltip="view"><i class="fa fa-eye"></i></a>
                        <a href="#modal" class="tooltipped modal-trigger edit" data-position="bottom"
                            data-tooltip="edit"><i class="fa fa-edit"></i></a>
                        <a href="" class="tooltipped" data-position="bottom" data-tooltip="delete"><i
                                class="fa fa-trash"></i></a>
                    </td>
                </tr>
                `;
                tableRows += template;
            }
            document.getElementsByTagName("tbody")[0].innerHTML = tableRows;
        }

    });
});

