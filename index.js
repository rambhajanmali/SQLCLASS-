const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { connected } = require('process');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'R@0101@#'
});


  // to insert new data in bulk

  let   getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

  // home page

app.get("/", (req, res) =>{
  let q = `select count(*) from user`;
  try{
    connection.query(q, (err, result) =>{
      if(err) throw err;
      let count = result[0] ["count(*)"];
      res.render("home.ejs", {count});
    });
  }catch (err) {
    console.log(err);
    res.send("some error in db");
  }
  
});

//show route

app.get("/user", (req, res) =>{
  let q = `select * from user`;
  try{
    connection.query(q, (err, users) =>{
      if(err) throw err;
 res.render("showusers.ejs", {users});
      // res.send(result);
    });
  }catch (err) {
    console.log(err);
    res.send("some error in db");
  }
});

//edit route

app.get("/user/:id/edit", (req,res) =>{
  let {id} = req.params;
   let q = `select * from user where id ='${id}'`;

  try{
    connection.query(q, (err, result) =>{
      if(err) throw err;
      let user = result[0];
 res.render("edit.ejs", { user });
    });
  }catch (err) {
    console.log(err);
    res.send("some error in db");
  }
 });

//UPDATE (DB) ROUTE

app.patch("/user/:id", (req, res) =>{
  res.send("updated");
});
app.listen("8080", () =>{
  console.log("server is listening to port 8080");
});


//try{
  //   connection.query(q, [data], (err, result) =>{
  //     if(err) throw err;
  //     console.log(result);
    
  //   });
  // }catch (err) {
  //   console.log(err);
  // }
  
  // connection.end();


//inserting new data by one by one

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users =[
//             ["234b", "ram_newuserb", "ram@gmail.comb", "1234"],
//             ["234c", "ram_newuserc", "ram@gmail.comc", "1234"],
//           ];

// try{
//   connection.query(q, [users], (err, result) =>{
//     if(err) throw err;
//     console.log(result);
  
//   });
// }catch (err) {
//   console.log(err);
// }

// connection.end();


// let   getRandomUser = () => {
//     return {
//       Id: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     };
//   }





