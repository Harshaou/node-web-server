const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public')); 

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log()
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('unable to append')
        }
    })
    next();
})

hbs.registerHelper('getCurrentYear',() => {
    return  new Date().getFullYear()
})

hbs.registerHelper('screemIt',(text) =>{
    return text.toUpperCase();
})

app.get('/' ,(req ,res) =>{
    res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessege: 'Welcome to my website'
    });
});


app.get('/about' ,(req ,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});


app.listen(3000, () =>{
    console.log('server listen on port 3000')
})