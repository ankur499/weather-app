const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))

app.get('', ( req, res ) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Ankur Lahoti'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        helpText: 'This will provide some help',
        name : 'Ankur Lahoti'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name : 'Ankur Lahoti'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.city){
        return res.send('Please provide city')
    }
    geocode(req.query.city, (error, { latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({error})
        } else {
            forecast(latitude, longitude, (error, forecastData) =>{
                if(error){
                    res.send({error})
                } else{
                    res.send({
                        forecast : forecastData,
                        location: location
                    })
                }
            })
        }
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            products : ['a','b','c']
        })
    }
    res.send({
        products : ['a','b','c']
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage : 'Help Page not found',
        name : 'Ankur Lahoti'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage : 'Page not found',
        name : 'Ankur Lahoti'
    })
})

app.listen(3000, ()=> {
    console.log('Server started @ port 3000')
})