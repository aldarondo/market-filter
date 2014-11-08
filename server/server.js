var express = require('express');
var app = express();

app.get('/api/latest.json', function (req, res) {
    res.json({
            "ARS": [0.5, "AR$", 2, ".", ","],
            "USD": [1, "$", 2, ",", "."],
            "GBP": [0.5, "£", 0, ",", "."],
            "AUD": [0.5, "$", 2, ",", "."],
            "EUR": [0.5, "€", 2, ",", "."],
            "CAD": [0.5, "$", 2, ",", "."]
        }
    );
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});