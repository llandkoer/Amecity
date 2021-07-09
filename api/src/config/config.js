require("dotenv").config();

const config = {
  jwt : {
    secretKey : "process.env.JWT_KEY",
    player : {
      admin : false,
      label : "player",
    },
    admin : {
      admin : true,
      label : "admin",
    },
  },
};

module.exports = {config};
