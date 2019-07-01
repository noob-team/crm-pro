const taskFormContents = `
    <div class="row">
        <form id = "modal-form" class="col s12">
            <div class="row">
                <div class="input-field col s12 m6">
                    <input id="nameid" name = "name" type="text" class="validate" required>
                    <label for="nameid">Task Name</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="assigneduserid" name = "assigneduser" type="text" class="validate" required>
                    <label for="assigneduserid">Assigned User</label>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <select id = "statusid" name = "status">
                            <option value="Not started" selected>Not started</option>
                            <option value="Started">Started</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <label>Status</label>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <select id = "priorityid" name = "priority">
                            <option value="Low">Low</option>
                            <option value="Normal" selected>Normal</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                        <label>Priority</label>
                    </div>
                </div>
                <div class="input-field col s6 m3">
                    <input type="text" id = "startdateid" name = "startdate" class="datepicker" required>
                    <label for="startdateid">Start date</label>
                </div>
                <div class="input-field col s6 m3">
                    <input type="text" id = "starttimeid" name = "starttime" class="timepicker" required>
                    <label for="starttimeid">Start Time</label>
                </div>
                <div class="input-field col s6 m3">
                    <input type="text" id = "duedateid" name = "duedate" class="datepicker" required>
                    <label for="duedateid">Due date</label>
                </div>
                <div class="input-field col s6 m3">
                    <input type="text" id = "duetimeid" name = "duetime" class="timepicker" required>
                    <label for="duetimeid">Due Time</label>
                </div>
                <div class="input-field col s12 m12">
                    <textarea id="descriptionid" name = "description" class="materialize-textarea"></textarea>
                    <label for="descriptionid">Descripion</label>
                </div>
            </div>
            <div class = "center">
                <button id = "modal-btn" class="btn waves-effect waves-light indigo">Add</button>
            </div>
        </form>
    </div>
`;