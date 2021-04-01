const express = require('express');
const app = express();
const path = require('path');
const exhbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT|| 5000;


app.use(bodyParser.urlencoded({extented: false}));

function get_api(requestSymbol, callback)
{
    request('https://cloud.iexapis.com/stable/stock/'+requestSymbol+'/quote?token=pk_dc556ba8682f48d9a229a713dc63ed9e', {json:true}, (err, res, body)=>{
        if(err)
            return console.log(err);
        //console.log(body);
        
        if(res.statusCode == 200)
        {
            //console.log(body);
            callback(body);
        }
    });
}



//key pk_dc556ba8682f48d9a229a713dc63ed9e 
app.engine('handlebars', exhbs());
app.set('view engine', 'handlebars');


app.post('/', function (req, res) {
    const parsed = req.body.symbol;
    console.log(parsed);
    get_api(parsed, function callback(apibody)
    {
        console.log(apibody.symbol+' requested');
        res.render('home', {
        variable:apibody
        });

    });
       
});


app.get('/', function (req, res) {
    /*
    get_api(function callback(apibody)
    {
        console.log(apibody.symbol+' requested');
        res.render('home', {
        variable:apibody
        });

    });
       */
      res.render('welcomePage');
});

app.get('/about', function (req, res) {
    res.render('about');
});
app.use(express.static(path.join(__dirname, 'files')));
app.listen(PORT, ()=> 
console.log('Server listening on port:'+ PORT));
