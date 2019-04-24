var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "tape88white",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inquirer.prompt([
        {   
            type: "input",
            name: "idnumber",
            message: "What is the Id of the product you are looking for?",
        },
        {
            type: "input",
            name: "amountnumber",
            message: "How many do you want?"
        }]).then(function(order){
            connection.query("select * from products where item_id = ?", order.idnumber , function(err,res){
                if (err) throw err;
                // console.log(res)
                // console.log (order.amountnumber)
                // console.log ([0].stock_quantity)
                // console.log (res[0].stock_quantity) 
                if (order.amountnumber >= res[0].stock_quantity){
                    console.log("insuficient amount")
                    connection.end()
                }
                else{
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: res[0].stock_quantity - order.amountnumber } , { item_id: order.idnumber }], function(err){
                    if (err) throw err;
                    console.log("your order has been placed")
                    connection.end()
                    })
                }
            })
        })
})
