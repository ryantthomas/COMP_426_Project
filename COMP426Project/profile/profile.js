$(function(){
    renderInfo();
    renderSearches();
    $('#searches').on('click', '.button', onDeletePress);
})

let onDeletePress = async function(event){
    event.preventDefault();
    let token = window.localStorage.getItem('jwt');
    let artist = event.target.closest('div').id;
    await callDelete(artist, token);
    $(`#${artist}`).replaceWith('');
}

let renderInfo = async function(){
    let token = window.localStorage.getItem('jwt');
    let data = await callAccountInfo(token);
    let name = data.user.name;
    let fullName = data.user.data.fullName;
    $('#root').append(`<p> Username: ${name} </p> <p> Full Name: ${fullName} </p>`);
};

let renderSearches = async function(){
    let token = window.localStorage.getItem('jwt');
    let data = await callSearchInfo(token);
    let keys = Object.keys(data);
    let i;
    let j;
    let htmlString = ``;
    for (j = 0; j < keys.length; j ++){
        htmlString += `<div class = "section" id = '${keys[j]}'> Recommendations based on <strong> ${keys[j]} </strong> <ul>`;
        for (i= 0; i < data[keys[j]].results.length; i ++){
            htmlString += `<li> ${data[keys[j]].results[i]} </li>`;
        }
        htmlString += `</ul> <button class = "button"> Delete these results from profile</button> </div>`;
    }
    $(`#searches`).append(htmlString);
}

let callDelete = async function(name, jwt){
    const response = await axios({
        method: "delete",
        url: "http://localhost:3000/user/artists/" + name,
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
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

let callSearchInfo = async function(jwt){
    const response = await axios({
        method: "get",
        url: "http://localhost:3000/user/artists",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data.result;
}