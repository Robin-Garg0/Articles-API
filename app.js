//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-robin:Robin8437@cluster0.l2rg4kk.mongodb.net/wikiDB");

const Article = mongoose.model("Articles", {title: String, content: String});

app.route("/articles")
.get(function(req, res){

    Article.find({}).then((result) => {
        res.send(result);
    });

})
.post(function(req, res){
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    article.save().then((result) => {
        res.send(result);
    });
})
.delete(function(req, res){
    Article.deleteMany({}).then((result) => {
        res.send(result);
    });
});

app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}).then((result) => {
        if(result)
            res.send(result);
        else
            res.send("No article matching that title was found.");
    })
})
.put(function(req, res){
    Article.replaceOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content}
    ).then((result) => {
        res.send(result);
    });
})
.patch(function(req, res){
    Article.updateOne(
        {title:req.params.articleTitle},
        req.body   
    ).then((result) => {
        res.send(result);
    });
})
.delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}).then((result) => {
        res.send(result);
    });
});

app.listen(port, function(req, res){
    console.log("Server started on port " + port);
});