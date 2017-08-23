var express = require("express")
var app = express();

app.get("/", function(req,  res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/game", (req,res)=>{
  res.sendFile(__dirname  + "/game.html");
})
app.use("/src", express.static('src/'));
app.use("/scripts", express.static('scripts/'));
app.use("/node_modules", express.static('node_modules/'));


app.listen(3000,function(){
    console.log("listening on port 3000");
})
