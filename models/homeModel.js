var cheerio = require('cheerio'),
  url = require('url');

module.exports=function(body,source) {
  var data=[],
    $ = cheerio.load(body);
  $(".article").each(function() {
    var href=url.resolve(source,$(this).find("a").attr("href")),
      title=$(this).find("h1").remove().text().trim(),
      text=$(this).text().trim();
    data.push({
      title: title,
      text: text,
      href: href
    });
  });
  return data;
};
