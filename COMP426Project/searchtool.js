
$(function () { 
    $('#root').on('click', '#search-button', onSearchClick);
});


export const onSearchClick = async function (event){
    let searchText = $('.input').val();
    let songData = await searchRequest(searchText);
    let i;
    let htmlString = `<div class = "results">`
    for (i=0; i < songData.Similar.Results.length; i++){
        htmlString += `<p> ${songData.Similar.Results[i].Name} </p>`;
    };
    htmlString += `</div>`;
    $('.results').replaceWith(htmlString);
};

export const searchRequest = async function (searchText){
    const result = await axios({
        method: 'get',
        url: 'https://tastedive.com/api/similar',
        params: {
            q: searchText,
            k: '348775-GroupPro-QFR7GQLZ'
        }
    });
    return result.data;
}


