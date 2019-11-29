$(function(){
    $('.box').on('click', '.button', onLogin)
});

async function onLogin(event){
    event.preventDefault();
    let username = $('#userinput').val();
    let pass = $('#passinput').val();
    let jwt = await loginCall(username, pass);
    //set the jwt to a cookie so it can be retrieved later
    window.localStorage.setItem('jwt', jwt);
};

async function loginCall(username, pass){
    const response = await axios({
        method: "post",
        url: "http://localhost:3000/account/login",
        data: {
            name: username,
            pass: pass,
        }
    });
    return response.data.jwt;
};


