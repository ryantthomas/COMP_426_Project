
$(function () { 
    $('#root').on('click', '#search-button', onSearchClick);
});


export const onSearchClick = async function (event){
    let searchText = $('.input').val();

    let searchButton = $(event.target).closest(".search");
    let searchDiv = $(event.target).closest(".search-div");
    searchButton.replaceWith(`<button id="search-button" class="button is-loading is-primary search">Loading</button>`); 
    let songData = await searchRequest(searchText);
    //For loop adding boxes of songs
    let i;
    let htmlString = `<div id = "results"> <h1 class = "title is-4"> Recommended based on your search: </h1>`
    for (i=0; i < songData.Similar.Results.length; i++){
        htmlString += `<div class = "column">  <div class = "box"> <p> ${songData.Similar.Results[i].Name} </p> 
            <small> ${songData.Similar.Results[i].Type} </small> </div> </div>`;
    };
    
    $('#results').replaceWith(htmlString);
    //Returns search bar to normal
    searchDiv.replaceWith(`<div class="columns search-div">
                                <input type="text" class="input" placeholder="Search specific artists or songs" required>
                                <button id = "search-button" class="button is-primary is-focused search">Search</button>
                            </div>`);
};

export const searchRequest = async function (searchText){
    const result = await axios({
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar',
        params: {
            q: searchText,
            k: '348775-GroupPro-QFR7GQLZ',
            type: 'music'
        }
    });
    return result.data;
};



