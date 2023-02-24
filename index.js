const express=require('express')
const https=require('https');
const bodyparser=require('body-parser')

const app=express()
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
res.sendFile(__dirname+"/form.html");

})
app.post('/',(req,res)=>{
console.log("the request is received");
 console.log(req.body.cityname) ;
 const query=req.body.cityname;
const apikey='a6bccd7ab6834c99394b16ef34bdc41f'
const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&unit=metric';
https.get(url,(response=>{
//console.log(response.statusCode);
response.on('data',(data)=>{
    //console.log(data);
const weatherData=JSON.parse(data);
//console.log(weatherData);
const temp=weatherData.main.temp;
const description=weatherData.weather[0].description;
//console.log(description);
res.write("<h1 style='font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;'>The temerature in "+query+" is "+temp+" degree Kelvin (°K)</h1>")
res.write("<p style='font-size: 1.2rem; text-align: center;'>the weather discription is"+ description+"</p>")
res.write("<div style='text-align: center;'>")
res.write(" <a href='/' style='font-size: 1.1rem; color: #0077cc; text-decoration: none; border: 2px solid #0077cc; padding: 0.5rem 1rem; border-radius: 5px; background-color: #fff;'>Retour</a>")
res.write("</div>")  
})
}))
})
app.listen(3500,()=>{
    console.log("our server is running at port 3500");
})

