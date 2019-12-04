//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call


//tokenStr = window.localStorage.getItem('jwt')
//headers: { Authorization: `Bearer ${tokenStr}` }
$(function(){
    renderReviews();
    //$('#root').on('click', '.button', onReview);
});

const onReview = async function(event) {
    event.preventDefault();
    let review = $('.textarea').val();
    await postReview(review);
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

async function renderReviews(){
    let data = await getFavorites();
    alert("hi");
    let htmlString = ``;
    for (let i=data.result.comments.length -1; i> -1; i--) {
        alert("in it");
        htmlString += `<p class = "box"> ${data.result.comments[i]} </p>`
    }
    $('#reviews').append(htmlString);
};