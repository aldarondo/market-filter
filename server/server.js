var express = require('express');
var app = express();

app.get('/api/latest.json', function (req, res) {
    res.json({
            "ARS": [0.5, "AR$", 2, ".", ","],
            "AMD": [0.5, "AMD", 2, ",", "."],
            "AWG": [0.5, "AWG", 2, ",", "."],
            "AUD": [0.5, "AUD$", 2, " ", "."],
            "BRL": [0.5, "BRL", 2, ".", ","],
            "CAD": [0.5, "$", 2, ",", "."],
            "CHF": [0.5, "CHF", 2, "'", "."],
            "CNY": [0.5, "CNY", 2, ",", "."],
            "EUR": [0.5, "€", 2, ",", "."],
            "GBP": [0.5, "£", 2, ",", "."],
            "HKD": [1, "HKD$", 2, ",", "."],
            "INR": [0.5, "INR", 2, ",", "."],
            "JPY": [0.5, "JPY", 0, ",", ""],
            "MXN": [0.5, "MXN", 2, ",", "."],
            "NZD": [1, "NZD$", 2, ",", "."],
            "RUB": [2, "RUB", 2, ".", ","],
            "SEK": [0.5, "SEK", 2, ".", ","],
            "USD": [1, "$", 2, ",", "."]
        }
    );
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});