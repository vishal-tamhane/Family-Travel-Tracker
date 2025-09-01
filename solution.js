import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

// Direct database configuration to avoid .env issues
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world", 
  password: "vishalt@9699#", // Updated to match .env file
  port: 5432,
});

// Add error handling for database connection
db.connect()
  .then(() => {
    console.log("Successfully connected to PostgreSQL database");
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1;",
    [currentUserId]
  );
  return result.rows.map(row => row.country_code);
}


async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  try {
    const countries = await checkVisisted();
    const currentUser = await getCurrentUser();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
    });
  } catch (err) {
    console.log(err);
    res.send("Error loading the page.");
  }
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
      [name, color]
    );
    const newUser = result.rows[0];
    currentUserId = newUser.id;
    users.push(newUser); // Update the users array with the new user
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error adding new user.");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
