var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "jammers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

var signedin = false;
var user = "";
var answeredQuestions = false;

app.get("/", function(req, res) {
  if (signedin) {
    if (answeredQuestions) {
      res.render("results");
    } else {
      res.render("questions");
    }
  } else {
    res.render("index");
  }
});

app.get("/questions", function(req, res) {
  if (signedin) {
    if (answeredQuestions) {
      res.render("results");
    } else {
      res.render("questions");
    }
  } else {
    res.render("index");
  }
});

app.post("/api/jammers", function(req, res) {
  connection.query(
    "INSERT INTO jammers (name, age, city, state, zipcode) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.name,
      req.body.age,
      req.body.city,
      req.body.state,
      req.body.zipcode
    ],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return res.status(500).end();
      }

      signedin = true;
      user = result.insertId;

      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

// app.delete("/api/quotes/:id", function(req, res) {
//   connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server faliure
//       return res.status(500).end();
//     } else if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// // Update a quote by an id and then redirect to the root route.
// app.put("/api/quotes/:id", function(req, res) {
//   connection.query("UPDATE quotes SET author = ?, quote = ? WHERE id = ?", [
//     req.body.author, req.body.quote, req.params.id
//   ], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server faliure
//       return res.status(500).end();
//     } else if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
