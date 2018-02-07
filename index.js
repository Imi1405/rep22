const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(request, response){
    response.send('Hello FiveP');
});

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send('i got some data');
});

console.log('hani nasma3 fik 3al port 3000');
app.listen(3000);
