if(localStorage.getItem("session_user_id")==undefined){
    document.getElementById("logged-in").style.visibility="hidden";
    document.getElementById("alt").innerHTML="Invalid page";
    document.getElementById("review").style.visibility="hidden";
  }
  else {
      document.getElementById("login").style.visibility="hidden";
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
        if(xhr.status== 409){
          alert("Email is already in use. Please try any other email.");
        }
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

const getData = (callPath) => {
    sendHttpRequest('GET', callPath).then(resp => {
      formBuilder(resp);
    });
  };

  getData('https://localhost:8443/MyBookings/'+localStorage.getItem("session_user_id"));

  const formBuilder=(BookingListByShow)=>{
      if(BookingListByShow==null || BookingListByShow.length==0){
          document.getElementById("panel-heading").innerHTML="Seems you have not yet experienced ease of service with Book My Movie.\nPlease get started by booking your faviourite movie.";
          document.getElementById("panel-body").style.visibility="hidden";
      }
    else{
      document.getElementById("panel-heading").innerHTML="Here comes all the easy to use experiences Book my Movie provided you";
        var tableBody=document.getElementById("tableBody");

        for(var i=0;i<BookingListByShow.length;i++){
          var dateTime=BookingListByShow[i][0].show.dStartTiming.split("T");
          var colString='<td>'+dateTime[0]+" "+dateTime[1]+'</td>'
          +'<td>'+BookingListByShow[i][0].sMovieName+'</td>'
          +'<td>'+BookingListByShow[i][0].seat.screen.theater.sName+" screen-"+BookingListByShow[i][0].seat.screen.id+'</td>';
          colString+='<td>';
          for(var j=0;j<BookingListByShow[i].length;j++){
            colString+=BookingListByShow[i][j].seat.pos+" ";
          }
          colString+='</td>';
          var tr=document.createElement("tr");
          if(i%2==0){
            tr.classList.add("even","gradeA");
          } else {
            tr.classList.add("odd","gradeA");
          }
          tableBody.appendChild(tr);
          tr.innerHTML=colString;
      }
    }
      
    
  }

  $("#logout").on("click",function(){
    localStorage.removeItem("session_user_id");
    location.reload();
  });

