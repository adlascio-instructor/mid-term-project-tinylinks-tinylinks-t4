const express = require("express");
const app = express ();

app.set("view engine", "ejs")

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/urls/new", (req, res) => {
    res.render("newUrl");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/myurl", (req, res) => {
    res.render("singleUrl");
});

app.get("/urls", (req, res) => {
    res.render("urls");
});

app.listen(8001, () => console.log("server running 8001"));