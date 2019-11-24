//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call
// NOT WORKING YET

$(function(){
    renderReviews();
    $('#root').on('#reviewSubmit', 'click', onReviewSubmit);
});


async function onReviewSubmit(event){
    event.preventDefault();
    let review = $('.textarea').val();
    await postReview(review);
};

async function postReview(text){
    const response = await axios({
        method: "post",
        url: "http://localhost:3000/public/reviews",
        data: {
            "comment": text
        }
    });
    alert(response.code);
};

async function getReviews(){

};

async function renderReviews(){

};