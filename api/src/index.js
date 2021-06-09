const app = require("./app");

const {createConnection} = require("./database");

const PORT = 3000;

createConnection();

async function init() {
  await app.listen(PORT);
  console.log(`Server on port ${PORT}`);
}

init();
