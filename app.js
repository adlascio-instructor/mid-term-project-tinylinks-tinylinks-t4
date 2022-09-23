const express = require("express");
var fs = require("fs");
const app = express ();
app.use(express.urlencoded());
app.use(express.json());


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
    var data = fs.readFileSync("./models/urls.json")
    var newData = JSON.parse(data)
    newData = Object.values(newData)
    console.log(newData)
    res.render("urls", {
        newData
    });
});

app.post("/urls", (req, res) => {
    console.log("url is created");
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    var shortUrl = makeid(6)
    var longUrl = req.body.url
    var data = fs.readFileSync("./models/urls.json")
    var newData = JSON.parse(data)
    newData[shortUrl] = {
        shortUrl, longUrl
    }
    fs.writeFileSync("./models/urls.json", JSON.stringify(newData))

    res.redirect("/urls")
    
});

app.listen(8001, () => console.log("server running 8001"));