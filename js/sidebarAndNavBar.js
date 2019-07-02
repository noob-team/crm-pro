document.body.innerHTML = `
    <!-- navbar -->
    <!-- PC navbar -->
    <div class = "navbar-fixed">
        <nav class = "indigo">   
            <span id = "trigger" class = "brand-logo hide-on-med-and-down" style = "padding-top: 20px;"><i id = "trigger-icon" class = "fa fa-bars white-text"></i></span>
            <div class="nav-wrapper container">
                <span id = "trigger" class = "brand-logo"><a href="">CRM</a></span>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="#!" class="collection-item tooltipped" data-position="bottom" data-tooltip="Notifications"><i class="fas fa-bell"></i><span class="new badge red darken-4">0</span></a></li>
                    <li><a class="dropdown-trigger tooltipped" href="#!" data-target="dropdown" data-position="bottom" data-tooltip="Create"><i class="fas fa-plus"></i></a></li>
                    <li><a id="logoutButton" class = "tooltipped" data-position="bottom" data-tooltip="Logout"><i class="fa fa-sign-out-alt"></i></a></li>
                </ul>
            </div>
        </nav>
    </div>
    <!-- PC navbar end -->
    <!-- Dropdown -->
    <ul id="dropdown" class="dropdown-content">
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Account</a></li>
        <li class="divider"></li>
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Contact</a></li>
        <li class="divider"></li>
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Email</a></li>
        <li class="divider"></li>
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Meeting</a></li>
        <li class="divider"></li>
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Call</a></li>
        <li class="divider"></li>
        <li><a href="#!" style = "color: var(--indigo); text-align: center;">Task</a></li>
        <li class="divider"></li>
        <li><a href="users.html" style = "color: var(--indigo); text-align: center;">User</a></li>
    </ul>
    <!-- Dropdown end -->
    <!-- Mobile sidenav -->
    <ul class="sidenav" id="mobile-demo">
        <li><a id="logoutButton" class = "tooltipped" data-position="bottom" data-tooltip="Logout"><i class="fa fa-sign-out-alt"></i></a></li>
        <li><a href="index.html"><i class="fa fa-home"></i>HOME</a></li>
        <li><a href=""><i class="fa fa-user-circle"></i>ACCOUNTS</a></li>
        <li><a href=""><i class="fa fa-address-book"></i>CONTACTS</a></li>
        <li><a href=""><i class="fa fa-envelope"></i>EMAILS</a></li>
        <li><a href=""><i class="fa fa-calendar-week"></i>CALENDER</a></li>
        <li><a href=""><i class="fas fa-handshake"></i>MEETINGS</a></li>
        <li><a href=""><i class="fa fa-phone"></i>CALLS</a></li>
        <li><a href=""><i class="fa fa-tasks"></i>TASKS</a></li>
        <li><a href="users.html"><i class="fa fa-user"></i>USERS</a></li>
    </ul>
    <!-- Mobile sidenav end -->
    <!-- navbar end -->
    
    <!-- sidebar -->
    <div id = "sidebar" class = "indigo z-depth-2 hide-on-med-and-down">
        <ul>
            <li><a href="index.html"><i class="fa fa-home"></i>HOME</a></li>
            <li><a href=""><i class="fa fa-user-circle"></i>ACCOUNTS</a></li>
            <li><a href=""><i class="fa fa-address-book"></i>CONTACTS</a></li>
            <li><a href=""><i class="fa fa-envelope"></i>EMAILS</a></li>
            <li><a href=""><i class="fa fa-calendar-week"></i>CALENDER</a></li>
            <li><a href=""><i class="fas fa-handshake"></i>MEETINGS</a></li>
            <li><a href=""><i class="fa fa-phone"></i>CALLS</a></li>
            <li><a href=""><i class="fa fa-tasks"></i>TASKS</a></li>
            <li><a href="users.html"><i class="fa fa-user"></i>USERS</a></li>
        </ul>
    </div>
    <!-- sidebar end -->
` + document.body.innerHTML;

// sidebar script     
let sidebar = document.getElementById("sidebar");
let triggerIcon = document.getElementById("trigger-icon");
triggerIcon.addEventListener("click", (e) => {
    sidebar.classList.toggle("active");
});