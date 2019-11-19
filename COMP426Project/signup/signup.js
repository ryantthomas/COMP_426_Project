$(function () {
    $('#main').on('click', '.button', addToBackEnd);
});

async function addToBackEnd(event) {
    event.preventDefault();

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