import express from "express";
import bodyparser from "body-parser";
//the following lines are to make out the relative file path so that whenever we host it on cloud we get the path of our directory
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}));

app.post("/submit",(req,res)=>{
  console.log(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");  //this is to send the file
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
