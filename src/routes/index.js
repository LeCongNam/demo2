const homeController = require('../controller/HomeController')
const path = require('path')

function Route(app) {
    app.get('/', homeController.index)
}

module.exports = Route


