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
    $('.form').replaceWith(`<form class = "form"> <label class = "label is-large"> Leave your comments here </label>
     <textarea class = "textarea is-family-monospace is-large">Share your thoughts!</textarea> 
     <br> <button class = "button is-dark is-family-monospace is-large"> Submit </button> 
    </form>`);
    $('#reviews').replaceWith(`<div id = "reviews" class = "section has-background-light">
    <label class = "label subtitle is-2"> Read what others think </label> <br> <div>`);
    await renderReviews();
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
        htmlString += `<p class = "box comment">${data.result.comments[i]} </p>`
    }
    $('#reviews').append(htmlString);
};