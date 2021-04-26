var selected_movie_id=sessionStorage.getItem("selected_movie_id");
if(sessionStorage.getItem("session_user_id")==undefined){
  document.getElementById("logged-in").style.visibility="hidden";
}
else {
  document.getElementById("login").style.visibility="hidden";
}
if(selected_movie_id == undefined)
{
  document.getElementById("alt").innerHTML="something went wrong";
}
else ajaxCall();

function ajaxCall() {
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

  const getData = () => {
    url='http://localhost:8080/movie/'+selected_movie_id;
    sendHttpRequest('GET', url).then(movie => {
      createMovieDetail(movie)
    });
  };
getData();
}

function createMovieDetail(movie){
var moviecardContainer=document.getElementById("movie-Poster");

          var card=document.createElement("div");
          card.classList.add("movie-card");
          moviecardContainer.appendChild(card);
          
          var poster=document.createElement("div");
          poster.classList.add("movie-poster");
          card.appendChild(poster);

          var poster_img=document.createElement("img");
          poster_img.classList.add("img-fluid");
          poster_img.src="assets/img/posters/"+movie.sMovieName+".jpg";
          poster.appendChild(poster_img); 
          
          var title=document.createElement("h3");
          title.innerHTML=movie.sMovieName;
          card.appendChild(title);
          var release=document.createElement("div");
          release.innerHTML=movie.dReleaseDate;
          card.appendChild(release);


          document.getElementById("title").innerHTML='<strong>'+movie.sMovieName+'</strong>';
          document.getElementById("duration").innerHTML='<strong>Duration: </strong>'+movie.sDuration;
          document.getElementById("genre").innerHTML='<strong>Genre:</strong>'+' '+ movie.sGenre;
          document.getElementById("language").innerHTML='<strong>Languages:</strong>'+' '+movie.sLanguages;
          document.getElementById("format").innerHTML='<strong>Formats:</strong>'+' '+movie.sScreenType;
          document.getElementById("trailer").href=movie.sTrailer;
          document.getElementById("trailer").target='_blank';
          document.getElementById("trailer").innerHTML='<b>See Trailer</b>';
          document.getElementById("description").innerHTML='<strong>About the movie</strong><br/>'+' '+movie.sDescription;
          document.getElementById("cast").innerHTML='<b>Cast<br/></b>'+movie.sCast;

          var review=document.createElement("button");
          review.classList.add("btn","btn-secondary");
          review.innerText="See Reviews"
          document.getElementById("actions").appendChild(review);

          var booking=document.createElement("button");
          booking.classList.add("btn","btn-primary");
          booking.innerText="Book Tickets"
          document.getElementById("actions").appendChild(booking);

          $(".btn-primary").on("click",function(){
            sessionStorage.setItem("selected_movie_id", selected_movie_id);
            window.location="shows.html";
          });

          $(".btn-secondary").on("click",function(){
            sessionStorage.setItem("selected_movie_id", selected_movie_id);
            window.location="Reviews.html";
          });
          
    }
    $("#logout").on("click",function(){
      sessionStorage.removeItem("session_user_id");
      location.reload();
    });