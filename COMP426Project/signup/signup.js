$(function () {
    $('#main').on('click', '.button', addToBackEnd);
});


const acctRoot = new axios.create({
    baseURL: "http://localhost:3000/account/"
});

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
    });
}

async function addToBackEnd(event) {
    event.preventDefault();
    alert($('.usernameinput').val() + " " + $('.passwordinput').val())
    await createLogin(
    $('.usernameinput').val(), 
    $('.passwordinput').val(), 
    $('.emailinput').val(),
    $('.fullnameinput').val());
}