//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call


//tokenStr = window.localStorage.getItem('jwt')
//headers: { Authorization: `Bearer ${tokenStr}` }

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
    $('#root').replaceWith(`<div id="root">
                            </div>`);
    renderFavorites();
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

const onEdit = async function(event) {
    let editbtn = $(event.target).closest(".edit");
    let suggestion = $(event.target).closest(".suggestion-box");
    let id = suggestion.data("id");
    suggestion.append(`<br><br><textarea id= "edit-text" class="textarea edit-text" data-id:${id} value="Change Your Comment Here!">Change Your Comment Here!</textarea>
                       <button class="button is-large submit-edit">Submit Edit</button>`);
    editbtn.replaceWith(``);
  }

  const onEditSubmit = async function(event) {
    let suggestion = $(event.target).closest(".suggestion-box");
    let id = suggestion.data("id");
    let commentChange = document.getElementById("edit-text").value
    await editSuggestion(id, commentChange);
    let newSuggestion = await updateSuggestion(id);
    suggestion.replaceWith(newSuggestion);
  }

async function editSuggestion(id, commentChange){
    let url = "http://localhost:3000/private/favorites/" +id+ "/comments";
    let token = window.localStorage.getItem('jwt');
    const result = await axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${token}` },
        data: { 
            "data": commentChange,
        }
    });
};

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
                                    <label class="label">User: </label>${data.result[i].username}
                                    <label class="label">Name: </label>${data.result[i].name} 
                                    <label class="label">Artist: </label>${data.result[i].artist}
                                    <label class="label">Reason for sharing: </label>${data.result[i].comments}
                                </div>`+htmlString;
        } else {
            htmlString = `<div class = "box suggestion-box" data-id= ${data.result[i].id}>
                                    <label class="label">User: </label>${data.result[i].username}<br><br>
                                    <label class="label">Song: </label><i>${data.result[i].name}</i>
                                    <br> by ${data.result[i].artist}<br><br>
                                    <label class="label">Reason for sharing: </label>${data.result[i].comments}
                                    <br><br>
                                    <button class="button is-large is-info edit">Edit Reason</button>
                                    <button class="button is-large is-info delete-btn">Delete Suggestion</button>
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


async function updateSuggestion(id) {
    data = await getFavoritesAtID(id);
    
    //same as the old
    let token = window.localStorage.getItem('jwt');
    let userData = await callAccountInfo(token);
    let username = userData.user.name;
    let htmlString = ``;   

    if(username != data.result.username) {
            htmlString = `<div class = "box suggestion-box" data-id= ${data.result.id}>
                                <label class="label">User: </label>${data.result.username}
                                <label class="label">Name: </label>${data.result.name} 
                                <label class="label">Artist: </label>${data.result.artist}
                                <label class="label">Reason for sharing: </label>${data.result.comments}
                            </div>`+htmlString;
    } else {
        htmlString = `<div class = "box suggestion-box" data-id= ${data.result.id}>
                            <label class="label">User: </label>${data.result.username}<br><br>
                            <label class="label">Song: </label><i>${data.result.name}</i>
                            <br> by ${data.result.artist}<br><br>
                            <label class="label">Reason for sharing: </label>${data.result.comments}
                            <br><br>
                            <button class="button is-large is-info edit">Edit Reason</button>
                            <button class="button is-large is-info delete-btn">Delete Suggestion</button>
                        </div>`+htmlString;
    }
    return htmlString;
}

$(function(){
    renderFavorites();
    $('#main').on('click', '.submit', onSubmit);
    $('#main').on('click', '.delete-btn', onDelete);
    $('#main').on('click', '.edit', onEdit);
    $('#main').on('click', '.submit-edit', onEditSubmit);
});

