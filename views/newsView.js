var header = require("./headerView"),
  footer = require("./footerView"),
  _ = require("lodash");

module.exports = function(data) {
  var output=header(data.title);
  _.each(data.data,function(obj) {
    output+="<div><a href='"+obj.href+"'><h1>"+obj.title+"</h1></a><p>"+obj.text+"</p></div>";
  });
  return output+footer();
}
