const knex = require("knex");
const app = require("./app");
const { PORT, DB_URL } = require("../config");

const db = knex({
  client: "pg",
  connection: DB_URL
});

// allows the app to access the knex instance defined here in the server.js, named db
app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});