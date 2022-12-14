const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));