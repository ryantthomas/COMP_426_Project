$(function(){
    $('#logOut').on('click', onLogout);
});


let onLogout = function(){
    window.localStorage.removeItem('jwt');
}