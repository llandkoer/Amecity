let challengeBaseUrl = "http://localhost:3000/api/challenges/";

if (window.localStorage.getItem("tokenSession") !== undefined && window.localStorage.getItem("tokenSession") !== "" && window.localStorage.getItem("tokenSession") !== null)
    userToken = window.localStorage.getItem("tokenSession");
else if (window.sessionStorage.getItem("tokenSession") !== undefined && window.sessionStorage.getItem("tokenSession") !== "" && window.sessionStorage.getItem("tokenSession") !== null)
    userToken =window.sessionStorage.getItem("tokenSession");

const getAllChallenges = async() => {
    let route = "getAll ";

    await fetch(challengeBaseUrl+route, {
        method : "GET",
        headers: {
            "x-access-token": userToken,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((res) => {
        //console.log("res: "+res) 
        if (res.challenges) {

            let challengesList = "";
            res.challenges.forEach(challenge => {
                challengesList += ` 
                <div class="card mb-5" style="width: 30rem;">
                    <img class="card-img-top" src="${challenge.photo_url}" alt="Card image cap">
                    <div class="card-body d-flex justify-content-between alert-secondary text-dark">
                        <p class="card-text" style="width: 80%;">${challenge.title}</p>
                        <i class="fas fa-plus-square takeChallenge" challengeId="${challenge.challenge_id}" style="color: #7ABF7F; font-size: 25px; cursor:pointer"></i>
                    </div>
                </div>`;
                console.log(challenge);
                
            });

            $("#generalChallengesContainer").html(challengesList);
            //console.log(res.challenges);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

/* const takeChallenge = async() => {
    let route = "/takeChallenge";
    let objectData = {

    }
    await fetch(challengeBaseUrl+route, {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },


    })
} */