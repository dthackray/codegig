const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")

const Sequelize = require("sequelize")
const db = new Sequelize ("codegig", "postgres", "password", {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// Test DB
db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(error => console.log(error))

const app = express()

app.get("/", (req, res) => res.send("INDEX"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))