const express = require("express");

const app = express();

app.set("PORT", 3000);

app.get("/api/users", (req, res) => {
  const users = [
    {
      name: "Luis",
      lastname: "Landkoer",
      username: "llandkoer",
      email: "llandkoer@hotmail.com",
    },
    {
      name: "Angel",
      lastname: "Landkoer",
      username: "angelluis",
      email: "angel@hotmail.com",
    },
    {
      name: "Maria",
      lastname: "Perez",
      username: "mperez",
      email: "mperez@hotmail.com",
    }
  ];

  res.status(200).json({ success: true, data: users  });
})

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
})