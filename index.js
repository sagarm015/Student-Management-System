const express = require('express');
const bodyParser= require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: 'password',
  port: 3306,
  database: "stms"
});

db.connect((err) => {
  if(err){
    throw err;
  }
  else{
    console.log("connect with my sql");
  }
});

app.get("/" , function(req,res){
  res.render("login");
});

app.get("/home",function(req,res){
  res.render("home");
});

app.get("/entermarks",function(req,res){
  res.render("entermarks");
});

app.get("/deleterecord",function(req,res){
  res.render("delete");
});

app.get("/showrecord" , function(req,res){
  res.render("showrecord");
});

app.get("/showall",function(req,res){

  let sql  = "select * from students s join stuDetail sd on s.rollNumber = sd.roll order by rollNumber ;"
  db.query(sql,(err,result) => {

    if(!result.length){
      console.log(result);
      res.render("error");
    }
    else{
        console.log(result);
        res.render("showall" , {record: result});
    }
  });

});

app.post("/",function(req,res){
  let sql = "select * from admins where username = '" + req.body.user + "'" + " and passkey = '"  + req.body.password + "'";

  db.query(sql,(err,result) => {
    console.log(result);
    if(!result.length){
      console.log(result);
      res.render("loginerror");
    }
    else{
        console.log(result);
      res.redirect("/home");
    }
  });
});

app.post("/showrecord", function(req,res){
//  let sql = "select * from students where rollNumber = '" + req.body.roll + "' ";
  let sql = " select * from students s join stuDetail sd on s.rollNumber  =  sd.roll where s.rollNumber = '" + req.body.roll+"'";
  db.query(sql,(err,result) => {

    if(!result.length){

      res.render("error");
    }
    else{
      console.log(result);
      res.render("showing",{record: result});
    }
  });
});

app.post("/deleterecord",function(req,res){
  let sql = "delete from students where rollNumber = '" + req.body.roll + "' ";
  db.query(sql,(err,result) => {
    if(!result.affectedRows){
      console.log(err);
      res.render("error");
    }
    else{
    //  console.log(result.affectedRows);
      res.redirect("/home");
    }
  });
});
var a,b,c,d,e ,f,cg;

app.post("/entry",function(req,res){
  a = parseInt(req.body.apm,10);
  b = parseInt(req.body.coam,10);
  c = parseInt(req.body.idbmsm,10);
  d = parseInt(req.body.otam,10);
  e = parseInt(req.body.mm,10);

 cg = (((a+b+c+d+e)/5)/9.5) ;
 f= cg.toFixed(2)*1.0;
 console.log(f);



  let post = {rollNumber: req.body.roll , APmarks: a , COAmarks: b , DBMSmarks: c , OTAmarks: d , Mmarks: e , cgpa: f};
  let sql = "insert into students set ?";
  db.query(sql,post, (err,result) =>{
    if(err){
      res.render("error");
    }
    else{
    //  alert("marks submited");
      res.redirect("/home");
    }

  });
});


// app.get("/createdatabase",function(req,res){
//   let sql = "create database stms";
//   db.query(sql,(err,result)=>{
//     res.send("data base created ...");
//   });
// });

// app.get("/createtable",function(req,res){
//   let sql = "create table students( rollNumber varchar(8) Primary key , APmarks integer , COAmarks integer )";
//   db.query(sql,(err,result) => {
//     res.send("table created");
//   });
// });




app.listen(3000, function(){
  console.log("server started at port 3000");
});
