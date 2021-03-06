$(function () { 
    $('#root').on('click', '#search-button', onSearchClick);
});

export const addToLiked = async function(artist, text){
    if (window.localStorage.getItem('jwt') != null) {
        let token = window.localStorage.getItem('jwt');
        const result = await axios({
            method: "post",
            url: "http://localhost:3000/user/artists/" + artist + "/results",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { 
                "data": [text],
                "type": "merge"
            }
        });
    } else {
        return;
    }
};

export const onSearchClick = async function (event){
    event.preventDefault();
    let searchText = $('.input').val();
    let searchButton = $(event.target).closest(".search");
    let searchDiv = $(event.target).closest(".search-div");
    searchButton.replaceWith(`<button id="search-button" class="button is-loading is-primary is-large search">Loading</button>`); 
    let songData = await searchRequest(searchText);
    let htmlString = ``;
    if (songData.Similar.Results.length == 0){
        htmlString += `<div id = "results"> <h1 class = "title is-4"> No results </h1> </div>`;
    } else {
        let i;
        htmlString += `<div id = "results"> <h1 class = "title is-4"> Recommended based on your search: </h1>`
        for (i=0; i < songData.Similar.Results.length; i++){
        addToLiked (searchText, songData.Similar.Results[i].Name);
        htmlString += `<div class = "box"> <p> ${songData.Similar.Results[i].Name} </p> 
            <a href = ${songData.Similar.Results[i].wUrl}> Wikipedia </a> </div>`;
        };
    };
    $('#results').replaceWith(htmlString);
    searchDiv.replaceWith(`<div class="columns search-div">
        <input id = "search-box" type="text" class="input is-large" placeholder="Search specific artists" required>
        <button id = "search-button" class="button is-primary is-focused is-large search">Search</button> </div>`);
    let $artistsList = $("#artists");
    $artistsList.replaceWith(`<div id="artists" class="artists"></div>`);
};

export const searchRequest = async function(searchText){
    const result = await axios({
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar',
        params: {
            q: searchText,
            k: '348775-GroupPro-QFR7GQLZ',
            type: 'music',
            info: 1
        }
    });
    return result.data;
};
