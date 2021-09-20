const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./weather_api/geocode_abstraction_function.js')
const forecast = require('./weather_api/forecast_abstraction_function.js')
const port = process.env.PORT || 8000; 

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public_html')

//customizing name of views as templates
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render ('index', {
        title: 'weather',
        name: 'vitthal vikash'
    })
})


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Me',
        name: 'vitthal vikash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'now you are in help option.',
        title: 'help',
        name: 'vitthal vikash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = { }) => { //{ } is used for destructure the object.it work when data is not provided
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



// app.get('*',(req,res) => {
//     res.send('error 404 cant find page u are searchig for')

// })

//query string, server send a req to host when we use products like ex.(http://localhost:3000/products?search=games)
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search) // this is use to take input form user through the server
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
    res.render('error_404', {
        title: '404',
        name: 'vitthal vikash',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error_404', {
        title: '404',
        name: 'vitthal vikash',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})