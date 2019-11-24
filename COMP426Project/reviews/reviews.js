//this will allow anyone to post a review, stored in public data store, 
//and render results from public datastore with get call
//NOT WORKING YET

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
    const result = await axios({
        method: "post",
        url: "http://localhost:3000/public/reviews",
        data: {
            "comment": text
        }
    });
    alert(result.code);
};

async function getReviews(){
    const result = await axios({
        method: "get",
        url: "http://localhost:3000/public/reviews"
    });
    return result.data;
};

async function renderReviews(){
    let data = await getReviews()
    let i;
    let htmlString = ``;
    for (i=0; i<data.length; i++){
        htmlString += `<p> ${data[i]} </p>`
    }
    $('#reviews').append(htmlString);
};