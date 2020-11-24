// EXPRESS TEMPLATE
const path = require("path");
const http = require("http");
const express = require("express");
const root = require("./utils/path");
const app = express();

// set templating engine (pug, ejs, handlebars)
app.set("view engine", "pug");
app.set("views", "views"); // compile templates in views to views

const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const publicRoutes = require("./routes/shop");

// NOTE! bodyparser in the init
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// add router modules this way
// first parameter is optional `filter`
app.use("/admin", adminData.router);
app.use(publicRoutes);

// 404 page
app.use((req, res, next) => {
  //res.status(404).send("<h1>Page not found</h1>");
  //path.join(__dirname, "..", "views", "page-not-found.html")
  //res.status(404).sendFile(path.join(root, "views", "page-not-found.html"));
  res.status(404).render("page-not-found", { pageTitle: "Page not found" });
});

app.listen(3000);
