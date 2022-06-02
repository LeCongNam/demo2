const connection = require('../model/connect')

class HomeController {
    index(req, res) {
        console.log(2);
        let data = []
        connection.query('SELECT * from chat', function (error, results, fields) {
            if (error) throw error;
            // connected!
            if (results) {
                data = results.map(item => item) 
           
            }

            if (data) {
                res.render('index',{
                    data
                })
            }
        });

    }
    
}

module.exports = new HomeController;