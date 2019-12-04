//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call

$(function(){
    renderReviews();
    $('#root').on('click', '.button', onReview);
});

export const onReview = async function(event) {
    event.preventDefault();
    let review = $('.textarea').val();
    await postReview(review);
};

async function postReview(text){
    const result = await axios({
        method: "post",
        url: "http://localhost:3000/public/reviews/comments",
        data: { 
            "data": [text],
            "type": "merge"
        }
    });
};

async function getReviews(){
    const result = await axios({
        method: "get",
        url: "http://localhost:3000/public/reviews"
    });
    return result.data;
};

async function renderReviews(){
    let data = await getReviews();
    let i;
    let htmlString = ``;
    for (i=data.result.comments.length -1; i> -1; i--){
        htmlString += `<p class = "box"> ${data.result.comments[i]} </p>`
    }
    $('#reviews').append(htmlString);
};