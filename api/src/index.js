const express = require("express");
const { nanoid } = require("nanoid");

const app = express();


app.set("PORT", 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  const users = [
    {
      name: "Luis",
      lastname: "Landkoer",
      username: "llandkoer",
      email: "llandkoer@hotmail.com",
      category: "admin",
      facebook: "@luis",
    },
    {
      name: "Angel",
      lastname: "Landkoer",
      username: "angelluis",
      email: "angel@hotmail.com",
      category: "player",
      facebook: "@angel",
    },
    {
      name: "Maria",
      lastname: "Perez",
      username: "mperez",
      email: "mperez@hotmail.com",
      category: "partner",
      facebook: "@maria",
    },
  ];

  res.status(200).json({ success: true, data: users });
});

app.post("/api/users", (req, res) => {
  // console.log(req.body);
  const { name, lastname, username, email, category, ...optional } = req.body;
  // Validations
  const user = {
    id: nanoid(),
    name,
    lastname,
    username,
    email,
    category,
    optional,
  };
  // Data storage
  res.status(201).json({
    success: true,
    message: "User has been created",
    data: user,
  });
});

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
