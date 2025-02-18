var fs = require("fs");
var express = require("express");
const { log } = require("console");
var app = express();
app.listen(8888);
console.log("Hello ....... je listen");


app.get("/:nom_fichier",function(request,response){
    const image="/ingImages/";
    const res = image+request.params.nom_fichier+".png";
    console.log(res);
    
    response.sendFile(res, {root:__dirname});
});