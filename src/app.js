const path = require('path')
const express = require('express');
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000
const pfd = path.join(__dirname,'../Public')

const gc = require('./geocode')
const fc = require('./forecast')

app.set('view engine','hbs')
app.use(express.static(pfd))
hbs.registerPartials("/home/shashankvijay/Desktop/Node/web_server/src/partials")
const a= 'About'.bold;

app.get('',(req,res)=>
{
    res.render('index',{
        title : 'Weather',
        name : 'Shashank Vijay',
        Home : 'Home',
        About : 'About',
        Help : 'Help'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',
    {
        name : 'Shashank Vijay',
        title : 'About',
        abttxt : 'This webpage has been created by ',
        Home : 'Home',
        About : 'About',
        Help : 'Help'
    })
})

app.get("/help/*",(req,res)=>
{
    res.render('fourOfour',
    {
        error : "Help article not found!",
        title : "404 Page",
        name : "Shashank Vijay"        
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        title : 'Help',
        name : 'Shashank Vijay',
        body : 'On this section you can expect any sort of help required with the app.',
        Home : 'Home',
        About : 'About',
        Help : 'Help'    
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({error : "Not a valid address!"})
    }
    gc
           (
               req.query.address,
               (error,gobj)=>
               {
                   if(error)
                   {
                       res.send(error);
                   }
                   else
                   {
                    fc
                    (
                         gobj.long,gobj.lat,gobj.loc,
                         (error,fobj)=>
                         {   
                             if(error)
                             res.send(error);
                             else
                             {
                                 res.send(fobj) 
                             }
                         }   
                    )
                   }                    
               }               
           );
    }
)


app.get("*",(req,res)=>
{
    res.render("fourOfour",
    {
        error : "Page not found!",
        title : "404 Page",
        name : "Shashank Vijay"
    })
})

app.listen(port,()=> {
    console.log('Server is up!')
});