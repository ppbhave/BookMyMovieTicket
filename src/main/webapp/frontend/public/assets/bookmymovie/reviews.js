var selected_movie_id=localStorage.getItem("selected_movie_id");
if(localStorage.getItem("session_user_id")==undefined)
  document.getElementById("logged-in").style.visibility="hidden";
else document.getElementById("login").style.visibility="hidden";
var selected_movie_id=localStorage.getItem("selected_movie_id");

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

if(selected_movie_id == undefined)
{
  document.getElementById("alt").innerHTML="something went wrong";
  document.getElementById("write-review").style.visibility="hidden";
}
else ajaxCall();

function ajaxCall(){   
      const getData = (callPath,callfreq) => {
        url=callPath;
        sendHttpRequest('GET', url).then(resp => {
            if(callfreq==1)
          reviewBuilder(resp)
          else if (callfreq==2)
          movieBuilder(resp)
        });
      };
    getData('https://localhost:8443//Reviews/'+selected_movie_id,1);
    getData('https://localhost:8443/movie/'+selected_movie_id,2);
};

function reviewBuilder(reviewList){
    var reviewContainer=document.getElementById("review-container");
    if(reviewList.length==0){
      var note=document.createElement("p");
      note.innerHTML="Be the first one to provide Review.";
      reviewContainer.appendChild(note);
    }
    for(var i=0;i<reviewList.length;i++)
    {
        var reviewCard=document.createElement("div");
        reviewCard.classList.add("card","review-card");
        reviewContainer.appendChild(reviewCard);

        var cardHeader=document.createElement("div");
        cardHeader.classList.add("card-header");
        reviewCard.appendChild(cardHeader);

        var user=document.createElement("div");
        user.classList.add("review-user");
        user.innerHTML=reviewList[i].user.sName;
        cardHeader.appendChild(user);

        var rating=document.createElement("div");
        rating.classList.add("review-rating");
        rating.innerHTML=reviewList[i].jRating+"/5";
        cardHeader.appendChild(rating);

        var cardbody=document.createElement("div");
        cardbody.classList.add("card-body");
        reviewCard.appendChild(cardbody);

        var reviewText=document.createElement("p");
        reviewText.classList.add("card-text");
        reviewText.innerHTML='<b>'+reviewList[i].sReviewSummery+'</b><br/>'+
        reviewList[i].sReview;
        cardbody.appendChild(reviewText);
    }

}

const sendData = (review) => {
  sendHttpRequest('POST', 'https://localhost:8443/newReview', review)
    .then(responseData => {
      alert(responseData.message);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

function movieBuilder(movie){
    document.getElementById("page-title").innerHTML="Top Reviews";
    document.getElementById("movie").innerHTML=movie.sMovieName;
}

$("#submit").on("click",function(){
  if(!localStorage.getItem("session_user_id")){
    window.location="login.html";
  }
  var rating=document.getElementById("Rating").value;
  var review=document.getElementById("Review-content").value;
  var summery=document.getElementById("summery").value;
  sendData({
    movie: {
        id: selected_movie_id
    },
    user: {
        id: localStorage.getItem("session_user_id"),
        jUserType: 0
    },
    sReview: review,
    sReviewSummery: summery,
    jRating: rating
  });
}); 
$("#logout").on("click",function(){
  localStorage.removeItem("session_user_id");
  location.reload();
});
