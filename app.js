const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const db = require("./config/database")

// Test DB
db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(error => console.log(error))

const app = express()

app.get("/", (req, res) => res.send("INDEX"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))