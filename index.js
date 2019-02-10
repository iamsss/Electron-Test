console.log("From Index .js");

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
let request = require('request');

request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(err,response,body){
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;
});

setInterval(function(){
    request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(err,response,body){
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;
});
}, 5000)