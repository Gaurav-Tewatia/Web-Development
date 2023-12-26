import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var name="";
app.use(bodyParser.urlencoded({extended:true}));

function xyz(req,res,next){
  name=req.body["street"] + req.body["pet"];
  next();
}
app.use(xyz);
app.post("/submit",(req,res)=>{
  res.send(`<h1> your brand name is</h1> ${name}`);
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
