const express = require("express")
const router = express.Router()
const db = require("../config/database")
const Gig = require("../models/Gig")

// Get all Gigs
router.get("/", (req, res) => 
    Gig.findAll()
        .then(gigs => { 
            res.render("gigs", {
                gigs
            })
        })
        .catch(error => console.log(error))
        )

// Display add new gig form
router.get("/add", (req, res) => res.render("add"))

// Add new Gig
router.post("/add", (req, res) => {
    const data = {
        title: "Simple Wordpress website",
        technologies: "wordpress, php, html, css",
        budget: "$1,000",
        description: "lorem",
        contact_email: "user2@gmail.com"
    }

    let { title, technologies, budget, description, contact_email } = data

    // Insert into table
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
    })
    .then(gig => res.redirect('/gigs'))
    .catch(error => console.log(error))
})

module.exports = router