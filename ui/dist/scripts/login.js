//let registerForm = document.getElementById("registerForm");
const validateExistingSession = () =>{
  if ((window.localStorage.getItem("tokenSession") !== undefined && window.localStorage.getItem("tokenSession") !== "" && window.localStorage.getItem("tokenSession") !== null) || (window.sessionStorage.getItem("tokenSession") !== undefined && window.sessionStorage.getItem("tokenSession") !== "" && window.sessionStorage.getItem("tokenSession") !== null)) {
    $("#loginBtn").attr("logAction", "close");
    $("#loginBtn").html("Cerrar Sesión");
    $("#becomeOrChallenges").attr("href", "#challenges")
    $("#becomeOrChallenges").html("Retos");
    getUserData();
    /* if ((window.localStorage.getItem("isAdmin") !== null && window.localStorage.getItem("isAdmin") == true ) || (window.sessionStorage.getItem("isAdmin") !== undefined && window.sessionStorage.getItem("isAdmin") == true)) {

    } */
    loadMainContent("userHome", "app");
  }
  else
  {
    $("#loginBtn").attr("logAction", "open");
  }
}

validateExistingSession();
$("#loginBtn").on("click", (e) => {
  e.preventDefault();
  let element = window.document.activeElement;
  let logAction = element.getAttribute("logAction");

  if(logAction == "open" && $("#loginModal").length == 0)
  {
    $("#modalsContainer").load("/ui/src/layout/modals.html", () => {
      $("#loginModal").modal("show")
    });
  }
  else
  {
    if (window.localStorage.getItem("tokenSession") !== undefined && window.localStorage.getItem("tokenSession") !== "" && window.localStorage.getItem("tokenSession") !== null)
      window.localStorage.removeItem("tokenSession");
    else if (window.sessionStorage.getItem("tokenSession") !== undefined && window.sessionStorage.getItem("tokenSession") !== "" && window.sessionStorage.getItem("tokenSession") !== null)
      window.sessionStorage.removeItem("tokenSession");

    window.location.href = "/ui/dist/index.html";
  }

})

//let loginForm = $(document).find;
const authBaseUrl = "http://localhost:3000/api/auth/";

//========================= =======LOGIN =======================================//

const LoginPost = async (bodyData = null) => {
  console.log(bodyData)
  if (bodyData !== null) {

    /* const pwd = document.getElementById("pwd");
    const user = document.getElementById("username"); */
  
    await fetch(authBaseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.token) {
          if(bodyData.keepSession == "on")
            window.localStorage.setItem("tokenSession", token.token);
          else
            window.sessionStorage.setItem("tokenSession", token.token);

    
          $(".modal").modal("hide");
          getUserData();
          location.reload();
          loadMainContent("userHome", "app");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

$(document).on("submit", "#loginForm", async (e) => {
  e.preventDefault();
  //console.log("entra login")
  let loginForm = $("#loginForm").get(0);
  //console.log("loginForm: "+loginForm)
  let dataForm = new FormData(loginForm);
  var dataObject = {};
  dataForm.forEach((value, key) => dataObject[key] = value);

  LoginPost(dataObject);

});

//======================================= Signup ============================//
const matchAdmin = (myString = "") => {
 
  let adminKey = "@masteradminamecity.org";
  let myPattern = new RegExp('(\\w*'+adminKey+'\\w*)','gi');

  let matches = myString.match(myPattern);

  if (matches === null)
  {
      return false;
  }
  else
  {
    return true;
  }
}

const createUser = async (bodyData = null) => {
  if (bodyData !== null) {
    bodyData["is_admin"] = matchAdmin(bodyData.email);
    console.log(bodyData);
    //return false;
    await fetch(authBaseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((message) => {
        if (message.message) {
          if(bodyData.keepSessionSignup == "on")
          {
            let loginData = {
              username : bodyData.username,
              password : bodyData.password,
              keepSession : bodyData.keepSessionSignup
            };

            LoginPost(loginData);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

$(document).on("submit", "#signupForm", async (e) => {
  e.preventDefault();
  let signupData = $("#signupForm").get(0);
  let dataForm = new FormData(signupData);
  let signupObject = {};
  dataForm.forEach((value, key) => signupObject[key] = value);

  createUser(signupObject);
});

$(document).on("click", "#signUpBtn", (e) => {
  e.preventDefault();
  console.log("entra signup")
  if($("#signupModal").length == 0)
  {
    $("#modalsContainer").load("/ui/src/layout/modals.html", () => { 
      $("#signupModal").modal("show");
    });
  }
  else
  {
    $("#signupModal").modal("show");
  }
})


/* matchAdmin("jeison.jfmt@gmail.com");
matchAdmin("fernando@masteradminamecity.org"); */
