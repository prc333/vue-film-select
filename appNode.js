var express = require("express");
var fs = require("fs");
var url = require("url");
var app = express();
app.use(express.static("www"));
app.get("/movieList", function(req, res) {
    var query = url.parse(req.url, true).query;
    fs.readFile("./data/movieList.json", function(err, data) {
        var dataObj = JSON.parse(data.toString()).movies.list;
        if (query.type != "全部") {
            dataObj = dataObj.filter((item) => {
                return item.type.includes(query.type);
            })
        }
        if (query.section != "全部") {
            dataObj = dataObj.filter((item) => {
                return item.section == query.section;
            })
        }
        res.json(dataObj);
    })
});
app.get("/cinemaList", function(req, res) {
    var query = url.parse(req.url, true).query;
    fs.readFile("./data/cinemaList.json", function(err, data) {
        var dataObj = JSON.parse(data.toString()).cinemas.list;
        dataObj = dataObj.filter((item) => {
            for (let i = 0; i < item.movies.length; i++) {
                if (item.movies[i].id == query.nowMovieId) {
                    return true;
                }
            }
            return false;
        })
        if (query.xingZheng != "全部") {
            dataObj = dataObj.filter((item) => {
                return item.address.indexOf(query.xingZheng) != -1;
            })
        }
        // if (query.ting != "全部") {
        //     dataObj = dataObj.filter((item) => {
        //         return item.section == query.section;
        //     })
        // }
        res.json(dataObj);
    })
});
app.get("/movies/:id", function(req, res) {
    var id = req.params.id;
    fs.readFile("./data/movieList.json", function(err, data) {
        var dataObj = JSON.parse(data.toString()).movies.list;
        for (var i = 0; i < dataObj.length; i++) {
            if (dataObj[i].id == id) {
                res.json(dataObj[i]);
                return;
            }
        }

    })
});
app.get("/cinemas/:id", function(req, res) {
    var id = req.params.id;
    fs.readFile("./data/cinemaList.json", function(err, data) {
        var dataObj = JSON.parse(data.toString()).cinemas.list;
        for (var i = 0; i < dataObj.length; i++) {
            if (dataObj[i].id == id) {
                res.json(dataObj[i]);
                return;
            }
        }

    })
});
app.listen(3000, function() {
    console.log("run at 3000");
});