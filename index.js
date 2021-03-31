const express = require('express');
const app = express();
const path = require('path');
const exhbs = require('express-handlebars');

const PORT = process.env.PORT|| 5000;



app.engine('handlebars', exhbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});


app.use(express.static(path.join(__dirname, 'files')));
app.listen(PORT, ()=> 
console.log('Server listening on port:'+ PORT));
