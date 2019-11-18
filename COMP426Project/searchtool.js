
$(function () { 
    $('#root').on('click', '#search-button', onSearchClick);
});


export const onSearchClick = async function (event){
    let searchText = $('.input').val();
    let songData = await searchRequest(searchText);
    let i;
    let htmlString = `<div id = "results"> <h1 class = "title is-4"> Recommended based on your search: </h1>`
    for (i=0; i < songData.Similar.Results.length; i++){
        htmlString += `<div class = "column">  <div class = "box"> <p> ${songData.Similar.Results[i].Name} </p> 
            <small> ${songData.Similar.Results[i].Type} </small> </div> </div>`;
    };
    //htmlString += `</div>`;
    $('#results').replaceWith(htmlString);
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



