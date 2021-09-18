var selected_movie_id=sessionStorage.getItem("selected_movie_id");
var selected_show_id=sessionStorage.getItem("selected_show_id");
if(sessionStorage.getItem("session_user_id")==undefined){
  document.getElementById("logged-in").style.visibility="hidden";
}
else {
  document.getElementById("login").style.visibility="hidden";
}

if(selected_movie_id == undefined || selected_show_id==undefined || sessionStorage.getItem("session_user_id")==undefined)
{
  document.getElementById("alt").innerHTML="something went wrong";
  document.getElementById("show-page-container").style.visibility="hidden";
  document.getElementById("page-title").style.visibility="hidden";
}
else ajaxCall();

function sendHttpRequest (method, url, data){
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
   
  function ajaxCall() {
    const getData = () => {
      url='http://localhost:8080/movie/'+selected_movie_id;
      sendHttpRequest('GET', url).then(movie => {
      document.getElementById("movie_name").innerHTML=movie.sMovieName;  
      });  

      url='http://localhost:8080/show/seats/'+selected_show_id;
      sendHttpRequest('GET', url).then(seatsList => {
          buildPage(seatsList);
          });      
};
        getData();
  }

  const sendData = (bookings) => {
    sendHttpRequest('POST', 'http://localhost:8080/seatbooking', bookings)
    .then(responseData => {
        alert(responseData.message);
        window.location="myBookings.html";
      })
      .catch(err => {
        console.log(err);
      });
  };

  buildPage=(seatsList)=>
    {
        var seatContainer=document.getElementById("seating-arrangement");
        document.getElementById("theater_name").innerHTML=seatsList[0].screen.theater.sName;
        var seatrow='$';
        for(var i=0;i<seatsList.length;i++){

            //row creatoin
            if(seatsList[i].pos.charAt(0)!=seatrow){
            var seatingRow=document.createElement("div");
            seatingRow.classList.add("row");
            seatContainer.appendChild(seatingRow);

            seatrow=seatsList[i].pos.charAt(0);
            }
            //seat creation
            var seat=document.createElement("div");
            seat.classList.add("seat");
            seat.innerHTML=seatsList[i].pos;
            if(seatsList[i].bookedFlag){
                seat.classList.add("occupied");
            }
            seat.id=seatsList[i].id;
            seatingRow.appendChild(seat);            
        }
      }

      $(".startpayment").on("click",function(){
        var finalSeatsArr=selectedSeatId.split(",");
        if(finalSeatsArr.length==0){
          alert("Please select seats and enjoy the show!");
        }
        else{
          var seats=[];
          for(var i=0;i<finalSeatsArr.length;i++){
            seats[i]=finalSeatsArr[i];
          }
        }
            sendData({
              seats_id:seats,
              show_id:selected_show_id,
              user_id:sessionStorage.getItem("session_user_id"),
              movie:document.getElementById("movie_name").innerHTML
            });
      });


const rows = document.querySelectorAll(".seating-arrangement .row");

const seatsselected = document.querySelector("#seatsselected");
const seating = document.querySelector(".seating-arrangement");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("price");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt("150");
var selectedSeatId="";

function updateSelectedCount() {

  const selectedSeats = document.querySelectorAll(".row .selected");
  const selectedSeatsCount = selectedSeats.length-1;
  count.value="";
  count.value = selectedSeatsCount;
  price.value ="";
  price.value = "RS. "+selectedSeatsCount * ticketPrice;
}

seating.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    if(e.target.classList.contains("selected"))
    {
      if(seatsselected.value==""){
      seatsselected.value += e.target.innerHTML;
      selectedSeatId+=e.target.id;
      }
      else{
        seatsselected.value +=","+e.target.innerHTML;
        selectedSeatId+=","+e.target.id;
      }
      
    } else{
      var deselectedSeat=e.target.innerHTML;
      var seatStrings= seatsselected.value.split(",");
      var seatIdStrings=selectedSeatId.split(",");
      seatsselected.value = "";
      selectedSeatId="";
      for(var i=0;i<seatStrings.length;i++){
        if(seatStrings[i]!=deselectedSeat)
       {
        if(seatsselected.value!=""){
          seatsselected.value += ",";
          selectedSeatId+=",";
        }
        selectedSeatId+=seatIdStrings[i];
        seatsselected.value += seatStrings[i];
       } 
      }
    } 
    updateSelectedCount();
  }
});

$("#logout").on("click",function(){
  sessionStorage.removeItem("session_user_id");
  location.reload();
});

 