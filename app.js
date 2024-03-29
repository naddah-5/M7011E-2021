
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp  = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const authentication = require('./middleware/authentication');
const cors = require('cors');

const graphqlBuildSchema = require('./graphql/schemas/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(cors())


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


app.use(authentication);


app.use('/graphql', cors(), graphqlHttp({
  schema: graphqlBuildSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));
  
  
  /* exports.index = function(req, res){
    res.render('index');
  }; 

  app.get("/index", function (req, res) { 
    res.render("index", { title: 'Homepage'}); 
});  
 */


const dbPath = 'mongodb://localhost/m7011e';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
    app.listen(4000);
}, error => {
    console.log(error, 'error');
}) 



