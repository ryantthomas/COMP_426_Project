$(function(){
    $('.box').on('click', '.button', onLogin)
});

async function onLogin(event){
    event.preventDefault();
    let username = $('#userinput').val();
    let pass = $('#passinput').val();
    await loginCall(username, pass);
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
}
