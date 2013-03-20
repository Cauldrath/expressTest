var express = require('express'),
  cheerio = require('cheerio'),
  url = require('url'),
  request = require('request'),
  _ = require('lodash'),
  app = express(),
  homeUrl = "http://www.brandingbrand.com/blogs/news",
  searchUrl = "http://www.brandingbrand.com/search";

app.use(express.bodyParser());

function getHeader(title) {
  return "<html><head><title>"+title+"</title></head><body><div><a href='/'>Branding Brand</a></div><div><form action='/search' method='POST'><input name='search' /><input type='submit' value='Search'/></form></div>";
}
  
function getFooter() {
  return "</body></html>";
}

function displayData(title,data) {
  var output=getHeader(title);
  _.each(data,function(obj) {
    output+="<div><a href='"+obj.href+"'><h1>"+obj.title+"</h1></a><p>"+obj.text+"</p></div>";
  });
  output+=getFooter();
  return output;
}

var homePage = function(req,res) {
  request({
    url: homeUrl
  }, function(error,response,body) {
    var data=[],
      $ = cheerio.load(body);
    $(".article").each(function() {
      var title=$(this).find("h1").text().trim(),
        text=$(this).find("p").text().trim(),
        href=url.resolve(homeUrl,$(this).find("a").attr("href"));
      data.push({
        title: title,
        text: text,
        href: href
      });
    });
    if(req.param('format')=='json') {
      res.send(data);
    }
    else {
      res.send(displayData("Homepage",data));
    }
  });
};

app.get("/",homePage);
app.get("/home.:format?",homePage);

app.post("/search.:format?",function(req,res) {
  request({
    url: searchUrl,
    qs: {
      q: req.param('search')
    }
  }, function(error,response,body) {
    var data=[],
      $ = cheerio.load(body);
    $(".search-result").each(function() {
      var href=url.resolve(searchUrl,$(this).find("a").attr("href")),
        title=$(this).find("h2").remove().text().trim(),
        text=$(this).text().trim();
      data.push({
        title: title,
        text: text,
        href: href
      });
    });
    if(req.param('format')=='json') {
      res.send(data);
    }
    else {
      res.send(displayData("Homepage",data));
    }
  });
});

app.listen(4000);
console.log("Listening on port 4000");
