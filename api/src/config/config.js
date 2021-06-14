require("dotenv").config();

const config = {
  jwt : {
    secretKey : process.env.JWT_KEY,
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
console.log(config.jwt)

module.exports = {config};
