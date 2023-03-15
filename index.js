

const express=require('express')
const https=require('https');
const bodyparser=require('body-parser')
const mysql = require('mysql');
const { query } = require('express');
require('dotenv').config();

var MongoClient = require("mongodb").MongoClient;
const { assert } = require('console');

const app=express()
const dburl="mongodb://mongo-container:27017/dbweather";
const client = new MongoClient(dburl);
async function connect(c , w ){
  try{
    await MongoClient.connect(dburl)
      console.log('Connected to MongoDB')
      const db = client.db('mydb');
      await db.collection('mydb').insertOne({
        city:c,
        weather:w
      });
      
    

    }catch(error){
      console.error(error)
  }
}



  
  
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
   
res.sendFile(__dirname+"/form.html");

})
app.post('/',(req,res)=>{
console.log("the request is received");
 console.log(req.body.cityname) ;
 const query=req.body.cityname;
 cityq=query;
const apikey=process.env.API_KEY;
const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&unit=metric';
https.get(url,(response=>{
//console.log(response.statusCode);
response.on('data',(data)=>{
    //console.log(data);
const weatherData=JSON.parse(data);
//console.log(weatherData);
const temp=weatherData.main.temp;
const description=weatherData.weather[0].description;
tempq=temp;
//console.log(description);
res.write("<h1 style='font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;'>The temerature in "+query+" is "+temp+" degree Kelvin (°K)</h1>")
res.write("<p style='font-size: 1.2rem; text-align: center;'>the weather discription is"+ description+"</p>")
res.write("<div style='text-align: center;'>")
res.write(" <a href='/' style='font-size: 1.1rem; color: #0077cc; text-decoration: none; border: 2px solid #0077cc; padding: 0.5rem 1rem; border-radius: 5px; background-color: #fff;'>Retour</a>")
res.write("</div>")  
connect(query,temp);

})
}))
})



  app.listen(8089,()=>{
    console.log("our server is running at port 8089");
})