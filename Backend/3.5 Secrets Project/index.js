import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var flag=false;

app.use(bodyParser.urlencoded({extended:true}));

function passwrod_check(req,res,next){
    let user_password=req.body["password"];
    if(user_password==="tewatia")
        flag=true;
    
    next();
}

app.use(passwrod_check);

app.post("/check",(req,res)=>{
    if(flag)
        res.sendFile(__dirname+"/public/secret.html");
    else
        res.sendFile(__dirname+"/public/index.html");
    
        
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.listen(port,()=>{
    console.log(`server has started on ${port}`);
});