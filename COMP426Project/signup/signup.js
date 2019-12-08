$(function () {
    $('#main').on('click', '#submit', addToBackEnd);
    $('#main').on('click', '.deleteButton', function() {
        $('#message').empty();
    });
});


/**In order to post something to account.js you must first run:
 * npm run dev-live-reload 
 * Which starts the server/API or whatever its called
 * Important to start the server before browser-sync, the server has to run on the 3000 port, if the 3000 port 
 * is blocked by something (likely the server if you run it and forget to close it like me) 
 * Enter this cmd line prompt:
 * netstat  -ano  |  findstr <port number> 
 * In this case '<port number>' can just be replaced by 3000 so: 
 * netstat  -ano  |  findstr 3000
 * The number that comes after LISTENING is a 'PID' number
 * Go to Task Manager -> More Details (if not already showing) -> Details -> find the matching PID 
 * Which should be some Node.js file running and just terminate the task
*/


async function createLogin (username, password, emailParam, full) {
    const response = await axios({
        method: "post",
        url: "http://localhost:3000/account/create",
        data: {
            name: username,
            pass: password,
            data: {
                email: emailParam,
                fullName: full, 
            },
        },
    }).then(
        (response) => {
            // alert("Response " + response.status);
            $('#message').empty();
            $('#message').append('<div class = "notification is-success">' +
            '<button class = "delete deleteButton "></button>Account successfully made. Return to the ' + 
            '<a href  = "../index.html">homepage' + '</div>');
        }
    ).catch(err => {
        // alert("Error " + err.response.status);
        $('#message').empty();
        $('#message').append('<div class = "notification is-danger">' +
        '<button class = "delete deleteButton" id = "delete"></button>Unable to create account: ' + err.response.status +' error </div>');
    });
    // include a then to redirect upon successful creation of the acocunt
    // catch the error and display an html element to show theres an error
}

async function addToBackEnd(event) {
    event.preventDefault();
    //alert($('.usernameinput').val() + " " + $('.passwordinput').val())
    await createLogin(
    $('.usernameinput').val(), 
    $('.passwordinput').val(), 
    $('.emailinput').val(),
    $('.fullnameinput').val());
}