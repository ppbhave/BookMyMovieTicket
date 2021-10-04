if(sessionStorage.getItem("session_user_id")==undefined){
    document.getElementById("logged-in").style.visibility="hidden";
    document.getElementById("alt").innerHTML="Invalid page";
    document.getElementById("registration-form").style.visibility="hidden";
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

    getData('https://localhost:8443/user/'+sessionStorage.getItem("session_user_id"));

    const sendData = () => {
        var genderRadios=document.getElementsByName("Gender");
        var genderVal=null;
        for(gr of genderRadios){
            if(gr.checked){
                genderVal=gr.value;
            }
        }

      data={
      id:sessionStorage.getItem("session_user_id"),
      sName: document.getElementById("name").value,
      sGender: genderVal,
      sEmail: document.getElementById("email").value,
      sPhone: document.getElementById("phone").value,
      jUserType:0
      };
      sendHttpRequest('PUT', 'https://localhost:8443/Profile/changes', data)
        .then(responseData => {
          alert("Information successfully edited.");
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    };
  document.getElementById("submit").addEventListener("click",function(){sendData()});

  const formBuilder=(user)=>{
    document.getElementById("name").value=user.sName;
    document.getElementById("phone").value=user.sPhone;
    document.getElementById("email").value=user.sEmail;
    var GenderRadio=document.getElementsByName("Gender");
    for(radio of GenderRadio){
        if(user.sGender==radio.value){
            radio.checked=true;
        }
    }
  }

  $("#logout").on("click",function(){
    sessionStorage.removeItem("session_user_id");
    location.reload();
  });
  