//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call


//tokenStr = window.localStorage.getItem('jwt')
//headers: { Authorization: `Bearer ${tokenStr}` }
$(function(){
    renderFavorites();
    $('#main').on('click', '.submit', onSubmit);
    $('#main').on('click', '.delete-btn', onDelete);
});

const onSubmit = async function(event) {
    let token = window.localStorage.getItem('jwt');
    let userData = await callAccountInfo(token);
    let username = userData.user.name;
    event.preventDefault();
    let name = $('.song-name').val();
    let artist = $('.artist').val();
    let comment = $('.comments').val();
    let id = Date.now();
    let object = {
        id: id,
        username: username,
        name: name,
        artist: artist,
        comments: comment
    }
    await postSuggestion(object, id);
};

const onDelete = async function(event) {
  //extracts the id of the tweet box
  let suggestion = $(event.target).closest(".suggestion-box");
  let id = suggestion.data("id");

  //like the tweet
  deleteSuggestion(id);

  //Replaces with nothing
  suggestion.replaceWith(``);
}

async function postSuggestion(suggestion, id){
    let url = "http://localhost:3000/private/favorites/" +id;
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${token}` },
        data: { 
            "data": suggestion,
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

async function getFavoritesAtID(id){
    let url = "http://localhost:3000/private/favorites/" + id;
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return result.data;
};

async function deleteSuggestion(id){
    let url = "http://localhost:3000/private/favorites/" +id;
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "delete",
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
};



async function renderFavorites(){
    let data = await getFavorites();
    let token = window.localStorage.getItem('jwt');
    let userData = await callAccountInfo(token);
    let username = userData.user.name;
    let htmlString = ``;
    for (var i in data.result) {

        if(username != data.result[i].username) {
                htmlString = `<div class = "box suggestion-box" data-id= ${data.result[i].id}>
                                    <label class="label">Username: </label>${data.result[i].username}
                                    <label class="label">Name: </label>${data.result[i].name} 
                                    <label class="label">Artist: </label>${data.result[i].artist}
                                    <label class="label">Comment: </label>${data.result[i].comments}
                                </div>`+htmlString;
        } else {
            htmlString = `<div class = "box suggestion-box" data-id= ${data.result[i].id}>
                                    <label class="label">Username: </label>${data.result[i].username}
                                    <label class="label">Name: </label>${data.result[i].name} 
                                    <label class="label">Artist: </label>${data.result[i].artist}
                                    <label class="label">Comment: </label>${data.result[i].comments}
                                    <br><br>
                                    <button class="button is-large is-info edit">Edit</button>
                                    <button class="button is-large is-info delete-btn">Delete</button>
                            </div>`+htmlString;
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