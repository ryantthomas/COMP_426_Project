$(function(){
    renderInfo();
    renderSearches();
})

let renderInfo = async function(){
    let token = window.localStorage.getItem('jwt');
    let data = await callAccountInfo(token);
    let name = data.user.name;
    let fullName = data.user.data.fullName;
    $('#root').append(`<p> Username: ${name} </p> 
        <p> Full Name: ${fullName} </p>`);
};

let renderSearches = async function(){
    let token = window.localStorage.getItem('jwt');
    let data = await callSearchInfo(token);
    let i;
    for (i= data.length - 1; i > -1;i --){
        $('#searches').append(`<p> ${data[i]} </p>`)
    }

}

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

let callSearchInfo = async function(jwt){
    const response = await axios({
        method: "get",
        url: "http://localhost:3000/user/searches",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data.result;
}