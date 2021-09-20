const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname,'../public_html'))

const app = express()
const publicHtmlPath = path.join(__dirname,'../public_html')


app.use(express.static(publicHtmlPath))




app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})