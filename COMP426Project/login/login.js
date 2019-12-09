$(function(){
    $('.box').on('click', '.button', onLogin)
    $('#main').on('click', '.deleteButton', function() {
        $('#message').empty();
    });
});

async function onLogin(event){
    event.preventDefault();
    let username = $('#userinput').val();
    let pass = $('#passinput').val();
    let jwt = await loginCall(username, pass);
    //set the jwt to a cookie so it can be retrieved later
    window.localStorage.setItem('jwt', jwt);
    //to access jwt again use window.localStorage.getItem('jwt');
};

async function loginCall(username, pass){
    const response = await axios({
        method: "post",
        url: "http://localhost:3000/account/login",
        data: {
            name: username,
            pass: pass,
        }
    }).then(
        (response) => {
            // alert("Response " + response.status);
            $('#message').empty();
            $('#message').append('<div class = "notification is-success">' +
            '<button class = "delete deleteButton"></button>Successfully logged in. Redirecting in 3 seconds or click to return to the ' + 
            '<a href  = "../index.html">homepage' + '</div>');

            setTimeout(function() {window.location.replace("../index.html");}, 3000);
            return response.data.jwt;
        }
    ).catch(err => {
        // alert("Error " + err.response.status);
        $('#message').empty();
        $('#message').append('<div class = "notification is-danger">' +
        '<button class = "delete deleteButton" id = "delete"></button>Unable to login: ' + err.response.status +' error </div>');
    });
};


