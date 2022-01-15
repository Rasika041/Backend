const express = require('express');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();

app.use(express.json())

let mongourl="mongodb+srv://admin:admin@cluster0.0269d.mongodb.net/database?retryWrites=true&w=majority"

let client =new MongoClient(mongourl)
 async function demo(){
  try{
    await client.connect();
    await client.db('database').command({ping:1})

  }finally{}
}
demo()

app.get('/',(req,res)=>{
  res.send("hello world")
})


app.get("/addition",(req,res)=>{
  let body = {
    a:req.body.a,
    b:req.body.b,
    result:req.body.a + req.body.b
  
  }
  res.json(body)
})

app.post('/sign-in', async(req, res) => {
  let body = {
    username:req.body.username,
    password:req.body.password
  }
  let result = await client.db("database").collection("users").insertOne(req.body)
  res.json({message:"login successfully"})
 });

app.get('/get-users/:id',async(req,res)=>{
  let result = await client.db("database").collection("users").findOne({})
  res.send(result)
})

app.put('/update-users/:id',async(req,res)=>{
  let result = await client.db("database").collection("users").updateOne({_id:new ObjectId(req.params.id)},{$set:req.body});
  res.json({message:"update successfully"})
})


// app.post('/api/add', (req, res) => {
//   const num1 = req.body.num1;
//   const num2 = req.body.num2;
//   const total = req.body.num1 + req.body.num2;
//   res.json({total});
// });




app.post('/sign-up', async(req, res) => {
  let body = {
    firstName:req.body.firstName,
    lastName:req.body.lastName.require,
    eamil:req.body.eamil.require,
    userName:req.body.userName.require,
    password:req.body.password.require,
    confirm_password:req.body.confirm_password,
  }
  let result = await client.db("database").collection("users").insertOne(req.body)
  res.json({message:"sign-up successfully"})
 });
 

const server = app.listen(3000, function() {
    console.log("server is connected http://localhost:3000")
})


