import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "boss";
const yourPassword = "boss";
const yourAPIKey = "d23eba8c-c44e-4917-9f14-367b20858aea";
const yourBearerToken = "0fe5d01f-206f-4198-afae-4784216caa24";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
try{
  const result=await axios.get(API_URL+"random");
  res.render("index.ejs",{content:JSON.stringify(result.data)});
}catch(err){
  console.log("error occure ",err.message);
  res.status(404).send(err.message);
}

  
});

app.get("/basicAuth", async(req, res) => {
  try{
    const result=await axios.get(API_URL+"all?page=2",{
      auth:{
        username:yourUsername,
        password: yourPassword,
      },
    });

    res.render("index.ejs",{content: JSON.stringify(result.data)});

  }catch(err){
    res.status(404).send(err.message);
  }

});

app.get("/apiKey", async(req, res) => {

  try{
    const result=await axios.get(API_URL+"filter",{
      params:{
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs",{content: JSON.stringify(result.data)});
  }catch{err}{
    res.status(404).send(err.message);
  }
 
});

const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`
  },
};
app.get("/bearerToken", async(req, res) => {

  try{
    const result=await axios.get(API_URL +"secrets/2",config);

    res.render("index.ejs",{content: JSON.stringify(result.data)});
  }catch(err){
    res.status(404).send(err.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
