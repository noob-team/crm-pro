// --- for including form contents in modal ---
document.getElementsByClassName("modal-content")[0].innerHTML += contactFormContents;

// --- set contact link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-address-book")[0]
    .parentElement.parentElement
    .classList.add("active-link");

// --- for displaying/hiding the delete selected button and to select all ---
const selectAll_checkbox = document.querySelector("#selectAll");
const checkboxes = document.getElementsByClassName("checkbox");
const deleteSelected = document.querySelector("#delete-selected");
let checkboxesSelectedCount = 0
for(let i = 0;i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", (e) => {
        if(checkboxes[i].checked) {
            deleteSelected.style.display = "inline-block";
            checkboxesSelectedCount++;
        } else {
            checkboxesSelectedCount--;
            if(!checkboxesSelectedCount) {
                deleteSelected.style.display = "none";
            }
        }
        if(checkboxesSelectedCount === checkboxes.length)
            selectAll_checkbox.checked = true;
        else
            selectAll_checkbox.checked = false;
    });
}
selectAll_checkbox.addEventListener("change", (e) => {
    if(selectAll_checkbox.checked) {
        for(let i = 0;i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            checkboxesSelectedCount = checkboxes.length;
            deleteSelected.style.display = "inline-block";
        }
    } else {
        for(let i = 0;i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            checkboxesSelectedCount = 0;
            deleteSelected.style.display = "none";
        }
    }
});

// --- for search ---
const findNextMultipleOf3 = (n) => {
    return ((3 - n % 3) + n);
}
// findNextMultiple = (n, m) => {
//     return ((n - m % n) + m)
// }
const searchBar = document.querySelector("#searchBar");
const searchItems = document.getElementsByClassName("searchItems");
searchBar.addEventListener("keyup", (e) => {
    let searchBarValue = searchBar.value.toLowerCase();
    for(let i = 0;i < searchItems.length; i++) {
        let searchItemValue = searchItems[i].textContent.toLowerCase();
        // console.log("SEARCH ITEMS VALUE: ", searchItemValue);
        if((searchItemValue.includes(searchBarValue))) {
            // console.log("FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "";
            if((i + 1) % 3 !== 0) {
                i = (findNextMultipleOf3(i) - 1);
            }
            // console.log("FOUND!", searchItems[i].parentElement.style.display);
        } else {
            // console.log("NOT FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "none";
        }
    }
});

// --- initialization for view, add and edit modals ---
const modal_form = document.querySelector("#modal-form");
const name_input = document.querySelector("#nameid");
const phone_input = document.querySelector("#telephoneid");
const email_input = document.querySelector("#emailid");
const address_input = document.querySelector("#addressid");
const accounts_select = document.querySelector("#accountsid");
const city_input = document.querySelector("#cityid");
const state_input = document.querySelector("#stateid");
const country_input = document.querySelector("#countryid");

// add contact details
document.querySelector("#add-btn").addEventListener("click", () => {
    modal_form.method = "POST";
    modal_form.action = "/add_contact";
    console.log(modal_form);
    setLabelsInactive();
    setInputsOfModal({ name: "", email: "", phone: "", city: "", state: "", country: "" }, false);
    document.querySelector("#modal-heading").textContent = "Enter Contact Details";
    document.querySelector("#modal-btn").style.display = "";
    document.querySelector("#modal-btn").textContent = "Add";
});

// getting the values
const getValues = (element) => {
    const parent_tr = element.parentElement.parentElement;
    const name = parent_tr.getElementsByClassName("name_td")[0].textContent;
    const phone = parent_tr.getElementsByClassName("phone_td")[0].textContent;
    const email = parent_tr.getElementsByClassName("email_td")[0].textContent;
    const accounts = parent_tr.getElementsByClassName("accounts_td")[0].textContent;
    const city = parent_tr.getElementsByClassName("city_td")[0].textContent;
    const state = parent_tr.getElementsByClassName("state_td")[0].textContent;
    const country = parent_tr.getElementsByClassName("country_td")[0].textContent;
    console.log(name, phone, email, accounts, city, state, country);
    return { name, phone, email, accounts, city, state, country };
}
// setting the labels as active
const setLabelsActive = () => {
    document.querySelector("label[for = 'nameid']").classList.add("active");
    document.querySelector("label[for = 'telephoneid']").classList.add("active");
    document.querySelector("label[for = 'emailid']").classList.add("active");
    document.querySelector("label[for = 'cityid']").classList.add("active");
    document.querySelector("label[for = 'stateid']").classList.add("active");
    document.querySelector("label[for = 'countryid']").classList.add("active");
}
// setting the labels as inactive
const setLabelsInactive = () => {
    document.querySelector("label[for = 'nameid']").classList.remove("active");
    document.querySelector("label[for = 'telephoneid']").classList.remove("active");
    document.querySelector("label[for = 'emailid']").classList.remove("active");
    document.querySelector("label[for = 'cityid']").classList.remove("active");
    document.querySelector("label[for = 'stateid']").classList.remove("active");
    document.querySelector("label[for = 'countryid']").classList.remove("active");
}
// setting the modal input and select fields
const setInputsOfModal = ({ name, phone, email, city, state, country }, activeLabels) => {
    if(activeLabels) setLabelsActive();
    name_input.value = name;
    phone_input.value = phone;
    email_input.value = email;
    city_input.value = city;
    state_input.value = state;
    country_input.value = country;
    $('select').formSelect();
}

// view contact details
const viewBtns = document.getElementsByClassName("view");
for(let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        document.querySelector("#modal-heading").textContent = "Contact Details";
        document.querySelector("#modal-btn").style.display = "none";
    });
}

// edit contact details
const editBtns = document.getElementsByClassName("edit");
for(let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        modal_form.method = "POST";
        modal_form.action = "/update_contact";
        console.log(modal_form);
        document.querySelector("#modal-heading").textContent = "Edit Contact Details";
        document.querySelector("#modal-btn").style.display = "";
        document.querySelector("#modal-btn").textContent = "Submit";
    });
}