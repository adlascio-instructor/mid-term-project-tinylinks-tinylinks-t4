// auth functions
const { response } = require("express");
const express = require ("express")
var routes = express.Router() 
const fs = require("fs")
var path = require("path")
const { v4: uuidv4 } = require('uuid');

routes.get("/login", (req, res) => {
    res.render("login", {
        message:"Log in succesful"
    });
});

routes.get("/register", (req, res) => {
    res.render("register", {
        message:"Register succesful"
    });
});

routes.post("/register", (req, res) => {
    if (req.body.email.length == 0 || req.body.password.length == 0 ) {
        return res.render("register", {
            message:"No email or password"
        });
    } 
    var data = fs.readFileSync(path.join(__dirname,"../models/users.json"))
    data = JSON.parse(data)
    var userFound = data.find((user) => {
        if (user.email == req.body.email) return true
    })
    if (userFound) {
        return res.render("register", {
            message:"Email already exists"
        });
    }
    var user = {
        id: uuidv4(),
        email: req.body.email,
        password: req.body.password
    }
    data.push(user)
    fs.writeFileSync(path.join(__dirname,"../models/users.json"), JSON.stringify(data))
    res.redirect("/urls")
})

routes.post("/login", (req, res) => {
    var data = fs.readFileSync(path.join(__dirname,"../models/users.json"))
    data = JSON.parse(data)
    var userFound = data.find((user) => {
        if (user.email == req.body.email && user.password == req.body.password) return true
    })
    if (!userFound) {
        return res.render("login", {
            message:"User not found"
        });
    }
    res.redirect("/urls")
})

module.exports = routes 