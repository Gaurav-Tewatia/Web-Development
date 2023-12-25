const fs = require("fs");
fs.writeFile("testing.txt","hi my name is boss", (err)=>{
    if(err) throw err;
    else console.log("successfully done");
});

fs.readFile("testing.txt","utf8",(err,data)=>{
    if(err) throw err;
    else console.log(data);
})