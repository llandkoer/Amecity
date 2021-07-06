const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

const { getConnection } = require("../database");

const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id, title, photo_url, information } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    const newPost = {
      post_id: nanoid(),
      author: user.name,
      title,
      creation_date: Date.now(),
      photo_url,
      information,
    };

    getConnection().get("posts").push(newPost).write();

    res.status(201).json({ message: "Post has been successfully created" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = getConnection().get("posts").value();

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "There was a server error" });
  }
};

exports.createPost = createPost;
exports.getAll = getAll;
