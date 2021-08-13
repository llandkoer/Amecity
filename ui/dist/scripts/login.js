const urlLogin = "http://localhost:3000/api/auth/login";

async function LoginPost() {
  const pwd = document.getElementById("pwd");
  const user = document.getElementById("user");
  console.log(pwd.value);
  await fetch(urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    },
    body: JSON.stringify({
      username: user.value,
      password: pwd.value,
    }),
  })
    .then((response) => response.json())
    .then((token) => {
      if (token.token) {
        localStorage.setItem("token", token.token);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
