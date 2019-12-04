//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call


//tokenStr = window.localStorage.getItem('jwt')
//headers: { Authorization: `Bearer ${tokenStr}` }
$(function(){
    renderFavorites();
    $('#main').on('click', '.submit', onSubmit);
});

const onSubmit = async function(event) {
    event.preventDefault();
    let name = $('.song-name').val();
    let artist = $('.artist').val();
    let comment = $('.comments').val();
    let object = {
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

async function renderFavorites(){
    let data = await getFavorites();
    let htmlString = ``;
    for (let i=data.result.length -1; i> -1; i--) {
        htmlString += `<div class = "box"> 
                            <label class="label">Name: </label>${data.result[i].name} 
                            <label class="label">Artist: </label>${data.result[i].artist}
                            <label class="label">Comment: </label>${data.result[i].comments}
                        </div>`;
    }
    $('#root').append(htmlString);
};