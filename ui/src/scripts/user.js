const userBaseUrl = "http://localhost:3000/api/user/";
var userEmail = "";
var userToken = "";
var temporalUser = "";
if (window.localStorage.getItem("tokenSession") !== undefined && window.localStorage.getItem("tokenSession") !== "" && window.localStorage.getItem("tokenSession") !== null){
    userToken = window.localStorage.getItem("tokenSession");
    temporalUser = false;
}  
else if (window.sessionStorage.getItem("tokenSession") !== undefined && window.sessionStorage.getItem("tokenSession") !== "" && window.sessionStorage.getItem("tokenSession") !== null){
    userToken =window.sessionStorage.getItem("tokenSession");
    temporalUser = true;
}
    

const getUserData = async() => {
    let route = "getInfo";

    await fetch(userBaseUrl+route, {
        method : "GET",
        headers: {
            "x-access-token": userToken,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((res) => {
        //console.log("res: "+res) 
        if (res.info) {
            if (temporalUser == false){
                window.localStorage.setItem("userEmail", res.info.email);
                window.localStorage.setItem("isAdmin", matchAdmin(res.info.email));
            }
            else{
                window.sessionStorage.setItem("userEmail", res.info.email);
                window.sessionStorage.setItem("isAdmin", matchAdmin(res.info.email));
            }

            $("#userNameChallenges").html(res.info.name);

            console.log(res.info);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

