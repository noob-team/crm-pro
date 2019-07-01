// --- for including form tasks in modal ---
document.getElementsByClassName("modal-content")[0].innerHTML += taskFormContents;

// --- set contact link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-tasks")[0]
    .parentElement.parentElement
    .classList.add("active-link");

// --- for displaying/hiding the delete selected button, complete selected button and to select all ---
const selectAll_checkbox = document.querySelector("#selectAll");
const checkboxes = document.getElementsByClassName("checkbox");
const deleteSelected = document.querySelector("#delete-selected");
const completedSelected = document.querySelector("#completed-selected");
let checkboxesSelectedCount = 0
for(let i = 0;i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", (e) => {
        if(checkboxes[i].checked) {
            deleteSelected.style.display = "inline-block";
            completedSelected.style.display = "inline-block";
            checkboxesSelectedCount++;
        } else {
            checkboxesSelectedCount--;
            if(!checkboxesSelectedCount) {
                deleteSelected.style.display = "none";
                completedSelected.style.display = "none";
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
            completedSelected.style.display = "inline-block";
        }
    } else {
        for(let i = 0;i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            checkboxesSelectedCount = 0;
            deleteSelected.style.display = "none";
            completedSelected.style.display = "none";
        }
    }
});


// --- initialization for view, add and edit modals ---
const modal_form = document.querySelector("#modal-form");
const name_input = document.querySelector("#nameid");
const assignedUser_input = document.querySelector("#assigneduserid");
const status_select = document.querySelector("#statusid");
const priority_select = document.querySelector("#priorityid");
const duedate_input = document.querySelector("#duedateid");
const startdate_input = document.querySelector("#startdateid");
const duetime_input = document.querySelector("#duetimeid");
const starttime_input = document.querySelector("#starttimeid");
const description_input = document.querySelector("#descriptionid");

// add task details
document.querySelector("#add-btn").addEventListener("click", () => {
    modal_form.method = "POST";
    modal_form.action = "/add_task";
    console.log(modal_form);
    setLabelsInactive();
    setInputsOfModal({ name: "", assigneduser: "", status: "Not started", priority: "Normal",
        duedate: "", startdate: "", duetime: "", starttime: "", description: "" }, false);
    document.querySelector("#modal-heading").textContent = "Enter Task Details";
    document.querySelector("#modal-btn").style.display = "";
    document.querySelector("#modal-btn").textContent = "Add";
});

// getting the values
const getValues = (element) => {
    const parent_tr = element.parentElement.parentElement;
    const name = parent_tr.getElementsByClassName("name_td")[0].textContent;
    const priority = parent_tr.getElementsByClassName("priority_td")[0].textContent;
    const status = parent_tr.getElementsByClassName("status_td")[0].textContent;
    const assigneduser = parent_tr.getElementsByClassName("assigned_user_td")[0].textContent;
    const due = parent_tr.getElementsByClassName("due_date_td")[0].textContent.split(" | ");
    const start = parent_tr.getElementsByClassName("start_date_td")[0].textContent.split(" | ");
    const description = parent_tr.getElementsByClassName("description_td")[0].textContent;
    const startdate = start[0], starttime = start[1];
    const duedate = due[0], duetime = due[1];
    console.log(name, assigneduser, priority, status, duedate, duetime, startdate, starttime, description);
    return { name, assigneduser, priority, status, duedate, duetime, startdate, starttime, description };
}
// setting the labels as active
const setLabelsActive = () => {
    document.querySelector("label[for = 'nameid']").classList.add("active");
    document.querySelector("label[for = 'assigneduserid']").classList.add("active");
    document.querySelector("label[for = 'duedateid']").classList.add("active");
    document.querySelector("label[for = 'startdateid']").classList.add("active");
    document.querySelector("label[for = 'duetimeid']").classList.add("active");
    document.querySelector("label[for = 'starttimeid']").classList.add("active");
    document.querySelector("label[for = 'descriptionid']").classList.add("active");
}
// setting the labels as inactive
const setLabelsInactive = () => {
    document.querySelector("label[for = 'nameid']").classList.remove("active");
    document.querySelector("label[for = 'assigneduserid']").classList.remove("active");
    document.querySelector("label[for = 'duedateid']").classList.remove("active");
    document.querySelector("label[for = 'startdateid']").classList.remove("active");
    document.querySelector("label[for = 'duetimeid']").classList.remove("active");
    document.querySelector("label[for = 'starttimeid']").classList.remove("active");
    document.querySelector("label[for = 'descriptionid']").classList.remove("active");
}
// setting the modal input and select fields
const setInputsOfModal = ({ name, assigneduser, priority, status, duedate, duetime, startdate, starttime, description }, activeLabels) => {
    if(activeLabels) setLabelsActive();
    name_input.value = name;
    assignedUser_input.value = assigneduser;
    priority_select.value = priority;
    status_select.value = status;
    $('select').formSelect();
    duedate_input.value = duedate;
    duetime_input.value = duetime;
    startdate_input.value = startdate;
    starttime_input.value = starttime;
    description_input.value = description;
}

// view task details
const viewBtns = document.getElementsByClassName("view");
for(let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        document.querySelector("#modal-heading").textContent = "Task Details";
        document.querySelector("#modal-btn").style.display = "none";
    });
}

// edit task details
const editBtns = document.getElementsByClassName("edit");
for(let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", (e) => {
        const values = getValues(viewBtns[i]);
        setInputsOfModal(values, true);
        modal_form.method = "POST";
        modal_form.action = "/update_task";
        console.log(modal_form);
        document.querySelector("#modal-heading").textContent = "Edit Task Details";
        document.querySelector("#modal-btn").style.display = "";
        document.querySelector("#modal-btn").textContent = "Submit";
    });
}

// --- for searching ---
const searchBar = document.querySelector("#searchBar");
const searchBy = document.querySelector("#searchBy");
const name_item = document.getElementsByClassName("name_td");
const priority_item = document.getElementsByClassName("priority_td")
const status_item = document.getElementsByClassName("status_td")
const assignedUser_item = document.getElementsByClassName("assigned_user_td")
const dueDate_item = document.getElementsByClassName("due_date_td")
const startDate_item = document.getElementsByClassName("start_date_td")

searchBar.addEventListener("keyup", (e) => {
    let searchBarValue = searchBar.value.toLowerCase();
    let searchItems;

    switch (searchBy.value) {
        case "Task Name":
            searchItems = name_item;
            break;
        case "Assigned User":
            searchItems = assignedUser_item;
            break;
        case "Priority":
            searchItems = priority_item;
            break;
        case "Status":
            searchItems = status_item;
            break;
        case "Start Date":
            searchItems = startDate_item;
            break;
        case "Due Date":
            searchItems = dueDate_item;
            break;
    }

    for(let i = 0;i < searchItems.length; i++) {
        let searchItemValue = searchItems[i].textContent.toLowerCase();
        // console.log("SEARCH ITEMS VALUE: ", searchItemValue);
        if((searchItemValue.includes(searchBarValue))) {
            // console.log("FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "";
            // console.log("FOUND!", searchItems[i].parentElement.style.display);
        } else {
            // console.log("NOT FOUND!", searchItems[i].parentElement);
            searchItems[i].parentElement.style.display = "none";
        }
    }
});