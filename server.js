var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3025;

var app = express();

var router = express.Router();

app.use(express.static("public"));
//app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));





app.use(router);

require("./config/routes")(app);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines1";

mongoose.connect(db, function(error) {
    if (error) {
        console.og(error);
            }
        else {
            console.log("mongoose connection is successful");
    }
});

app.listen(port, function() {
    console.log("Listening on port:" + port);
});