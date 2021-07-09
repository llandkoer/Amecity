const url = "http://localhost:3000/api/user/"


async function getPoints(id) {
    const token = localStorage.getItem("userToken")
    fetch (url+"getPoints", {
        method: "GET",
        headers: {
            "x-access-token": token,
            "Content-Type": "application/json"
        },
        body:{
            "id":id
        }
    })
    .then((res) => res.json())
    .then(res => {res})
}

<button onclick="getPoints()"></button>