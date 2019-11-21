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
    // Include check to make sure some username and password have been entered
    // if() {

    // }

    // $.ajax({
    //     url: 'http://localhost:3000/account/create',
    //     method: 'post',
    //     name: $('usernameinput').val(),
    //     pass: $('passwordinput').val(),
    //     data: {
    //         //anything we add here is optional
    //         fullName: $('.fullnameinput').val(),
    //         email: $('emailinput').val(),
    //         age: $('.ageinput').val(),
    //     },
    // });
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