
$(function(){
    renderInfo();
})

let renderInfo = async function(){
    let token = window.localStorage.getItem('jwt');
    let data = await callAccountInfo(token);
    let name = data.user.name;
    let fullName = data.user.data.fullName;
    $('#root').append(`<p> Username: ${name} </p> <p> Full Name: ${fullName}`);
};


let callAccountInfo = async function(jwt){
    const response = await axios({
        method: "get",
        url: "http://localhost:3000/account/status",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data;
};