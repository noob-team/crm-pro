
// --- set accounts link active ---
document.querySelector("#sidebar")
    .getElementsByClassName("fa-calendar-week")[0]
    .parentElement.parentElement
    .classList.add("active-link");


$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "mulitrequest.php",
        data: { name: "getdates" }
    }).done(function (data) {
        var result = $.parseJSON(data);

        var events = [];

        if (result['calls'].length != 0) {
            var calls = result['calls'];
            for (var i = 0; i < calls.length; i++) {
                var call = calls[i];
                var name = "Call: " + call[1];
                var url = `showcall.html?email=${call[0]}`;
                var start = call[7] + "T" + call[8];
                var end = call[9] + "T" + call[10];
                var event = {
                    'title': name,
                    'url': url,
                    'start': start,
                    'end': end,
                    'color': 'purple'
                };
                events.push(event);
            }
        }


        if (result['tasks'].length != 0) {
            var tasks = result['tasks'];
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var name = "Task: " + task[1];
                var url = `showtask.html?email=${task[0]}`;
                var start = task[4] + "T" + task[5];
                var end = task[6] + "T" + task[7];

                var priority = task[9];
                var color = '';
                if (priority == 'Urgent') {
                    color = 'red';
                }
                else if (priority == 'High') {
                    color = 'orange';
                }
                else if (priority == 'Normal') {
                    color = 'blue';
                }
                else {
                    color = 'green';
                }

                var event = {
                    'title': name,
                    'url': url,
                    'start': start,
                    'end': end,
                    'color': color
                };
                events.push(event);

            }


        }

        $('#calendar').fullCalendar({
            themeSystem: 'bootstrap3',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            weekNumbers: true,
            navLinks: true,
            eventLimit: true,
            'events': events
        });



    })
});






