require('dotenv').config();

const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors         = require("cors");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const indexRouter = require("./routes/index.routes")
const authRouter = require("./routes/auth.routes")

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
require("./config/session")(app)
app.use(cors({
  origin: ["http://localhost:3001"],
  credentials: true
}))

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
app.use("/auth", authRouter)

module.exports = app;
