const express = require("express")
const Handlebars = require("handlebars")
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require("body-parser")
const path = require("path")
const db = require("./config/database")

// Test DB
db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(error => console.log(error))

const app = express()

// Handlebars
app.engine("handlebars", exphbs.engine({ 
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
 }))
app.set("view engine", "handlebars")

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }))

// Gig routes
app.use("/gigs", require("./routes/gigs"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))