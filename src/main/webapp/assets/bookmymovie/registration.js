if(sessionStorage.getItem("session_user_id")==undefined){
  document.getElementById("logged-in").style.visibility="hidden";
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

  const sendData = () => {
    var genderRadios=document.getElementsByName("Gender");
        var genderVal=null;
        for(gr of genderRadios){
            if(gr.checked){
                genderVal=gr.value;
            }
        }
    data={
    sName: document.getElementById("name").value,
    sGender: genderVal,
    sEmail: document.getElementById("email").value,
    sPhone: document.getElementById("phone").value,
    jUserType:0
    };
    sendHttpRequest('POST', 'http://localhost:8080/register', data)
      .then(responseData => {
        alert("Registration successfully completed.\nPlease proceed to set login id and password.");
        sessionStorage.setItem("registered_user_id",responseData.id);
        window.location="credentials.html";
      })
      .catch(err => {
        console.log(err);
      });
  };
document.getElementById("submit").addEventListener("click",function(){sendData()});
