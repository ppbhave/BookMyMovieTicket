sessionStorage.removeItem("selected_movie_id");
if(sessionStorage.getItem("session_user_id")==undefined)
  document.getElementById("logged-in").style.visibility="hidden";
else document.getElementById("login").style.visibility="hidden";


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

  const getData = (language,format,genre) => {
    var url="https://localhost:8443?language="+language+"&format="+format+"&genre="+genre;
    sendHttpRequest('GET', url).then(responseData => {
      createMovieCards(responseData)
    });
  };
  
  function createMovieCards(movies){
      var moviecardContainer=document.getElementById("movie-cards");
      n=movies.length;
      for(i=0;i<n;i++)
      {
          var card_col=document.createElement("div");
          card_col.classList.add("col-lg-3","col-md-6","d-flex","align-items-stretch","movie-card-col");
          card_col.movie=movies[i];
          moviecardContainer.appendChild(card_col);

          var card=document.createElement("div");
          card.classList.add("movie-card");
          card_col.appendChild(card);
          
          var poster=document.createElement("div");
          poster.classList.add("movie-poster");
          card.appendChild(poster);

          var poster_img=document.createElement("img");
          poster_img.classList.add("img-fluid");
          poster_img.src="../assets/img/posters/"+movies[i].sMovieName+".jpg";
          poster.appendChild(poster_img); 
          
          var movie_info=document.createElement("div");
          movie_info.classList.add("movie-info");
          card.appendChild(movie_info);
          
          var title=document.createElement("h4");
          title.innerHTML=movies[i].sMovieName;
          movie_info.appendChild(title);

          var genre=document.createElement("span");
          genre.innerHTML=movies[i].sGenre;
          movie_info.appendChild(genre);
        }

        var language="none";
        var format="none";
        var genre="none";

        $(".filter").on("change",function(e){
        
        document.getElementById("movie-cards").innerHTML=''; 
             if(e.target.id==="genre")
             genre=e.target.value;
             else  if(e.target.id==="language")
             language=e.target.value;
             else  if(e.target.id==="format")
             format=e.target.value;
             getData(language,format,genre);
         });
         
        $(".movie-card-col").on("click",function(){
          sessionStorage.setItem("selected_movie_id", this.movie.id);
          window.location="moviesDetails.html";
        }); 
    }

    $("#logout").on("click",function(){
      sessionStorage.removeItem("session_user_id");
      location.reload();
    });

  getData("none","none","none");
