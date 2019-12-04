//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call


//tokenStr = window.localStorage.getItem('jwt')
//headers: { Authorization: `Bearer ${tokenStr}` }
$(function(){
    renderFavorites();
    $('#main').on('click', '.submit', onSubmit);
});

const onSubmit = async function(event) {
    let token = window.localStorage.getItem('jwt');
    let userData = await callAccountInfo(token);
    let username = userData.user.name;
    event.preventDefault();
    let name = $('.song-name').val();
    let artist = $('.artist').val();
    let comment = $('.comments').val();
    let object = {
        username: username,
        name: name,
        artist: artist,
        comments: comment
    }
    await postSuggestion(object);
};

async function postSuggestion(suggestion){
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "post",
        url: "http://localhost:3000/private/favorites",
        headers: { Authorization: `Bearer ${token}` },
        data: { 
            "data": suggestion,
            "type": "merge"
        }
    });
};

async function getFavorites(){
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "get",
        url: "http://localhost:3000/private/favorites",
        headers: { Authorization: `Bearer ${token}` }
    });
    return result.data;
};

async function onDelete(){
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "delete",
        url: "http://localhost:3000/private/favorites",
        headers: { Authorization: `Bearer ${token}` }
    });
};

async function onDelete(){
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "update",
        url: "http://localhost:3000/private/favorites",
        headers: { Authorization: `Bearer ${token}` }
    });
};


async function renderFavorites(){
    let data = await getFavorites();
    let token = window.localStorage.getItem('jwt');
    let userData = await callAccountInfo(token);
    let username = userData.user.name;
    let htmlString = ``;
    for (let i=data.result.length -1; i> -1; i--) {
        if(username != data.result[i].username) {
                htmlString += `<div class = "box">
                                    <label class="label">Username: </label>${data.result[i].username}
                                    <label class="label">Name: </label>${data.result[i].name} 
                                    <label class="label">Artist: </label>${data.result[i].artist}
                                    <label class="label">Comment: </label>${data.result[i].comments}
                                </div>`;
        } else {
            htmlString += `<div class = "box">
                                    <label class="label">Username: </label>${data.result[i].username}
                                    <label class="label">Name: </label>${data.result[i].name} 
                                    <label class="label">Artist: </label>${data.result[i].artist}
                                    <label class="label">Comment: </label>${data.result[i].comments}
                                    <br><br>
                                    <button class="button is-large is-info">Edit</button>
                                    <button class="button is-large is-info"">Delete</button>
                                </div>`;
        }
    }
    $('#root').append(htmlString);
};

//gets the account information
let callAccountInfo = async function(jwt) {
    const response = await axios({
        method: "get",
        url: "http://localhost:3000/account/status",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data;
};