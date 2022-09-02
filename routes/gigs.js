const { application } = require("express")
const express = require("express")
const router = express.Router()
const db = require("../config/database")
const Gig = require("../models/Gig")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

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
    let { title, technologies, budget, description, contact_email } = req.body
    let errors = []

    // Validation
    if (!title) {
        errors.push({ text: "Please add a title" })
    }
    if (!technologies) {
        errors.push({ text: "Please add some technologies" })
    }
    if (!description) {
        errors.push({ text: "Please add a description" })
    }
    if (!contact_email) {
        errors.push({ text: "Please add a contact email" })
    }

    // Check for errors
    if (errors.length > 0) {
        res.render("add", {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    } else {
        if (!budget) {
            budget = "Unknown"
        } else {
            budget = `$${budget}`
        }

        // Make lower case and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ",")

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
    }
})

// Search for gigs
router.get("/search", (req, res) => {
    let { term } = req.query
    term = term.toLowerCase()

    Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(error => console.log(error))
})

module.exports = router