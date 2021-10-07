var registered_user_id;
if(localStorage.getItem("session_user_id")==undefined){
    document.getElementById("logged-in").style.visibility="hidden";
    if(localStorage.getItem("registered_user_id")!=undefined){
         registered_user_id=localStorage.getItem("registered_user_id");
    }
  }
  else {
      document.getElementById("login").style.visibility="hidden";
      document.getElementById("registration-form").style.visibility="hidden";
      document.getElementById("alt").innerHTML="Logout to login as different user.";
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

    const sendData = () => {
      data={
      user: userdata,
      sUsername: document.getElementById("username").value,
      sPassword: document.getElementById("password").value
      };
      sendHttpRequest('POST', 'https://localhost:8443/credentials', data)
        .then(resp => {
            if(resp.message=="OK"){
                alert("Login created successfully.");
                localStorage.removeItem("registered_user_id");
                window.location="login.html";
            }else if(resp.message=="CONFLICT"){
                alert("Username is not available");
            }        
        })
        .catch(err => {
          console.log(err);
        });
    };

    var userdata;

    const getData = () => {
        sendHttpRequest('GET', 'https://localhost:8443/user/'+registered_user_id).then(registered_user => {
            userdata=registered_user;
        });
      };
  getData(); 
  document.getElementById("submit").addEventListener("click",function(){sendData()});
