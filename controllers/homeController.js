var homeUrl = "http://www.brandingbrand.com/blogs/news",
  request = require('request');

module.exports = function(req,res,model,view) {
  request({
    url: homeUrl
  }, function(error,response,body) {
    var data=model(body,homeUrl);
    if(req.param('format')=='json') {
      res.send(data);
    }
    else {
      res.send(view({title: "Homepage",data: data}));
    }
  });  
};