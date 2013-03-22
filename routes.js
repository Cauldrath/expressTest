var homeController = require("./controllers/homeController"),
  searchController = require("./controllers/searchController"),
  homeModel = require("./models/homeModel"),
  searchModel = require("./models/searchModel"),
  newsView = require("./views/newsView");

module.exports = function (app) {
  app.get("/",function(req,res) {
    homeController(req,res,homeModel,newsView);
  });
  app.get("/home.:format?",function(req,res) {
    homeController(req,res,homeModel,newsView);
  });

  app.post("/search.:format?",function(req,res) {
    searchController(req,res,searchModel,newsView);
  });
};
