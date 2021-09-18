var selected_movie_id=sessionStorage.getItem("selected_movie_id");

if(sessionStorage.getItem("session_user_id")==undefined){
  document.getElementById("logged-in").style.visibility="hidden";
}
else {
  document.getElementById("login").style.visibility="hidden";
}


const parseDay=(day)=>{
  switch (day){
    case 0: return "Sun"; break;
    case 1: return "Mon"; break;
    case 2: return "Tue"; break;
    case 3: return "Wed"; break;
    case 4: return "Thu"; break;
    case 5: return "Fri"; break;
    case 6: return "Sat"; break;

  }
}

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
  document.getElementById("show-page-container").style.visibility="hidden";
}
else ajaxCall();

function ajaxCall() {    
      const getData = () => {
        url='http://localhost:8080/movie/'+selected_movie_id;
        sendHttpRequest('GET', url).then(movie => {
        buildMovieFilters(movie);        
        var language=document.getElementById("language").value;
        var format=document.getElementById("format").value;
        url='http://localhost:8080/shows/'+movie.id+'/20210910/'+language+'/'+format;
        sendHttpRequest('GET', url).then(showsList => {
            buildPage(showsList);
            });
       });
 };
      getData();
    }

    buildMovieFilters=(movie)=>{
      var languages=movie.sLanguages.split(", ");
      var formats=movie.sScreenType.split(", ");
      var languageOPtions="";
      
      for(var i=0;i<languages.length;i++){
        languageOPtions+="<option value=" + languages[i] + ">"+languages[i]+"</option>";
      }
      document.getElementById("language").innerHTML=languageOPtions;
      
      var FormatOPtions="";
      for(var i=0;i<formats.length;i++){
        FormatOPtions+="<option value=" + formats[i] + ">"+formats[i]+"</option>";
      }
      document.getElementById("format").innerHTML=FormatOPtions;

      document.getElementById("movie-title").innerHTML=movie.sMovieName;

   var dateOptions="";      
   var showDate=new Date(2021, 10, 09);
	 var optvalue;
     while(showDate.getDay()<6)
     {
		  if(showDate.getDate()<10){
			optvalue=showDate.getFullYear()+"0"+showDate.getDate();
		  }else{
			optvalue=showDate.getFullYear()+""+showDate.getDate();
		  }
		  if(showDate.getMonth() < 10){
		  optvalue+="0"+(showDate.getMonth()+1);
		  }else {
		  optvalue+=(showDate.getMonth()+1);
		  }
        dateOptions+="<option value="+optvalue+">"+parseDay(showDate.getDay())+"-"+showDate.getDate()+"</option>";
        showDate.setDate(showDate.getDate()+1);
    }
      document.getElementById("show_date").innerHTML=dateOptions; 

      $(".show-filter").on("change",function(){

        var reviewContainer=document.getElementById("review");
        reviewContainer.innerHTML='';  

        var language=document.getElementById("language").value;
        var format=document.getElementById("format").value;
        var showdate=document.getElementById("show_date").value;
        url='http://localhost:8080/shows/'+movie.id+'/'+showdate+'/'+language+'/'+format;
        sendHttpRequest('GET', url).then(showsList => {
            buildPage(showsList);
            });
       });
    }

    buildPage=(shows)=>
    {
        for(var i=0;i<shows.length;i++){
            var card=document.createElement("div");
            card.classList.add("card","review-card");
            document.getElementById("review").appendChild(card);

            var header=document.createElement("div");
            header.classList.add("card-header");
            card.appendChild(header);

            var theater=document.createElement("div");
            theater.classList.add("review-user");
            theater.innerHTML=shows[i][0].screen.theater.sName;
            header.appendChild(theater);

            var gps=document.createElement("div");
            gps.classList.add("review-rating");
            header.appendChild(gps);

            var pin=document.createElement("a");
            pin.innerHTML = '<i class="bx bx-map"></i>GPS location';
            pin.target='_blank';
            var gpsUrl=shows[i][0].screen.theater.sGpsLocation;
            pin.href=gpsUrl;
            gps.appendChild(pin);

            var cardBody=document.createElement("div");
            cardBody.classList.add("card-body");
            card.appendChild(cardBody);

            var row=document.createElement("div");
            row.classList.add("row");
            cardBody.appendChild(row);

            for(var j=0;j<shows[i].length;j++){
            var showDiv=document.createElement("div");
            showDiv.classList.add("col-md-2");
            row.appendChild(showDiv);

            var showButton=document.createElement("button");
            showButton.classList.add("btn","btn-outline-info");
            showDiv.appendChild(showButton);
            showButton.show_id=shows[i][j].id;
            var showDate=new Date(shows[i][j].dStartTiming);
            if(showDate.getHours()>12){
              showButton.innerText=showDate.getHours()-12+":"+showDate.getMinutes()+" pm";
            }else{
              showButton.innerText=showDate.getHours()+":"+showDate.getMinutes()+" am";
              }
        }
      }

      $(".btn-outline-info").on("click",function(){
        sessionStorage.setItem("selected_show_id", this.show_id);
        if(sessionStorage.getItem("session_user_id")==undefined){
          window.location="login.html";
        }
        else {
          window.location="seat-Booking.html";
        } 
     });

    }
    $("#logout").on("click",function(){
      sessionStorage.removeItem("session_user_id");
      location.reload();
    });
  