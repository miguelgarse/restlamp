const express = require('express')
const rest = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// cors permite las peticiones de dominio cruzado 
rest.options('*', cors());
rest.use(cors());

$(() => {
    createApi();

    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        var lampUrl = 'Estoy en la direccion http://' + add + ':3000';
        console.log(lampUrl);
        $('#dirIp').text(lampUrl);
    })

    /**
     * Creacion de la api rest
     */
    function createApi() {
        
        rest.use(bodyParser.urlencoded({
            extended: true
        }));
        rest.use(bodyParser.json());

        rest.put('/ring/on', function (req, res) {
            console.log("turn ON");
            $('#myLamp').css('background-color', 'rgb(255, 250, 165)');
            res.sendStatus(200)
        });

        rest.put('/ring/off', function (req, res) {
            console.log("turn off");
            $('#myLamp').css('background-color', 'rgb(172, 172, 172)');
            res.sendStatus(200)
        })

        rest.put('/ring/color', function (req, res) {
            var color = req.body;
            console.log("turn off");
            $('#myLamp').css('background-color', 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')');
            res.sendStatus(200)
        })

        rest.listen(3000);
    }
})



