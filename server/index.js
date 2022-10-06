const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql2');


// Another test

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

// Create the database connection to MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Senior1500405!',
    database: 'bcbsil_prices',
});

// Get the Search parameters from the front end
app.post("/api/search", (req, res) => {
    const SearchRequest = req.body
    console.log(SearchRequest)
    res.send(SearchRequest)
  })

    // Run the SQL query and send the results to the front end
app.get("/api/get", (req, res) => {
    
    
    
    
    
    const sqlSelect = "SELECT * FROM bcbs WHERE body_part = 'abdomen' AND procedure_name = 'MRI' AND contrast = 'With'";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")

});