let express=require('express');
let app=express();
let port=8900;
let mongo=require('mongodb');
let MongoClient=mongo.MongoClient;
let mongoUrl="mongodb://localhost:27017";
//database object
let db;

//route to show 
//Part 1
app.get('/location',(req,res)=>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
   
})

//Part 2
//route to show restaurant according to city using http://localhost:8900/restaurant/Mumbai
app.get('/restaurant/:cityname',(req,res)=>{
    let cityname=req.params.cityname;
    db.collection('restaurant').find({city_name:cityname}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
   
})
//Part 3 http://localhost:8900/widget
//Create an API for Restaurants Widget List drop-down using Express and Sample data
//mealtypes. Means, write an API to list all the mealtypes in the quick searches.

app.get('/widget',(req,res)=>{
  
    db.collection('meal').find({},{_id:1,name:1,meal_type:1,content:0,image:0}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
   
})

//connection with db
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('error while connecting');
    db=client.db('assignment5');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`);
    })

})