if(sessionStorage.getItem("session_user_id")==undefined){
    document.getElementById("logged-in").style.visibility="hidden";
}
else{
   document.getElementById("login").style.visibility="hidden";
   document.getElementById("page-content").style.visibility="hidden";
   document.getElementById("alt").innerHTML="Please logout to login as another account."
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
    var data={
      sUsername: document.getElementById("username").value,
      sPassword: document.getElementById("password").value
    }
    sendHttpRequest('POST', 'http://localhost:8080/login', data)
      .then(user => {
      if(user==null){
          alert("Username or password is incorrect.");
        }else{
          sessionStorage.setItem("session_user_id",user.id);
          if(user.jUserType==1){
            alert("Welcome Admin");
            //window.location="movies.html";
          }
          else { alert("welcome "+user.sName);
          }
          window.history.back();
    } 
      })
      .catch(err => {
        if(err==-1)
        alert("Incorrect username or password");
      });
  };
document.getElementById("submit").addEventListener("click",sendData);
$("#logout").on("click",function(){
  sessionStorage.removeItem("session_user_id");
  location.reload();
});
