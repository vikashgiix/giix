app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'vitthal vikash',
        errorMessage: 'Help article not found.'
    })
})