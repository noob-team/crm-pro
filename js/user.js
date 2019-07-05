
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

$("#modalButtonYes").click(function (e) {
    var email = e.currentTarget.name;
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "user.php",
        data: { "name": "deleteUser", "email": email }
    }).done(function (data) {
        var result = $.parseJSON(data);
        document.getElementById('modelParagraph').innerText = "";
        document.getElementById('modalButtonYes').name = "";
        if (result.error) {
            M.toast({ html: "Error deleting user!" });
        }
        else {
            window.open('users.html', '_self');
        }
    });
});


$(document).ready(function () {
    $('.modal').modal();
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "user.php",
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
                    <td>
                        <a href="showuser.html?email=${email}" class="tooltipped  view" data-position="bottom"
                            data-tooltip="view"><i class="fa fa-eye"></i></a>
                        <a href="edituser.html?email=${email}" class="tooltipped edit" data-position="bottom"
                            data-tooltip="edit"><i class="fa fa-edit"></i></a>
                        <button data-target="modal" class="btn-flat singleDelete modal-trigger waves-effect waves-light" name='${email}'><i
                                class="fa fa-trash"></i></button>
                    </td>
                </tr>
                `;
                tableRows += template;
            }
            document.getElementsByTagName("tbody")[0].innerHTML = tableRows;

            $(".singleDelete").click(function (e) {
                document.getElementById('modelParagraph').innerText = "Are you sure you want to delete user " + e.currentTarget.name + " ?";
                document.getElementById('modalButtonYes').name = e.currentTarget.name;
            });
        }

    });
});

