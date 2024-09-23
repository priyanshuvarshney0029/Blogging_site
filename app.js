const express =require('express')
const app=express();

const path=require('path')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
const seedDB = require('./seed')
const blogroutes=require('./routes/blog')
const ejsMate = require('ejs-mate');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})
// seeding database..
// seedDB()
app.engine('ejs' , ejsMate); 
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // views folder 
app.use(express.static(path.join(__dirname , 'public'))); // public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(blogroutes);



app.listen(8080 , ()=>{
    console.log("server connected at port 8080")
})