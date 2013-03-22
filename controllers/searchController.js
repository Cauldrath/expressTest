var searchUrl = "http://www.brandingbrand.com/search",
  request = require('request');

module.exports = function(req,res,model,view) {
  request({
    url: searchUrl,
    qs: {
      q: req.param('search')
    }
  }, function(error,response,body) {
    var data=model(body,searchUrl);
    if(req.param('format')=='json') {
      res.send(data);
    }
    else {
      res.send(view({title: "Search: "+req.param('search'),data: data}));
    }
  });  
};