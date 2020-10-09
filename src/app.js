const path = require('path');
const express = require ('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { resolveNaptr } = require('dns');

const app = express()
const port = process.env.PORT || 3000;
//Define paths for Express config
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Message',
        msg: 'here to help',
        name: 'Andrew Mead' 
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide address!'
        })
    }
    geocode(req.query.address, (error, {location, lat, long}={})=>{
        if(error){
            return res.send({error});
        }
    
        forecast(lat, long, (error, forecastdata) => {
            if(error){
                return res,send({error});
            }
        return res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
        });
        }) 
    })

})

app.get('/products', (req, res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'Provide a search term!'
        })
    }
        res.send({products: []});
})

//404 Handler
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 Page',
        resource: 'help section',
        name: 'Pramod'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404 Page',
        resource: 'Page',
        name: 'Pramod'
    })
})

app.listen(port, ()=>{
    console.log('server started on port: '+ port)
})
