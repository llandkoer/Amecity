const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
  jwt: {
    secretKey: process.env.JWT_KEY,
    player: {
      admin: false,
      label: "player",
    },
    admin: {
      admin: true,
      label: "admin",
    },
  },
};

module.exports = { config };
