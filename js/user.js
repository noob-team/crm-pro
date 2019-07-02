// --- for including form contents in modal ---
document.getElementsByClassName("modal-content")[0].innerHTML += accountFormContents;

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

// --- initialization for view, add and edit modals ---
const modal_form = document.querySelector("#modal-form");
const name_input = document.querySelector("#nameid");
const phone_input = document.querySelector("#telephoneid");
const email_input = document.querySelector("#emailid");
const website_input = document.querySelector("#websiteid");
const type_select = document.querySelector("#typeid");
const gstin_input = document.querySelector("#gstinid");
const billingstreet_input = document.querySelector("#billingstreetid");
const billingcity_input = document.querySelector("#billingcityid");
const billingstate_input = document.querySelector("#billingstateid");
const billingpostal_input = document.querySelector("#billingpostalid")
const billingcountry_input = document.querySelector("#billingcountryid");
const shippingstreet_input = document.querySelector("#shippingstreetid");
const shippingcity_input = document.querySelector("#shippingcityid");
const shippingstate_input = document.querySelector("#shippingstateid");
const shippingpostal_input = document.querySelector("#shippingpostalid")
const shippingcountry_input = document.querySelector("#shippingcountryid");
const description_input = document.querySelector("#descriptionid");

// add account details
document.querySelector("#add-btn").addEventListener("click", () => {
    modal_form.method = "POST";
    modal_form.action = "/add_account";
    console.log(modal_form);
    setLabelsInactive();
    setInputsOfModal({
        name: "", email: "", phone: "", website: "", type: "", gstin: "", description: "",
        billingstreet: "", billingcity: "", billingstate: "", billingcountry: "", billingpostal: "",
        shippingstreet: "", shippingcity: "", shippingstate: "", shippingcountry: "", shippingpostal: ""
    }, false);
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
    const website = parent_tr.getElementsByClassName("website_td")[0].textContent;
    const gstin = parent_tr.getElementsByClassName("gstin_td")[0].textContent;
    const type = parent_tr.getElementsByClassName("type_td")[0].textContent;
    const billingstreet = parent_tr.getElementsByClassName("billingstreet_td")[0].textContent;
    const billingcity = parent_tr.getElementsByClassName("billingcity_td")[0].textContent;
    const billingstate = parent_tr.getElementsByClassName("billingstate_td")[0].textContent;
    const billingcountry = parent_tr.getElementsByClassName("billingcountry_td")[0].textContent;
    const billingpostal = parent_tr.getElementsByClassName("billingpostal_td")[0].textContent;
    const shippingstreet = parent_tr.getElementsByClassName("shippingstreet_td")[0].textContent;
    const shippingcity = parent_tr.getElementsByClassName("shippingcity_td")[0].textContent;
    const shippingstate = parent_tr.getElementsByClassName("shippingstate_td")[0].textContent;
    const shippingcountry = parent_tr.getElementsByClassName("shippingcountry_td")[0].textContent;
    const shippingpostal = parent_tr.getElementsByClassName("shippingpostal_td")[0].textContent;
    const description = parent_tr.getElementsByClassName("description_td")[0].textContent;
    console.log(name, phone, email, website, gstin, description, type,
        billingstreet, billingcity, billingstate, billingcountry, billingpostal,
        shippingstreet, shippingcity, shippingstate, shippingcountry, shippingpostal);
    return {
        name, phone, email, website, gstin, description, type,
        billingstreet, billingcity, billingstate, billingcountry, billingpostal,
        shippingstreet, shippingcity, shippingstate, shippingcountry, shippingpostal
    };
}
// setting the labels as active
const setLabelsActive = () => {
    document.querySelector("label[for = 'nameid']").classList.add("active");
    document.querySelector("label[for = 'telephoneid']").classList.add("active");
    document.querySelector("label[for = 'emailid']").classList.add("active");
    document.querySelector("label[for = 'websiteid']").classList.add("active");
    document.querySelector("label[for = 'gstinid']").classList.add("active");
    document.querySelector("label[for = 'billingstreetid']").classList.add("active");
    document.querySelector("label[for = 'billingcityid']").classList.add("active");
    document.querySelector("label[for = 'billingstateid']").classList.add("active");
    document.querySelector("label[for = 'billingcountryid']").classList.add("active");
    document.querySelector("label[for = 'billingpostalid']").classList.add("active");
    document.querySelector("label[for = 'shippingstreetid']").classList.add("active");
    document.querySelector("label[for = 'shippingcityid']").classList.add("active");
    document.querySelector("label[for = 'shippingstateid']").classList.add("active");
    document.querySelector("label[for = 'shippingcountryid']").classList.add("active");
    document.querySelector("label[for = 'shippingpostalid']").classList.add("active");
    document.querySelector("label[for = 'descriptionid']").classList.add("active");
}
// setting the labels as inactive
const setLabelsInactive = () => {
    document.querySelector("label[for = 'nameid']").classList.remove("active");
    document.querySelector("label[for = 'telephoneid']").classList.remove("active");
    document.querySelector("label[for = 'emailid']").classList.remove("active");
    document.querySelector("label[for = 'websiteid']").classList.remove("active");
    document.querySelector("label[for = 'gstinid']").classList.remove("active");
    document.querySelector("label[for = 'billingstreetid']").classList.remove("active");
    document.querySelector("label[for = 'billingcityid']").classList.remove("active");
    document.querySelector("label[for = 'billingstateid']").classList.remove("active");
    document.querySelector("label[for = 'billingcountryid']").classList.remove("active");
    document.querySelector("label[for = 'billingpostalid']").classList.remove("active");
    document.querySelector("label[for = 'shippingstreetid']").classList.remove("active");
    document.querySelector("label[for = 'shippingcityid']").classList.remove("active");
    document.querySelector("label[for = 'shippingstateid']").classList.remove("active");
    document.querySelector("label[for = 'shippingcountryid']").classList.remove("active");
    document.querySelector("label[for = 'shippingpostalid']").classList.remove("active");
    document.querySelector("label[for = 'descriptionid']").classList.remove("active");
}
// setting the modal input and select fields
const setInputsOfModal = ({ name, phone, email, type, website, description, gstin,
    billingstreet, billingcity, billingstate, billingcountry, billingpostal,
    shippingstreet, shippingcity, shippingstate, shippingcountry, shippingpostal }, activeLabels) => {
    if (activeLabels) setLabelsActive();
    name_input.value = name;
    phone_input.value = phone;
    email_input.value = email;
    type_select.value = type;
    website_input.value = website;
    gstin_input.value = gstin;
    billingstreet_input.value = billingstreet;
    billingcity_input.value = billingcity;
    billingstate_input.value = billingstate;
    billingcountry_input.value = billingcountry;
    billingpostal_input.value = billingpostal;
    shippingstreet_input.value = shippingstreet;
    shippingcity_input.value = shippingcity;
    shippingstate_input.value = shippingstate;
    shippingcountry_input.value = shippingcountry;
    shippingpostal_input.value = shippingpostal;
    description_input.value = description;
    $('select').formSelect();
}

// view account details
const viewBtns = document.getElementsByClassName("view");
for (let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        document.querySelector("#modal-heading").textContent = "Account Details";
        document.querySelector("#modal-btn").style.display = "none";
    });
}

// edit account details
const editBtns = document.getElementsByClassName("edit");
for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        modal_form.method = "POST";
        modal_form.action = "/update_account";
        console.log(modal_form);
        document.querySelector("#modal-heading").textContent = "Edit Account Details";
        document.querySelector("#modal-btn").style.display = "";
        document.querySelector("#modal-btn").textContent = "Submit";
    });
}